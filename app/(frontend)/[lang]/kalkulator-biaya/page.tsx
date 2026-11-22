import { notFound } from "next/navigation"
import CostCalculator from "@/components/cost-calculator"
import { Reveal } from "@/components/motion"
import { Breadcrumbs, JsonLd, PageHero, Shell } from "@/components/page-shell"
import { isLang, PATHS } from "@/lib/i18n"
import { breadcrumbLd, crumbs, pageMetadata } from "@/lib/page-meta"
import { pui } from "@/lib/pages-ui"

type Props = { params: Promise<{ lang: string }> }

export const generateMetadata = async ({ params }: Props) => {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const c = pui[lang].calc
  return pageMetadata({ lang, path: PATHS.calculator, title: `${c.title} ${c.titleEm}`, description: c.text })
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const c = pui[lang].calc
  const trail = [{ name: `${c.title} ${c.titleEm}`, path: PATHS.calculator }]
  return (
    <Shell>
      <JsonLd data={breadcrumbLd(lang, trail)} />
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
        <Breadcrumbs items={crumbs(lang, trail)} />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <PageHero label={c.label} title={c.title} em={c.titleEm} text={c.text} />
          <Reveal delay={150} className="rounded-[28px] border border-ink/[0.07] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(11,18,32,0.25)] sm:p-9">
            <CostCalculator />
          </Reveal>
        </div>
      </div>
    </Shell>
  )
}
