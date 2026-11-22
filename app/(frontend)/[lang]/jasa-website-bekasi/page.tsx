import { notFound } from "next/navigation"
import ServiceView from "@/components/service-view"
import { isLang, PATHS } from "@/lib/i18n"
import { pageMetadata } from "@/lib/page-meta"
import { local } from "@/lib/page-content/services"

type Props = { params: Promise<{ lang: string }> }

export const generateMetadata = async ({ params }: Props) => {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const c = local[lang]
  return pageMetadata({ lang, path: PATHS.local, title: `${c.title} ${c.em}`.replace(/^./, (x) => x.toUpperCase()), description: c.description })
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return <ServiceView lang={lang} kind="local" />
}
