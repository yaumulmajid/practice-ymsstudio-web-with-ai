// Route module for a local SEO page (/jasa-website-<city>): each city folder re-exports these.
import { notFound } from "next/navigation"
import ServiceView from "@/components/service-view"
import { isLang, PATHS } from "@/lib/i18n"
import { pageMetadata } from "@/lib/page-meta"
import { ogCard } from "@/lib/og"
import { locals, type LocalCity } from "@/lib/page-content/services"
import { pui } from "@/lib/pages-ui"

type Props = { params: Promise<{ lang: string }> }

export function localRoute(city: LocalCity) {
  async function generateMetadata({ params }: Props) {
    const { lang } = await params
    if (!isLang(lang)) return {}
    const c = locals[city].copy[lang]
    return pageMetadata({ lang, path: PATHS.local(city), title: `${c.title} ${c.em}`.replace(/^./, (x) => x.toUpperCase()), description: c.description, generatedImage: true })
  }
  async function Page({ params }: Props) {
    const { lang } = await params
    if (!isLang(lang)) notFound()
    return <ServiceView lang={lang} kind="local" city={city} />
  }
  return { generateMetadata, Page }
}

/** Open Graph card for a local page (each city folder's opengraph-image.tsx). */
export function localOgImage(city: LocalCity) {
  return async function Image({ params }: Props) {
    const { lang: raw } = await params
    const lang = isLang(raw) ? raw : "id"
    const page = locals[city]
    const c = page.copy[lang]
    return ogCard({ kicker: page.label, title: `${c.title} ${c.em}`.replace(/^./, (x) => x.toUpperCase()), footer: pui[lang].brief.side[1] })
  }
}
