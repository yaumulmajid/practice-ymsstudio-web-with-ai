// Metadata for the blog routes (/blog, /blog/[slug] and their /en twins).
import type { Metadata } from "next"
import { getPost, getPosts } from "@/lib/content"
import { blogPagePath, blogPath, ui, type Lang } from "@/lib/i18n"
import { OG_IMAGE, SITE } from "@/lib/seo"

const other = (lang: Lang): Lang => (lang === "id" ? "en" : "id")
const hreflang = (lang: Lang) => (lang === "id" ? "id-ID" : "en-US")

/** Blog index; page 2+ gets its own title and self-canonical (no hreflang: page counts can differ per language). */
export function blogIndexMetadata(lang: Lang, page = 1): Metadata {
  const t = ui[lang].blog
  const suffix = page > 1 ? ` — ${t.page} ${page}` : ""
  const title = `Blog — ${t.titleA} ${t.titleEm}${suffix} | YMS Studio`
  const url = `${SITE}${blogPagePath(lang, page)}`
  return {
    title,
    description: page > 1 ? `${t.text} (${t.page} ${page})` : t.text,
    alternates:
      page > 1
        ? { canonical: url }
        : {
            canonical: url,
            languages: { "id-ID": `${SITE}${blogPath("id")}`, "en-US": `${SITE}${blogPath("en")}`, "x-default": `${SITE}${blogPath("id")}` },
          },
    openGraph: {
      title,
      description: t.text,
      url,
      type: "website",
      siteName: "YMS Studio",
      locale: ui[lang].ogLocale,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
  }
}

export async function blogPostMetadata(lang: Lang, slug: string): Promise<Metadata> {
  const post = await getPost(lang, slug)
  if (!post) return {}
  const url = `${SITE}${blogPath(lang, slug)}`
  const translated = (await getPosts(other(lang))).some((p) => p.slug === slug)
  const image = post.cover
    ? { url: `${SITE}${post.cover}`, width: 1600, height: 900, alt: post.coverAlt }
    : { url: OG_IMAGE, width: 1200, height: 630, alt: post.title }
  return {
    title: `${post.title} | YMS Studio`,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: translated
        ? {
            [hreflang(lang)]: url,
            [hreflang(other(lang))]: `${SITE}${blogPath(other(lang), slug)}`,
            "x-default": `${SITE}${blogPath("id", slug)}`,
          }
        : { [hreflang(lang)]: url },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      section: post.category || undefined,
      siteName: "YMS Studio",
      locale: ui[lang].ogLocale,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [image.url] },
  }
}
