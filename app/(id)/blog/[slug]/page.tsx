import { notFound } from "next/navigation"
import { BlogArticle } from "@/components/blog/blog-views"
import { blogPostMetadata, blogStaticParams } from "@/lib/blog-meta"
import { getPost } from "@/lib/content"

type Props = { params: Promise<{ slug: string }> }

// Every post is generated at build time; unknown slugs are a 404.
export const dynamicParams = false
export const generateStaticParams = () => blogStaticParams("id")
export const generateMetadata = async ({ params }: Props) => blogPostMetadata("id", (await params).slug)

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!(await getPost("id", slug))) notFound()
  return <BlogArticle lang="id" slug={slug} />
}
