import { notFound } from "next/navigation"
import { BlogArticle } from "@/components/blog/blog-views"
import { blogPostMetadata } from "@/lib/blog-meta"
import { getPost } from "@/lib/content"
import type { Lang } from "@/lib/i18n"

type Props = { params: Promise<{ lang: string; slug: string }> }

// Rendered on first request, then cached (see the [lang] layout).
export const dynamicParams = true
export function generateStaticParams() {
  return []
}

export const generateMetadata = async ({ params }: Props) => {
  const { lang, slug } = await params
  return blogPostMetadata(lang as Lang, slug)
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  if (!(await getPost(lang as Lang, slug))) notFound()
  return <BlogArticle lang={lang as Lang} slug={slug} />
}
