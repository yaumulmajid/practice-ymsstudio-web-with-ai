"use client"

// Interactive blog list: instant search + pagination (4 posts per page).
// Desktop: numbered pages that switch on the client (no reload) but keep real URLs
// (/blog/page/2), so sharing, refresh, the back button and crawlers all work.
// Phones: a "load more" button that appends the next page below, so the screen
// never jumps; it is still a link to /blog/page/N for crawlers and no-JS.
// Search filters the posts already on the page and is mirrored in ?q= for sharing.
import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react"
import { FeaturedCard, PostCard } from "@/components/blog/blog-cards"
import { BLOG_PER_PAGE, blogPageCount } from "@/components/blog/pagination"
import type { PostMeta } from "@/lib/content"
import { blogPagePath, blogPath, ui, type Lang } from "@/lib/i18n"
import { pui } from "@/lib/pages-ui"

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")

/** Page numbers with gaps, e.g. 1 … 4 5 6 … 12. */
function pageItems(current: number, total: number): (number | null)[] {
  const keep = new Set([1, total, current - 1, current, current + 1])
  const out: (number | null)[] = []
  for (let n = 1; n <= total; n++) {
    if (keep.has(n)) out.push(n)
    else if (out[out.length - 1] !== null) out.push(null)
  }
  return out
}

const pageFromPath = (path: string) => {
  const m = path.match(/\/page\/(\d+)\/?$/)
  return m ? Math.max(1, Number(m[1])) : 1
}

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Plain left click (no new tab / modifier keys): handle it on the client. */
const isPlainClick = (e: MouseEvent) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey

/**
 * Cards under the featured post: a swipeable row on phones (manual, snaps per card,
 * with dots), the usual 3-column grid from md up.
 */
