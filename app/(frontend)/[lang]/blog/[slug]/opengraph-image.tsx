import { getPost } from "@/lib/content"
import { isLang, ui } from "@/lib/i18n"
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "YMS Studio Blog"

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const post = isLang(lang) ? await getPost(lang, slug) : null
  if (!post || !isLang(lang)) return ogCard({ kicker: "Blog", title: "YMS Studio" })
  return ogCard({ kicker: post.category || "Blog", title: post.title, footer: `Blog · ${post.minutes} ${ui[lang].blog.minRead}` })
}
