// Blog index + article views (server components). Content comes from the CMS
// (Payload collection "posts"; English uses the *En fields).
import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Eyebrow, Reveal } from "@/components/motion"
import BlogCta from "@/components/blog/blog-cta"
import BlogList from "@/components/blog/blog-list"
import { Meta, PostCard } from "@/components/blog/blog-cards"
import { AuthorBox, headingConverters, ShareRow, Toc, tocFrom } from "@/components/blog/article-extras"
import { getPost, getPosts } from "@/lib/content"
import { blogPath, homePath, ui, type Lang } from "@/lib/i18n"
import { SITE } from "@/lib/seo"

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-clip bg-background text-foreground">
      <Header />
      <main className="pt-32 sm:pt-40">{children}</main>
      <Footer />
    </div>
  )
}

/** Blog index. The list (search + pagination) is client-side; the page number comes from the URL (/blog/page/n). */
export async function BlogIndex({ lang }: { lang: Lang }) {
  const t = ui[lang].blog
  const posts = await getPosts(lang)

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

        <BlogList posts={posts} lang={lang} />
      </section>
    </Shell>
  )
}

export async function BlogArticle({ lang, slug }: { lang: Lang; slug: string }) {
  const t = ui[lang].blog
  const post = await getPost(lang, slug)
  if (!post) return null
  // Related: same category first, then newest.
  const others = (await getPosts(lang))
    .filter((p) => p.slug !== slug)
    .map((p, i) => ({ p, score: (p.category && p.category === post.category ? 0 : 1) * 1000 + i }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .map((x) => x.p)
  const toc = tocFrom(post.content)
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

        <Toc items={toc} lang={lang} />

        {/* Plain fade-in on load: a scroll reveal never fires on long articles on small screens. */}
        <div className="fade-up prose-yms mt-12 border-t border-ink/[0.07] pt-12" style={{ ["--d" as string]: "300ms" }}>
          <RichText data={post.content as SerializedEditorState} converters={headingConverters()} disableContainer />
        </div>

        <ShareRow url={url} title={post.title} lang={lang} />
        <AuthorBox lang={lang} />
        <BlogCta title={t.ctaTitle} text={t.ctaText} button={t.ctaButton} />
      </article>

      {others.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-ink sm:text-2xl lg:text-3xl">{t.more}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 100} className="h-full">
                <PostCard post={p} lang={lang} i={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </Shell>
  )
}
