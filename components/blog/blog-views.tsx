// Blog index + article views (server components). Content comes from the CMS
// (Payload collection "posts"; English uses the *En fields).
import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { ArrowLeft, ArrowUpRight, Clock, Eye } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Eyebrow, Reveal } from "@/components/motion"
import BlogCta from "@/components/blog/blog-cta"
import ViewCounter from "@/components/blog/view-counter"
import { getPost, getPosts, type PostMeta } from "@/lib/content"
import { blogPath, homePath, ui, type Lang } from "@/lib/i18n"
import { SITE } from "@/lib/seo"

const formatDate = (date: string, lang: Lang) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString(ui[lang].blog.dateLocale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : ""

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-clip bg-background text-foreground">
      <Header />
      <main className="pt-32 sm:pt-40">{children}</main>
      <Footer />
    </div>
  )
}

const ART = [
  { bg: "bg-ink", glow: "bg-brand/50", text: "text-white", sub: "text-white/40" },
  { bg: "bg-brand-soft", glow: "bg-brand/30", text: "text-brand-deep", sub: "text-brand-deep/45" },
  { bg: "bg-[#e9edf2]", glow: "bg-white", text: "text-ink", sub: "text-ink/35" },
]

/** Cover image, or a typographic placeholder when the post has none. */
function Cover({ post, i, large = false }: { post: PostMeta; i: number; large?: boolean }) {
  if (post.cover) {
    return (
      <div className="relative h-full overflow-hidden rounded-[22px] bg-ink/5">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes={large ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 768px) 100vw, 400px"}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
        />
      </div>
    )
  }
  const a = ART[i % ART.length]
  return (
    <div className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] p-5 sm:p-6 ${a.bg}`} aria-hidden="true">
      <div className={`animate-drift absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl ${a.glow}`} />
      <span className={`relative text-[11px] font-medium uppercase tracking-[0.2em] ${a.sub}`}>YMS · {post.category}</span>
      <span
        className={`relative font-serif italic leading-[0.95] tracking-[-0.02em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1 ${a.text} ${
          large ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {post.category || "Blog"}
      </span>
    </div>
  )
}

/** Category, date, reading time and read count. `live` refreshes and counts the read (article page). */
function Meta({ post, lang, className = "", live = false }: { post: PostMeta; lang: Lang; className?: string; live?: boolean }) {
  const t = ui[lang].blog
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/45 ${className}`}>
      {post.category && <span className="rounded-full bg-brand-soft px-2.5 py-1 font-medium text-brand-deep">{post.category}</span>}
      <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
      <span className="inline-flex items-center gap-1">
        <Clock size={12} /> {post.minutes} {t.minRead}
      </span>
      {live ? (
        <ViewCounter slug={post.slug} initial={post.views} label={t.views} locale={t.dateLocale} />
      ) : (
        post.views > 0 && (
          <span className="inline-flex items-center gap-1">
            <Eye size={12} /> {post.views.toLocaleString(t.dateLocale)} {t.views}
          </span>
        )
      )}
    </div>
  )
}

function PostCard({ post, lang, i }: { post: PostMeta; lang: Lang; i: number }) {
  return (
    <Reveal delay={(i % 3) * 100} className="h-full">
      <Link
        href={blogPath(lang, post.slug)}
        className="group flex h-full flex-col rounded-[28px] border border-ink/[0.07] bg-white p-3 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.2)]"
      >
        <div className="aspect-[16/10]">
          <Cover post={post} i={i + 1} />
        </div>
        <div className="flex flex-1 flex-col p-4 pt-5">
          <Meta post={post} lang={lang} />
          <h3 className="mt-4 text-lg font-semibold leading-snug sm:text-xl tracking-[-0.02em] text-ink">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/55">{post.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
            {ui[lang].blog.read}
            <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export async function BlogIndex({ lang }: { lang: Lang }) {
  const t = ui[lang].blog
  const posts = await getPosts(lang)
  const [featured, ...rest] = posts

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
          <div>
            <Reveal>
              <Eyebrow index="YMS">{t.label}</Eyebrow>
            </Reveal>
            <Reveal as="h1" delay={80} className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
              {t.titleA} <em className="font-serif font-normal italic text-brand">{t.titleEm}</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={160} className="max-w-md text-base leading-relaxed text-ink/55 md:justify-self-end">
            {t.text}
          </Reveal>
        </div>

        {!featured && <p className="mt-16 text-ink/50">{t.empty}</p>}

        {featured && (
          <Reveal delay={200} className="mt-14 md:mt-20">
            <Link
              href={blogPath(lang, featured.slug)}
              className="group grid grid-cols-1 overflow-hidden rounded-[32px] border border-ink/[0.07] bg-white p-3 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:shadow-[0_40px_80px_-40px_rgba(11,18,32,0.25)] md:grid-cols-[1.1fr_1fr]"
            >
              <div className="aspect-[16/9] min-w-0 md:self-center">
                <Cover post={featured} i={0} large />
              </div>
              <div className="flex min-w-0 flex-col p-5 sm:p-8 md:p-10">
                <Meta post={featured} lang={lang} />
                <h2 className="mt-5 text-2xl font-semibold leading-[1.12] tracking-[-0.03em] text-ink sm:text-3xl lg:text-4xl">{featured.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink/55">{featured.excerpt}</p>
                <span className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-medium text-ink">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                  {t.read}
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className={`mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 ${rest.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} lang={lang} i={i} />
            ))}
          </div>
        )}
      </section>
    </Shell>
  )
}

