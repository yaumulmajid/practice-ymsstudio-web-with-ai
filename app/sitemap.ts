// /sitemap.xml — generated from the CMS on each request (no database at build time).
import type { MetadataRoute } from "next"
import { getPosts, getSite } from "@/lib/content"
import { blogPath, homePath, localePath, PATHS } from "@/lib/i18n"
import { services } from "@/lib/page-content/services"
import { SITE } from "@/lib/seo"

const abs = (path: string) => `${SITE}${path === "/" ? "" : path}`

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [id, en, site] = await Promise.all([getPosts("id"), getPosts("en"), getSite("id")])
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

  // Content pages share their path across languages (/x and /en/x).
  const shared = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly"): MetadataRoute.Sitemap =>
    (["id", "en"] as const).map((lang) => ({
      url: abs(localePath(lang, path)),
      changeFrequency,
      priority: lang === "id" ? priority : Math.round((priority - 0.1) * 10) / 10,
      alternates: pair(localePath("id", path), localePath("en", path)),
    }))
  const content: MetadataRoute.Sitemap = [
    ...services.flatMap((s) => shared(PATHS.service(s.slug), 0.9)),
    ...shared(PATHS.local, 0.9),
    ...shared(PATHS.calculator, 0.7),
    ...shared(PATHS.brief, 0.6),
    ...site.projects.flatMap((p) => shared(PATHS.project(p.slug), 0.6)),
    ...shared(PATHS.privacy, 0.2, "yearly"),
    ...shared(PATHS.terms, 0.2, "yearly"),
  ]

  return [...pages, ...content, ...posts(id, "id", en), ...posts(en, "en", id)]
}
