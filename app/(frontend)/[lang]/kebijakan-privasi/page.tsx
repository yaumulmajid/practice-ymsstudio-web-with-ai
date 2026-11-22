import { notFound } from "next/navigation"
import LegalView from "@/components/legal-view"
import { isLang, PATHS } from "@/lib/i18n"
import { privacy } from "@/lib/page-content/legal"
import { pageMetadata } from "@/lib/page-meta"

type Props = { params: Promise<{ lang: string }> }

export const generateMetadata = async ({ params }: Props) => {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const p = privacy[lang]
  return pageMetadata({ lang, path: PATHS.privacy, title: `${p.title} ${p.em}`, description: p.description })
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return <LegalView lang={lang} page={privacy[lang]} path={PATHS.privacy} />
}
