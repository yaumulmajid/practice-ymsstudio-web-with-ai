import { BlogIndex } from "@/components/blog/blog-views"
import { blogIndexMetadata } from "@/lib/blog-meta"
import type { Lang } from "@/lib/i18n"

type Props = { params: Promise<{ lang: string }> }

export const generateMetadata = async ({ params }: Props) => blogIndexMetadata((await params).lang as Lang)

export default async function Page({ params }: Props) {
  return <BlogIndex lang={(await params).lang as Lang} />
}
