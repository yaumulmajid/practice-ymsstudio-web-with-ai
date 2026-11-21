import { BlogIndex } from "@/components/blog/blog-views"
import { blogIndexMetadata } from "@/lib/blog-meta"
import { notFound } from "next/navigation"
import { isLang } from "@/lib/i18n"

type Props = { params: Promise<{ lang: string }> }

export const generateMetadata = async ({ params }: Props) => {
  const { lang } = await params
  return isLang(lang) ? blogIndexMetadata(lang) : {}
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return <BlogIndex lang={lang} />
}