function CardSlider({ children, label }: { children: ReactNode[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function onScroll() {
    const el = ref.current
    if (!el || el.children.length < 2) return
    const step = (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft
    const max = el.scrollWidth - el.clientWidth
    // At the far right the last card can't snap to the start, so treat "end of scroll" as the last card.
    setActive(el.scrollLeft >= max - 4 ? el.children.length - 1 : Math.round(el.scrollLeft / step))
  }

  function goTo(i: number) {
    const el = ref.current
    const card = el?.children[i] as HTMLElement | undefined
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - (el.children[0] as HTMLElement).offsetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }

  return (
    <div className="mt-6">
      <div
        ref={ref}
        onScroll={onScroll}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
            {child}
          </div>
        ))}
      </div>
      {children.length > 1 && (
        <div className="mt-5 flex justify-center gap-2 md:hidden" role="group" aria-label={label}>
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1} / ${children.length}`}
              aria-current={i === active ? "true" : undefined}
              className="grid h-6 place-items-center px-0.5"
            >
              <span className={`block h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${i === active ? "w-6 bg-ink" : "w-2 bg-ink/20"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function BlogList({ posts, lang }: { posts: PostMeta[]; lang: Lang }) {
  const t = ui[lang].blog
  const pathname = usePathname()
  const listRef = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState("")
  const [query, setQuery] = useState("") // input, debounced
  const [resultPage, setResultPage] = useState(1)
  const [cat, setCat] = useState("") // "" = all categories
  const [loaded, setLoaded] = useState(1) // pages shown at once (phones: "load more")
  const categories = useMemo(() => [...new Set(posts.map((p) => p.category).filter(Boolean))], [posts])
  const filtering = Boolean(query || cat)

  // Restore a shared search (?q=) after hydration.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q")
    if (q) {
      setInput(q)
      setQuery(q.trim())
    }
  }, [])

  // Debounce typing so the list animates once per search, not on every key.
  useEffect(() => {
    const id = setTimeout(() => {
      const q = input.trim()
      if (q === query) return
      setQuery(q)
      setResultPage(1)
      setLoaded(1)
      const url = q ? `${blogPath(lang)}?q=${encodeURIComponent(q)}` : blogPath(lang)
      window.history.replaceState(null, "", url)
    }, 220)
    return () => clearTimeout(id)
  }, [input, query, lang])

  const results = useMemo(() => {
    const inCat = cat ? posts.filter((p) => p.category === cat) : posts
    if (!query) return inCat
    const terms = normalize(query).split(/\s+/).filter(Boolean)
    return inCat.filter((p) => {
      const hay = normalize(`${p.title} ${p.excerpt} ${p.category}`)
      return terms.every((term) => hay.includes(term))
    })
  }, [posts, query, cat])

  const total = blogPageCount(results.length)
  const page = Math.min(filtering ? resultPage : pageFromPath(pathname), total)
  const lastPage = Math.min(page + loaded - 1, total) // last page on screen ("load more" adds pages)
  const firstPagePosts = results.slice((page - 1) * BLOG_PER_PAGE, page * BLOG_PER_PAGE)
  const morePosts = results.slice(page * BLOG_PER_PAGE, lastPage * BLOG_PER_PAGE)
  const shownCount = Math.min(lastPage * BLOG_PER_PAGE, results.length) - (page - 1) * BLOG_PER_PAGE
  const showFeatured = !filtering && page === 1 && firstPagePosts.length > 0
  const featured = showFeatured ? firstPagePosts[0] : undefined
  const cards = showFeatured ? firstPagePosts.slice(1) : firstPagePosts

  function scrollToList() {
    const el = listRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 112
    if (window.scrollY <= top) return
    // A long smooth scroll would glide past cards that are still fading in (a blank
    // screen), so jump when the list top is far away and only glide short distances.
    const far = window.scrollY - top > window.innerHeight
    window.scrollTo({ top, behavior: far || prefersReducedMotion() ? "auto" : "smooth" })
  }

  function goTo(n: number, e?: MouseEvent) {
    if (e) {
      if (!isPlainClick(e)) return
      e.preventDefault()
    }
    if (n === page && loaded === 1) return
    setLoaded(1)
    if (filtering) setResultPage(n)
    else window.history.pushState(null, "", blogPagePath(lang, n))
    scrollToList()
  }

  /** Phones: append the next page below the current posts; the screen stays where it is. */
  function loadMore(e: MouseEvent) {
    if (!isPlainClick(e)) return
    e.preventDefault()
    setLoaded((l) => l + 1)
  }

  function clear() {
    setInput("")
    setQuery("")
    setCat("")
    setResultPage(1)
    setLoaded(1)
    window.history.replaceState(null, "", blogPath(lang))
  }

  const swapKey = `${query}|${cat}|${page}`
  const delay = (i: number): CSSProperties => ({ ["--d" as string]: `${i * 70}ms` })
  const pageLink = "grid h-11 min-w-11 place-items-center rounded-full px-3 text-sm font-medium transition-colors duration-300"
  const pill =
    "inline-flex h-11 items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 text-sm font-medium text-ink transition-[border-color,opacity] duration-300 hover:border-ink/20"

  return (
    <div ref={listRef} className="mt-10 scroll-mt-28 md:mt-14">
      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="group relative block w-full sm:max-w-sm">
          <span className="sr-only">{t.searchLabel}</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/35 transition-colors group-focus-within:text-brand" />
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && clear()}
            placeholder={t.searchPlaceholder}
            enterKeyHint="search"
            autoComplete="off"
            className="h-12 w-full rounded-full border border-ink/[0.08] bg-white pl-11 pr-11 text-base text-ink shadow-[0_10px_30px_-20px_rgba(11,18,32,0.25)] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink/35 focus:border-brand/50 focus:shadow-[0_0_0_4px_rgba(42,142,158,0.12)] [&::-webkit-search-cancel-button]:hidden"
          />
          {input && (
            <button
              type="button"
              onClick={clear}
              aria-label={t.clear}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-ink/45 transition-colors hover:bg-ink/[0.05] hover:text-ink"
            >
              <X size={16} />
            </button>
          )}
        </label>
        <p className="text-sm text-ink/45" aria-live="polite">
          {query ? t.results.replace("{n}", String(results.length)).replace("{q}", query) : cat ? `${results.length} · ${cat}` : total > 1 ? (
            <>
              <span className="hidden md:inline">{`${t.page} ${page} / ${total}`}</span>
              <span className="md:hidden">{t.shown.replace("{n}", String(shownCount)).replace("{total}", String(results.length - (page - 1) * BLOG_PER_PAGE))}</span>
            </>
          ) : ""}
        </p>
      </div>

      {/* Categories */}
      {categories.length > 1 && (
        <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label={t.label}>
          {["", ...categories].map((c) => (
            <button
              key={c || "all"}
              type="button"
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c)
                setResultPage(1)
                setLoaded(1)
                if (!query && pageFromPath(pathname) > 1) window.history.replaceState(null, "", blogPath(lang))
              }}
              className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
                cat === c ? "bg-ink text-white" : "border border-ink/[0.08] bg-white text-ink/60 hover:border-ink/20 hover:text-ink"
              }`}
            >
              {c || pui[lang].blog.all}
            </button>
          ))}
        </div>
      )}

      {/* Posts */}
      <div key={swapKey} className="mt-8">
        {results.length === 0 ? (
          <div className="blog-in rounded-[28px] border border-dashed border-ink/[0.12] px-6 py-16 text-center">
            <p className="text-ink/60">{posts.length === 0 ? t.empty : t.noResults}</p>
            {posts.length > 0 && (
              <button type="button" onClick={clear} className={`${pill} mt-6`}>
                <X size={15} /> {t.clear}
              </button>
            )}
          </div>
        ) : (
          <>
            {featured && <FeaturedCard post={featured} lang={lang} className="blog-in" style={delay(0)} />}
            {cards.length > 0 &&
              (featured ? (
                <CardSlider label={t.pages}>
                  {cards.map((post, i) => (
                    <PostCard key={post.slug} post={post} lang={lang} i={i} className="blog-in" style={delay(i + 1)} />
                  ))}
                </CardSlider>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {cards.map((post, i) => (
                    <PostCard key={post.slug} post={post} lang={lang} i={i + 1} className="blog-in" style={delay(i)} />
                  ))}
                </div>
              ))}
            {/* Pages appended by "load more" (phones) */}
            {morePosts.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {morePosts.map((post, i) => (
                  <PostCard key={post.slug} post={post} lang={lang} i={i + 1} className="blog-in" style={delay(i % BLOG_PER_PAGE)} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Phones: load more */}
      {(lastPage < total || page > 1) && (
        <div className="mt-10 flex flex-wrap justify-center gap-2 md:hidden">
          {/* Landed on /blog/page/N (e.g. from Google): a way back to the newest posts. */}
          {page > 1 && (
            <a href={blogPagePath(lang, 1)} onClick={(e) => goTo(1, e)} rel="prev" className={pill}>
              <ArrowLeft size={15} /> {t.page} 1
            </a>
          )}
          {lastPage < total && (
            <a href={blogPagePath(lang, lastPage + 1)} onClick={loadMore} className={`${pill} px-6`}>
              {t.loadMore} <ArrowRight size={15} className="rotate-90" />
            </a>
          )}
        </div>
      )}

      {/* Pagination (desktop) */}
      {total > 1 && (
        <nav aria-label={t.pages} className="mt-12 hidden flex-wrap items-center justify-center gap-2 md:mt-16 md:flex">
          <a
            href={blogPagePath(lang, Math.max(1, page - 1))}
            onClick={(e) => goTo(page - 1, e)}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : undefined}
            rel="prev"
            className={`${pill} ${page === 1 ? "pointer-events-none opacity-35" : ""}`}
          >
            <ArrowLeft size={15} /> <span className="hidden sm:inline">{t.prev}</span>
          </a>
          {pageItems(page, total).map((n, i) =>
            n === null ? (
              <span key={`gap-${i}`} className="px-1 text-ink/35">
                …
              </span>
            ) : (
              <a
                key={n}
                href={blogPagePath(lang, n)}
                onClick={(e) => goTo(n, e)}
                aria-current={n === page ? "page" : undefined}
                aria-label={`${t.page} ${n}`}
                className={`${pageLink} ${n === page ? "bg-ink font-semibold text-white" : "text-ink/60 hover:bg-ink/[0.05] hover:text-ink"}`}
              >
                {n}
              </a>
            ),
          )}
          <a
            href={blogPagePath(lang, Math.min(total, page + 1))}
            onClick={(e) => goTo(page + 1, e)}
            aria-disabled={page === total}
            tabIndex={page === total ? -1 : undefined}
            rel="next"
            className={`${pill} ${page === total ? "pointer-events-none opacity-35" : ""}`}
          >
            <span className="hidden sm:inline">{t.next}</span> <ArrowRight size={15} />
          </a>
        </nav>
      )}
    </div>
  )
}
