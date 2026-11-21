// Metadata + static params for the blog routes (shared by /blog and /en/blog).
import type { Metadata } from "next"
import { getPost, getPosts } from "@/lib/content"
import { blogPath, ui, type Lang } from "@/lib/i18n"
import { OG_IMAGE, SITE } from "@/lib/seo"

const other = (lang: Lang): Lang => (lang === "id" ? "en" : "id")
const hreflang = (lang: Lang) => (lang === "id" ? "id-ID" : "en-US")

export function blogIndexMetadata(lang: Lang): Metadata {
  const t = ui[lang].blog
  const title = `Blog — ${t.titleA} ${t.titleEm} | YMS Studio`
  const url = `${SITE}${blogPath(lang)}`
  return {
    title,
    description: t.text,
    alternates: {
      canonical: url,
      languages: { "id-ID": `${SITE}${blogPath("id")}`, "en-US": `${SITE}${blogPath("en")}`, "x-default": `${SITE}${blogPath("id")}` },
    },
    openGraph: { title, description: t.text, url, type: "website", siteName: "YMS Studio", locale: ui[lang].ogLocale, images: [OG_IMAGE] },
  }
}

export async function blogPostMetadata(lang: Lang, slug: string): Promise<Metadata> {
  const post = await getPost(lang, slug)
  if (!post) return {}
  const url = `${SITE}${blogPath(lang, slug)}`
  const translated = (await getPosts(other(lang))).some((p) => p.slug === slug)
  const image = post.cover ? `${SITE}${post.cover}` : OG_IMAGE
  return {
    title: `${post.title} | YMS Studio`,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: translated
        ? { [hreflang(lang)]: url, [hreflang(other(lang))]: `${SITE}${blogPath(other(lang), slug)}` }
        : { [hreflang(lang)]: url },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      siteName: "YMS Studio",
      locale: ui[lang].ogLocale,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [image] },
  }
}

export async function blogStaticParams(lang: Lang) {
  return (await getPosts(lang)).map((p) => ({ slug: p.slug }))
}
