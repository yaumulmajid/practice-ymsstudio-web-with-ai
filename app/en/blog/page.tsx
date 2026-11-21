import { BlogIndex } from "@/components/blog/blog-views"
import { blogIndexMetadata } from "@/lib/blog-meta"

export const metadata = blogIndexMetadata("en")

export default function Page() {
  return <BlogIndex lang="en" />
}
