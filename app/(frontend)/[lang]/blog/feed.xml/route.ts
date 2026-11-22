// RSS 2.0 feed of the blog: /blog/feed.xml (Indonesian) and /en/blog/feed.xml.
// proxy.ts rewrites /blog/feed.xml to /id/blog/feed.xml like any other Indonesian page.
import { getPosts } from "@/lib/content"
import { blogPath, isLang, ui } from "@/lib/i18n"
import { SITE } from "@/lib/seo"

export const dynamic = "force-dynamic"

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c] as string)
const rfc822 = (date: string) => new Date(`${date}T08:00:00+07:00`).toUTCString()

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) return new Response("Not found", { status: 404 })
  const t = ui[lang].blog
  const posts = (await getPosts(lang)).slice(0, 50)
  const self = `${SITE}${blogPath(lang)}/feed.xml`

  const items = posts
    .map((p) => {
      const url = `${SITE}${blogPath(lang, p.slug)}`
      return `
    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${p.date ? `<pubDate>${rfc822(p.date)}</pubDate>` : ""}
      ${p.category ? `<category>${esc(p.category)}</category>` : ""}
      <description>${esc(p.excerpt)}</description>
    </item>`
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`YMS Studio Blog — ${t.titleA} ${t.titleEm}`)}</title>
    <link>${SITE}${blogPath(lang)}</link>
    <description>${esc(t.text)}</description>
    <language>${lang === "id" ? "id-ID" : "en-US"}</language>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    ${posts[0]?.date ? `<lastBuildDate>${rfc822(posts[0].updated || posts[0].date)}</lastBuildDate>` : ""}${items}
  </channel>
</rss>
`
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=900, s-maxage=3600" },
  })
}
