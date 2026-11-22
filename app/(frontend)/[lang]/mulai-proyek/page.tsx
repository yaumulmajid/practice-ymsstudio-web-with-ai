import { notFound } from "next/navigation"
import { Check } from "lucide-react"
import BriefForm from "@/components/brief-form"
import { Reveal } from "@/components/motion"
import { Breadcrumbs, JsonLd, PageHero, Shell } from "@/components/page-shell"
import { isLang, PATHS } from "@/lib/i18n"
import { breadcrumbLd, crumbs, pageMetadata } from "@/lib/page-meta"
import { pui } from "@/lib/pages-ui"

type Props = { params: Promise<{ lang: string }> }

export const generateMetadata = async ({ params }: Props) => {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const b = pui[lang].brief
  return pageMetadata({ lang, path: PATHS.brief, title: `${b.title} ${b.titleEm}`, description: b.text })
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const b = pui[lang].brief
  const trail = [{ name: b.label, path: PATHS.brief }]
  return (
    <Shell>
      <JsonLd data={breadcrumbLd(lang, trail)} />
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
        <Breadcrumbs items={crumbs(lang, trail)} />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <PageHero label={b.label} title={b.title} em={b.titleEm} text={b.text} />
            <ul className="mt-10 space-y-4">
              {b.side.map((item, i) => (
                <Reveal as="li" key={item} delay={200 + i * 70} className="flex items-center gap-3 text-base text-ink/70">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-soft text-brand-deep">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={150}>
            <BriefForm />
          </Reveal>
        </div>
      </div>
    </Shell>
  )
}
