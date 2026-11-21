// Server-side content loader: reads the CMS (Payload, PostgreSQL) and shapes it
// for the components. Pages are rendered on first request and cached; saving in
// the CMS revalidates them (payload/hooks/revalidate.ts).
import "server-only"
import { cache } from "react"
import type { Where } from "payload"
import { getPayloadClient } from "@/lib/payload"
import { LANGS, ui, type Dict, type Lang, type Project, type Review, type Settings } from "@/lib/i18n"

/* eslint-disable @typescript-eslint/no-explicit-any -- CMS documents are mapped field by field below */

type Row = { text?: string | null }
const texts = (rows: Row[] | null | undefined) => (rows ?? []).map((r) => r.text ?? "").filter(Boolean)
const items = (rows: any[] | null | undefined) => (rows ?? []).map((r) => ({ title: r.title ?? "", text: r.text ?? "" }))
const s = (v: unknown) => (typeof v === "string" ? v : "")

/** Payload returns absolute media URLs; make ours relative so next/image optimizes them locally. */
function relative(url: string) {
  if (!/^https?:\/\//.test(url)) return url
  try {
    const u = new URL(url)
    return u.pathname.startsWith("/api/media/") ? u.pathname + u.search : url
  } catch {
    return url
  }
}

export function mediaUrl(media: unknown, size?: "thumb" | "card" | "detail"): string {
  if (!media || typeof media !== "object") return ""
  const m = media as { url?: string | null; sizes?: Record<string, { url?: string | null }> }
  const url = (size && m.sizes?.[size]?.url) || m.url || ""
  return url ? relative(url) : ""
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
  const payload = await getPayloadClient()
  const [home, site, projectDocs, reviewDocs, ...slugLists] = await Promise.all([
    payload.findGlobal({ slug: "home-page", depth: 0, context: { lang } }) as Promise<any>,
    payload.findGlobal({ slug: "site-settings", depth: 0, context: { lang } }) as Promise<any>,
    payload.find({ collection: "projects", depth: 1, limit: 100, sort: "sortOrder", pagination: false, context: { lang } }),
    payload.find({ collection: "reviews", depth: 0, limit: 100, sort: "sortOrder", pagination: false, context: { lang } }),
    ...LANGS.map((l) => getPosts(l)),
  ])
  const u = ui[lang]
  const h = home ?? {}
  const c = site?.contact ?? {}

  const projects: Project[] = projectDocs.docs.map((p: any) => ({
    client: s(p.client),
    url: s(p.url),
    image: mediaUrl(p.image, "detail"),
    tags: Array.isArray(p.tags) ? p.tags : [],
    showInHero: Boolean(p.showInHero),
    title: s(p.title),
    category: s(p.category),
    description: s(p.description),
  }))

  const reviews: Review[] = reviewDocs.docs
    .filter((r: any) => s(r.quote).trim())
    .map((r: any) => ({ name: s(r.name), role: s(r.role), quote: s(r.quote), rating: r.rating ?? 5, project: r.project || undefined }))

  const hero = h.hero ?? {}
  const services = h.services ?? {}
  const pricing = h.pricing ?? {}

  const dict: Dict = {
    meta: { title: s(site?.seo?.title), description: s(site?.seo?.description), ogLocale: u.ogLocale },
    nav: { ...u.nav },
    hero: {
      ...u.hero,
      badge: s(hero.badge),
      kicker: s(hero.kicker),
      line1: s(hero.line1),
      line2: s(hero.line2),
      words: texts(hero.words),
      sub: s(hero.sub),
      ctaPrimary: s(hero.ctaPrimary),
      ctaSecondary: s(hero.ctaSecondary),
      ctaSecondaryNote: s(hero.ctaSecondaryNote),
      guaranteeTitle: s(hero.guaranteeTitle),
      guaranteeText: s(hero.guaranteeText),
      ratingTitle: s(hero.ratingTitle),
      ratingText: s(hero.ratingText),
      marquee: texts(hero.marquee),
    },
    work: { ...u.work, label: s(h.work?.label), titleA: s(h.work?.titleA), titleEm: s(h.work?.titleEm), titleB: s(h.work?.titleB), text: s(h.work?.text) },
    services: {
      label: s(services.label),
      titleA: s(services.titleA),
      titleEm: s(services.titleEm),
      text: s(services.text),
      items: items(services.items),
      processLabel: s(services.processLabel),
      processTitleA: s(services.processTitleA),
      processTitleEm: s(services.processTitleEm),
      steps: items(services.steps),
    },
    reviews: {
      ...u.reviews,
      label: s(h.reviewsSection?.label),
      titleA: s(h.reviewsSection?.titleA),
      titleEm: s(h.reviewsSection?.titleEm),
      text: s(h.reviewsSection?.text),
      items: reviews,
    },
    pricing: {
      ...u.pricing,
      label: s(pricing.label),
      titleA: s(pricing.titleA),
      titleEm: s(pricing.titleEm),
      text: s(pricing.text),
      included: texts(pricing.included),
      customTitle: s(pricing.customTitle),
      customText: s(pricing.customText),
      customCta: s(pricing.customCta),
      tiers: (pricing.tiers ?? []).map((t: any) => ({
        name: s(t.name),
        price: s(t.price),
        tagline: s(t.tagline),
        timeline: s(t.timeline),
        renewal: s(t.renewal),
        featured: Boolean(t.featured),
        features: texts(t.features),
      })),
    },
    faq: {
      label: s(h.faq?.label),
      titleA: s(h.faq?.titleA),
      titleEm: s(h.faq?.titleEm),
      items: (h.faq?.items ?? []).map((f: any) => ({ q: s(f.q), a: s(f.a) })),
    },
    cta: {
      kicker: s(h.cta?.kicker),
      line1: s(h.cta?.line1),
      line2A: s(h.cta?.line2A),
      line2Em: s(h.cta?.line2Em),
      text: s(h.cta?.text),
      button: s(h.cta?.button),
    },
    footer: { ...u.footer, about: s(h.footer?.about), services: texts(h.footer?.services), available: s(h.footer?.available) },
    wa: {
      general: s(site?.whatsapp?.general),
      hero: s(site?.whatsapp?.hero),
      float: s(site?.whatsapp?.float),
      custom: s(site?.whatsapp?.custom),
      cta: s(site?.whatsapp?.cta),
      tier: s(site?.whatsapp?.tier),
    },
    blog: { ...u.blog },
  }

  const settings: Settings = {
    waNumber: s(c.waNumber),
    phoneDisplay: s(c.phoneDisplay),
    email: s(c.email),
    instagram: s(c.instagram),
    facebook: s(c.facebook),
  }

  const blogSlugs = Object.fromEntries(LANGS.map((l, i) => [l, slugLists[i].map((p) => p.slug)])) as Record<Lang, string[]>
  return { lang, dict, projects, settings, blogSlugs }
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

/** Published posts; English needs its own title and content. */
const postWhere = (lang: Lang, extra?: Where): Where => ({
  and: [
    { status: { equals: "published" } },
    ...(lang === "en" ? [{ titleEn: { exists: true } }, { titleEn: { not_equals: "" } }, { contentEn: { exists: true } }] : []),
    ...(extra ? [extra] : []),
  ],
})

/** Plain text of a Lexical document, for the reading-time estimate. */
function lexicalText(node: any): string {
  if (!node || typeof node !== "object") return ""
  const own = typeof node.text === "string" ? node.text : ""
  const kids = Array.isArray(node.children) ? node.children.map(lexicalText).join(" ") : ""
  return `${own} ${kids} ${node.root ? lexicalText(node.root) : ""}`
}

const toMeta = (p: any): PostMeta => ({
  slug: s(p.slug),
  title: s(p.title),
  excerpt: s(p.excerpt),
  date: s(p.publishedAt).slice(0, 10),
  category: s(p.category),
  cover: mediaUrl(p.cover, "detail") || null,
  minutes: Math.max(1, Math.round(lexicalText(p.content).split(/\s+/).filter(Boolean).length / 200)),
})

export const getPosts = cache(async (lang: Lang): Promise<PostMeta[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: "posts",
    where: postWhere(lang),
    sort: "-publishedAt",
    depth: 1,
    limit: 200,
    pagination: false,
    context: { lang },
  })
  return docs.map(toMeta)
})

export const getPost = cache(async (lang: Lang, slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: "posts",
    where: postWhere(lang, { slug: { equals: slug } }),
    depth: 1,
    limit: 1,
    pagination: false,
    context: { lang },
  })
  const doc = docs[0] as any
  return doc ? { ...toMeta(doc), content: doc.content as unknown } : null
})
