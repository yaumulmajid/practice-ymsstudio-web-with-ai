// Article page extras: heading anchors + table of contents, share buttons, author box.
import type React from "react"
import Link from "next/link"
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react"
import { slugify } from "@/payload/fields"
import ShareButtons from "@/components/blog/share-buttons"
import { localePath, type Lang } from "@/lib/i18n"
import { pui } from "@/lib/pages-ui"

type LexNode = { type?: string; tag?: string; text?: string; children?: LexNode[] }

const textOf = (node: LexNode): string => (node.text ?? "") + (node.children ?? []).map(textOf).join("")

/** Stable, unique ids for headings in document order (same algorithm for TOC and anchors). */
function idMaker() {
  const seen = new Map<string, number>()
  return (text: string) => {
    const base = slugify(text) || "bagian"
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    return n ? `${base}-${n + 1}` : base
  }
}

export type TocItem = { id: string; text: string; level: 2 | 3 }

export function tocFrom(content: unknown): TocItem[] {
  const root = (content as { root?: LexNode } | null)?.root
  const nextId = idMaker()
  const out: TocItem[] = []
  for (const node of root?.children ?? []) {
    if (node.type !== "heading" || (node.tag !== "h2" && node.tag !== "h3")) continue
    const text = textOf(node).trim()
    if (text) out.push({ id: nextId(text), text, level: node.tag === "h2" ? 2 : 3 })
  }
  return out
}

/** RichText converters that give h2/h3 the same ids as the table of contents. */
export function headingConverters(): JSXConvertersFunction {
  const nextId = idMaker()
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const tag = node.tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
      if (tag !== "h2" && tag !== "h3") {
        const Tag = tag
        return <Tag>{children}</Tag>
      }
      const text = textOf(node as unknown as LexNode).trim()
      const Tag = tag
      return <Tag id={text ? nextId(text) : undefined}>{children}</Tag>
    },
  })
}

/** Table of contents (shown when the article has at least 3 main sections). */
export function Toc({ items, lang }: { items: TocItem[]; lang: Lang }) {
  if (items.filter((i) => i.level === 2).length < 3) return null
  return (
    <nav aria-label={pui[lang].blog.toc} className="mt-12 rounded-[24px] border border-ink/[0.07] bg-white p-6 sm:p-7">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">{pui[lang].blog.toc}</p>
      <ol className="mt-4 space-y-2.5 text-sm sm:text-[15px]">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-5" : ""}>
            <a href={`#${item.id}`} className="text-ink/65 transition-colors duration-300 hover:text-brand-deep">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function AuthorBox({ lang }: { lang: Lang }) {
  const b = pui[lang].blog
  return (
    <aside className="mt-12 flex flex-col gap-5 rounded-[24px] border border-ink/[0.07] bg-white p-6 sm:flex-row sm:items-start sm:p-7">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink font-serif text-xl italic text-white" aria-hidden="true">
        Y
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">{b.authorLabel}</p>
        <p className="mt-1 text-lg font-semibold tracking-[-0.02em] text-ink">{b.authorName}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{b.authorBio}</p>
        <Link href={`${localePath(lang, "/")}#work`} className="mt-3 inline-block text-sm font-medium text-brand-deep underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
          {b.authorCta} →
        </Link>
      </div>
    </aside>
  )
}

export function ShareRow({ url, title, lang }: { url: string; title: string; lang: Lang }): React.ReactElement {
  return <ShareButtons url={url} title={title} labels={pui[lang].blog} />
}
