// /sitemap.xml — generated from the CMS on each request (no database at build time).
import type { MetadataRoute } from "next"
import { getPosts } from "@/lib/content"
import { blogPath, homePath } from "@/lib/i18n"
import { SITE } from "@/lib/seo"

const abs = (path: string) => `${SITE}${path === "/" ? "" : path}`

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [id, en] = await Promise.all([getPosts("id"), getPosts("en")])
  const pair = (idPath: string, enPath: string) => ({ languages: { "id-ID": abs(idPath), "en-US": abs(enPath) } })

  const pages: MetadataRoute.Sitemap = [
    { url: abs(homePath("id")), changeFrequency: "weekly", priority: 1, alternates: pair(homePath("id"), homePath("en")) },
    { url: abs(homePath("en")), changeFrequency: "weekly", priority: 0.9, alternates: pair(homePath("id"), homePath("en")) },
    { url: abs(blogPath("id")), changeFrequency: "weekly", priority: 0.8, alternates: pair(blogPath("id"), blogPath("en")) },
    { url: abs(blogPath("en")), changeFrequency: "weekly", priority: 0.7, alternates: pair(blogPath("id"), blogPath("en")) },
  ]
  const posts = (list: typeof id, lang: "id" | "en", others: typeof id): MetadataRoute.Sitemap =>
    list.map((p) => ({
      url: abs(blogPath(lang, p.slug)),
      lastModified: p.updated || p.date || undefined,
      ...(p.cover ? { images: [`${SITE}${p.cover}`] } : {}),
      changeFrequency: "monthly",
      priority: 0.6,
      ...(others.some((o) => o.slug === p.slug) ? { alternates: pair(blogPath("id", p.slug), blogPath("en", p.slug)) } : {}),
    }))

  return [...pages, ...posts(id, "id", en), ...posts(en, "en", id)]
}
