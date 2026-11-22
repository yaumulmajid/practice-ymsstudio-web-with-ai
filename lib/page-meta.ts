// Metadata + structured-data helpers for content pages that exist in both languages
// at the same path ("/x" and "/en/x").
import type { Metadata } from "next"
import { localePath, ui, type Lang } from "@/lib/i18n"
import { pui } from "@/lib/pages-ui"
import { OG_IMAGE, SITE } from "@/lib/seo"

export const absUrl = (lang: Lang, path: string) => `${SITE}${localePath(lang, path) === "/" ? "" : localePath(lang, path)}`

export function pageMetadata({
  lang,
  path,
  title,
  description,
  image,
  noindex = false,
  generatedImage = false,
}: {
  lang: Lang
  path: string
  title: string
  description: string
  image?: { url: string; width: number; height: number; alt?: string }
  noindex?: boolean
  /** The route has its own opengraph-image.tsx (which Next adds to the metadata). */
  generatedImage?: boolean
}): Metadata {
  const url = absUrl(lang, path)
  const img = image ?? { url: OG_IMAGE, width: 1200, height: 630 }
  return {
    title: `${title} | YMS Studio`,
    description,
    alternates: {
      canonical: url,
      languages: { "id-ID": absUrl("id", path), "en-US": absUrl("en", path), "x-default": absUrl("id", path) },
    },
    openGraph: { title, description, url, type: "website", siteName: "YMS Studio", locale: ui[lang].ogLocale, ...(generatedImage ? {} : { images: [img] }) },
    twitter: { card: "summary_large_image", title, description, ...(generatedImage ? {} : { images: [img.url] }) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

/** BreadcrumbList JSON-LD: Home › …items (each item: name + site path). */
export function breadcrumbLd(lang: Lang, items: { name: string; path: string }[]) {
  const all = [{ name: pui[lang].breadcrumbHome, path: "/" }, ...items]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absUrl(lang, c.path) })),
  }
}

/** Visible breadcrumb items (href = localized path). */
export function crumbs(lang: Lang, items: { name: string; path: string }[]) {
  return [{ name: pui[lang].breadcrumbHome, href: localePath(lang, "/") }, ...items.map((c) => ({ name: c.name, href: localePath(lang, c.path) }))]
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }
}
