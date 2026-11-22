import { notFound } from "next/navigation"
import ServiceView from "@/components/service-view"
import { isLang, PATHS } from "@/lib/i18n"
import { pageMetadata } from "@/lib/page-meta"
import { getService } from "@/lib/page-content/services"

type Props = { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = true
export function generateStaticParams() {
  return []
}

export const generateMetadata = async ({ params }: Props) => {
  const { lang, slug } = await params
  const service = getService(slug)
  if (!isLang(lang) || !service) return {}
  const c = service.copy[lang]
  return pageMetadata({ lang, path: PATHS.service(slug), title: `${c.title} ${c.em}`.replace(/^./, (x) => x.toUpperCase()), description: c.description, generatedImage: true })
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  const service = getService(slug)
  if (!isLang(lang) || !service) notFound()
  return <ServiceView lang={lang} kind="service" service={service} />
}
