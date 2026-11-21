// Server-side content loader. Reads the CMS files in /content at build time
// (all pages are statically generated, so nothing here runs per request).
import { cache } from "react"
import { createReader } from "@keystatic/core/reader"
import type { Node } from "@markdoc/markdoc"
import keystaticConfig from "@/keystatic.config"
import { LANGS, ui, type Dict, type Lang, type Project, type Review, type Settings } from "@/lib/i18n"

const reader = createReader(process.cwd(), keystaticConfig)

const home = async <K extends keyof typeof reader.singletons>(key: K) => {
  const data = await reader.singletons[key].readOrThrow()
  return data as unknown as Record<Lang, any>
}

export type SiteData = {
  lang: Lang
  dict: Dict
  projects: Project[]
  settings: Settings
  /** Slugs of published posts per language, used by the language switch. */
  blogSlugs: Record<Lang, string[]>
}

export const getSite = cache(async (lang: Lang): Promise<SiteData> => {
  const [hero, work, services, reviewsSection, pricing, faq, cta, footer, seo, whatsapp, settings] = await Promise.all([
    home("hero"),
    home("work"),
    home("services"),
    home("reviewsSection"),
    home("pricing"),
    home("faq"),
    home("cta"),
    home("footer"),
    home("seo"),
    home("whatsapp"),
    reader.singletons.settings.readOrThrow(),
  ])
  const u = ui[lang]

  const projects = (await reader.collections.projects.all())
    .map(({ entry }) => entry)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((p) => ({
      client: p.client,
      url: p.url ?? "",
      image: p.image ?? "",
      tags: [...p.tags],
      showInHero: p.showInHero,
      ...p[lang],
    }))

  const reviews: Review[] = (await reader.collections.reviews.all())
    .map(({ entry }) => entry)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .filter((r) => r[lang].quote.trim())
    .map((r) => ({ name: r.name, rating: r.rating ?? 5, project: r.project || undefined, ...r[lang] }))

  const blogSlugs = Object.fromEntries(
    await Promise.all(LANGS.map(async (l) => [l, (await getPosts(l)).map((p) => p.slug)] as const)),
  ) as Record<Lang, string[]>

  const dict: Dict = {
    meta: { ...seo[lang], ogLocale: u.ogLocale },
    nav: { ...u.nav },
    hero: { ...hero[lang], ...u.hero },
    work: { ...work[lang], ...u.work },
    services: services[lang],
    reviews: { ...reviewsSection[lang], ...u.reviews, items: reviews },
    pricing: { ...pricing[lang], ...u.pricing },
    faq: faq[lang],
    cta: cta[lang],
    footer: { ...footer[lang], ...u.footer },
    wa: whatsapp[lang],
    blog: { ...u.blog },
  }

  return { lang, dict, projects, settings: settings as Settings, blogSlugs }
})

// ── Blog ─────────────────────────────────────────────────────
export type PostMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  cover: string | null
  minutes: number
}

const collectionFor = (lang: Lang) => (lang === "id" ? reader.collections.postsId : reader.collections.postsEn)

/** Plain text of a Markdoc tree, for the reading-time estimate. */
function textOf(node: Node): string {
  const own = typeof node.attributes?.content === "string" ? node.attributes.content : ""
  return own + " " + node.children.map(textOf).join(" ")
}

export const getPosts = cache(async (lang: Lang): Promise<PostMeta[]> => {
  const all = await collectionFor(lang).all({ resolveLinkedFiles: true })
  return all
    .filter(({ entry }) => !entry.draft)
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      excerpt: entry.excerpt,
      date: entry.date ?? "",
      category: entry.category,
      cover: entry.cover ?? null,
      minutes: Math.max(1, Math.round(textOf(entry.content.node).split(/\s+/).filter(Boolean).length / 200)),
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
})

export const getPost = cache(async (lang: Lang, slug: string) => {
  const meta = (await getPosts(lang)).find((p) => p.slug === slug)
  if (!meta) return null
  const entry = await collectionFor(lang).readOrThrow(slug, { resolveLinkedFiles: true })
  return { ...meta, node: entry.content.node }
})
