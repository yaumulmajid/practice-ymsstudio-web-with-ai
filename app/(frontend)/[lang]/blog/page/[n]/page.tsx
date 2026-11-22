// Blog index page 2, 3, … at /blog/page/n (and /en/blog/page/n). Page 1 lives at /blog.
import { notFound, permanentRedirect } from "next/navigation"
import { BlogIndex } from "@/components/blog/blog-views"
import { blogPageCount } from "@/components/blog/pagination"
import { blogIndexMetadata } from "@/lib/blog-meta"
import { getPosts } from "@/lib/content"
import { blogPath, isLang } from "@/lib/i18n"

type Props = { params: Promise<{ lang: string; n: string }> }

// Rendered on first request, then cached (see the [lang] layout).
export const dynamicParams = true
export function generateStaticParams() {
  return []
}

const parsePage = (n: string) => (/^\d+$/.test(n) ? Number(n) : NaN)

export const generateMetadata = async ({ params }: Props) => {
  const { lang, n } = await params
  const page = parsePage(n)
  return isLang(lang) && page > 1 ? blogIndexMetadata(lang, page) : {}
}

export default async function Page({ params }: Props) {
  const { lang, n } = await params
  if (!isLang(lang)) notFound()
  const page = parsePage(n)
  if (page === 1) permanentRedirect(blogPath(lang))
  if (!(page > 1) || page > blogPageCount((await getPosts(lang)).length)) notFound()
  return <BlogIndex lang={lang} />
}
