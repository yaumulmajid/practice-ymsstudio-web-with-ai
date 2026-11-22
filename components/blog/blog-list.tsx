"use client"

// Interactive blog list: instant search + pagination (4 posts per page).
// Pages switch on the client (no reload) but keep real URLs (/blog/page/2), so
// sharing, refresh, the back button and crawlers all work. Search filters the
// posts already on the page and is mirrored in ?q= for sharing.
import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react"
import { FeaturedCard, PostCard } from "@/components/blog/blog-cards"
import { BLOG_PER_PAGE, blogPageCount } from "@/components/blog/pagination"
import type { PostMeta } from "@/lib/content"
import { blogPagePath, blogPath, ui, type Lang } from "@/lib/i18n"

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

export default function BlogList({ posts, lang }: { posts: PostMeta[]; lang: Lang }) {
  const t = ui[lang].blog
  const pathname = usePathname()
  const listRef = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState("")
  const [query, setQuery] = useState("") // input, debounced
  const [resultPage, setResultPage] = useState(1)

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
      const url = q ? `${blogPath(lang)}?q=${encodeURIComponent(q)}` : blogPath(lang)
      window.history.replaceState(null, "", url)
    }, 220)
    return () => clearTimeout(id)
  }, [input, query, lang])

  const results = useMemo(() => {
    if (!query) return posts
    const terms = normalize(query).split(/\s+/).filter(Boolean)
    return posts.filter((p) => {
      const hay = normalize(`${p.title} ${p.excerpt} ${p.category}`)
      return terms.every((term) => hay.includes(term))
    })
  }, [posts, query])

  const total = blogPageCount(results.length)
  const page = Math.min(query ? resultPage : pageFromPath(pathname), total)
  const visible = results.slice((page - 1) * BLOG_PER_PAGE, page * BLOG_PER_PAGE)
  const showFeatured = !query && page === 1 && visible.length > 0
  const featured = showFeatured ? visible[0] : undefined
  const cards = showFeatured ? visible.slice(1) : visible

  function scrollToList() {
    const el = listRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 112
    if (window.scrollY > top) window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }

  function goTo(n: number, e?: MouseEvent) {
    if (e) {
      if (!isPlainClick(e)) return
      e.preventDefault()
    }
    if (n === page) return
    if (query) setResultPage(n)
    else window.history.pushState(null, "", blogPagePath(lang, n))
    scrollToList()
  }

  function clear() {
    setInput("")
    setQuery("")
    setResultPage(1)
    window.history.replaceState(null, "", blogPath(lang))
  }

  const swapKey = `${query}|${page}`
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
          {query ? t.results.replace("{n}", String(results.length)).replace("{q}", query) : total > 1 ? `${t.page} ${page} / ${total}` : ""}
        </p>
      </div>

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
            {cards.length > 0 && (
              <div className={`${featured ? "mt-6 md:grid-cols-3" : "md:grid-cols-2"} grid grid-cols-1 gap-6`}>
                {cards.map((post, i) => (
                  <PostCard key={post.slug} post={post} lang={lang} i={i + (featured ? 0 : 1)} className="blog-in" style={delay(i + (featured ? 1 : 0))} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {total > 1 && (
        <nav aria-label={t.pages} className="mt-12 flex flex-wrap items-center justify-center gap-2 md:mt-16">
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
