import { getSite } from "@/lib/content"
import { isLang } from "@/lib/i18n"
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og"
import { getService } from "@/lib/page-content/services"
import { pui } from "@/lib/pages-ui"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "YMS Studio"

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const service = getService(slug)
  if (!isLang(lang) || !service) return ogCard({ kicker: "YMS Studio", title: "YMS Studio" })
  const c = service.copy[lang]
  const pricing = (await getSite(lang)).dict.pricing
  const tier = service.tierIndex !== null ? pricing.tiers[service.tierIndex] : undefined
  const footer = tier ? `${pui[lang].service.from} ${pricing.currency} ${tier.price}` : pui[lang].service.custom
  return ogCard({ kicker: pui[lang].service.label, title: `${c.title} ${c.em}`.replace(/^./, (x) => x.toUpperCase()), footer })
}
