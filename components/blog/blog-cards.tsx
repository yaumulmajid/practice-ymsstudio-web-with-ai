// Blog building blocks shared by the server views (article page) and the
// interactive blog list (client): cover, meta line, post card, featured card.
import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Clock, Eye } from "lucide-react"
import ViewCounter from "@/components/blog/view-counter"
import type { PostMeta } from "@/lib/content"
import { blogPath, ui, type Lang } from "@/lib/i18n"

export const formatDate = (date: string, lang: Lang) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString(ui[lang].blog.dateLocale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : ""

const ART = [
  { bg: "bg-ink", glow: "bg-[radial-gradient(closest-side,rgba(42,142,158,0.5),transparent)]", text: "text-white", sub: "text-white/40" },
  { bg: "bg-brand-soft", glow: "bg-[radial-gradient(closest-side,rgba(42,142,158,0.3),transparent)]", text: "text-brand-deep", sub: "text-brand-deep/45" },
  { bg: "bg-[#e9edf2]", glow: "bg-[radial-gradient(closest-side,#ffffff,transparent)]", text: "text-ink", sub: "text-ink/35" },
]

/**
 * Cover image, or a typographic placeholder when the post has none. Fills its (aspect-ratio) parent.
 * Non-large covers are a small thumbnail below md (see PostCard), so they shrink their radius and type there.
 */
export function Cover({ post, i, large = false }: { post: PostMeta; i: number; large?: boolean }) {
  const radius = large ? "rounded-[22px]" : "rounded-2xl md:rounded-[22px]"
  if (post.cover) {
    return (
      <div className={`relative h-full overflow-hidden bg-ink/5 ${radius}`}>
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          loading={large ? "eager" : "lazy"}
          sizes={large ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 767px) 192px, 400px"}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
        />
      </div>
    )
  }
  const a = ART[i % ART.length]
  return (
    <div
      className={`relative flex h-full flex-col justify-between overflow-hidden ${radius} ${large ? "p-5 sm:p-6" : "p-3 md:p-6"} ${a.bg}`}
      aria-hidden="true"
    >
      <div className={`animate-drift absolute -right-28 -top-28 h-80 w-80 rounded-full ${a.glow}`} />
      <span className={`relative text-[11px] font-medium uppercase tracking-[0.2em] ${a.sub} ${large ? "" : "hidden md:block"}`}>YMS · {post.category}</span>
      <span
        className={`relative font-serif italic leading-[0.95] tracking-[-0.02em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1 ${a.text} ${
          large ? "text-4xl sm:text-6xl" : "mt-auto text-xl md:text-4xl"
        }`}
      >
        {post.category || "Blog"}
      </span>
    </div>
  )
}

/**
 * Category, date, reading time and read count. `live` refreshes and counts the read (article page).
 * `compact`: below md only category + date (for the thumbnail rows on phones).
 */
export function Meta({ post, lang, className = "", live = false, compact = false }: { post: PostMeta; lang: Lang; className?: string; live?: boolean; compact?: boolean }) {
  const t = ui[lang].blog
  const extra = compact ? "hidden md:inline-flex" : "inline-flex"
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/45 ${className}`}>
      {post.category && <span className="rounded-full bg-brand-soft px-2.5 py-1 font-medium text-brand-deep">{post.category}</span>}
      <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
      <span className={`${extra} items-center gap-1`}>
        <Clock size={12} /> {post.minutes} {t.minRead}
      </span>
      {live ? (
        <ViewCounter slug={post.slug} initial={post.views} label={t.views} locale={t.dateLocale} />
      ) : (
        post.views > 0 && (
          <span className={`${extra} items-center gap-1`}>
            <Eye size={12} /> {post.views.toLocaleString(t.dateLocale)} {t.views}
          </span>
        )
      )}
    </div>
  )
}

/**
 * Post card. Phones: a compact row (thumbnail left; category, date and title right), the
 * pattern news and blog lists use so a growing list stays easy to scan. From md: the full card.
 */
export function PostCard({ post, lang, i, className = "", style }: { post: PostMeta; lang: Lang; i: number; className?: string; style?: CSSProperties }) {
  return (
    <Link
      href={blogPath(lang, post.slug)}
      style={style}
      className={`group flex h-full min-w-0 items-start gap-3 min-[390px]:gap-4 rounded-[22px] border border-ink/[0.07] bg-white p-2.5 transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.2)] md:flex-col md:items-stretch md:gap-0 md:rounded-[28px] md:p-3 ${className}`}
    >
      <div className="aspect-[16/10] w-28 shrink-0 min-[390px]:w-36 sm:w-48 md:w-auto">
        <Cover post={post} i={i + 1} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-1 pr-1 md:p-4 md:pt-5">
        <Meta post={post} lang={lang} compact />
        <h3 className="mt-2 line-clamp-3 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-base md:mt-4 md:line-clamp-none md:text-lg md:tracking-[-0.02em] lg:text-xl">
          {post.title}
        </h3>
        <p className="mt-3 hidden text-sm leading-relaxed text-ink/55 md:line-clamp-3">{post.excerpt}</p>
        <span className="mt-auto hidden items-center gap-1.5 pt-6 text-sm font-medium text-ink md:inline-flex">
          {ui[lang].blog.read}
          <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  )
}

export function FeaturedCard({ post, lang, className = "", style }: { post: PostMeta; lang: Lang; className?: string; style?: CSSProperties }) {
  return (
    <Link
      href={blogPath(lang, post.slug)}
      style={style}
      className={`group grid grid-cols-1 overflow-hidden rounded-[32px] border border-ink/[0.07] bg-white p-3 transition-shadow duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:shadow-[0_40px_80px_-40px_rgba(11,18,32,0.25)] md:grid-cols-[1.1fr_1fr] ${className}`}
    >
      <div className="aspect-[16/9] min-w-0 md:self-center">
        <Cover post={post} i={0} large />
      </div>
      <div className="flex min-w-0 flex-col p-5 sm:p-8 md:p-10">
        <Meta post={post} lang={lang} />
        <h2 className="mt-5 text-2xl font-semibold leading-[1.12] tracking-[-0.03em] text-ink sm:text-3xl lg:text-4xl">{post.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-ink/55">{post.excerpt}</p>
        <span className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-medium text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight size={16} />
          </span>
          {ui[lang].blog.read}
        </span>
      </div>
    </Link>
  )
}
