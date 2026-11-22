import { getSite } from "@/lib/content"
import { isLang } from "@/lib/i18n"
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og"
import { pui } from "@/lib/pages-ui"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "YMS Studio case study"

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLang(lang)) return ogCard({ kicker: "Case study", title: "YMS Studio" })
  const project = (await getSite(lang)).projects.find((p) => p.slug === slug)
  const u = pui[lang].caseStudy
  if (!project) return ogCard({ kicker: u.label, title: "YMS Studio" })
  return ogCard({ kicker: u.label, title: project.title, footer: [project.client, project.category].filter(Boolean).join(" · ") })
}