export async function BlogArticle({ lang, slug }: { lang: Lang; slug: string }) {
  const t = ui[lang].blog
  const post = await getPost(lang, slug)
  if (!post) return null
  const others = (await getPosts(lang)).filter((p) => p.slug !== slug).slice(0, 2)
  const url = `${SITE}${blogPath(lang, slug)}`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      articleSection: post.category || undefined,
      wordCount: post.words,
      inLanguage: lang === "id" ? "id-ID" : "en-US",
      mainEntityOfPage: url,
      url,
      image: [post.cover ? `${SITE}${post.cover}` : `${SITE}/og-image.webp`],
      author: { "@type": "Organization", name: "YMS Studio", url: SITE },
      publisher: { "@type": "Organization", name: "YMS Studio", logo: { "@type": "ImageObject", url: `${SITE}/logo.webp` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "YMS Studio", item: `${SITE}${homePath(lang) === "/" ? "" : homePath(lang)}` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}${blogPath(lang)}` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ]

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <Link href={blogPath(lang)} className="group inline-flex items-center gap-2 text-sm font-medium text-ink/50 transition-colors hover:text-ink">
            <ArrowLeft size={15} className="transition-transform duration-500 group-hover:-translate-x-1" /> {t.back}
          </Link>
        </Reveal>
        <Reveal delay={60}>
          <Meta post={post} lang={lang} className="mt-10" live />
        </Reveal>
        <Reveal as="h1" delay={120} className="mt-6 text-[1.875rem] font-semibold leading-[1.12] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
          {post.title}
        </Reveal>
        <Reveal as="p" delay={180} className="mt-6 text-lg leading-relaxed text-ink/55 sm:text-xl">
          {post.excerpt}
        </Reveal>

        {post.cover && (
          <Reveal delay={220} className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[28px] bg-ink/5">
            <Image src={post.cover} alt={post.coverAlt} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </Reveal>
        )}

        {/* Plain fade-in on load: a scroll reveal never fires on long articles on small screens. */}
        <div className="fade-up prose-yms mt-12 border-t border-ink/[0.07] pt-12" style={{ ["--d" as string]: "300ms" }}>
          <RichText data={post.content as SerializedEditorState} disableContainer />
        </div>

        <BlogCta title={t.ctaTitle} text={t.ctaText} button={t.ctaButton} />
      </article>

      {others.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-ink sm:text-2xl lg:text-3xl">{t.more}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {others.map((p, i) => (
              <PostCard key={p.slug} post={p} lang={lang} i={i} />
            ))}
          </div>
        </section>
      )}
    </Shell>
  )
}
