import type { CollectionAfterReadHook, GlobalAfterReadHook } from 'payload'

import { EN_SUFFIX } from '../fields'

/** Context flag set by the website's queries: `{ lang: 'en' }` reads English with ID fallback. */
export type LangContext = { lang?: 'id' | 'en' }

/** True when a value has something to show (non-blank text, or rich text containing text). */
function hasContent(value: unknown): boolean {
  if (value == null) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (typeof value === 'object') {
    // Lexical rich text: look for any non-blank text node
    const walk = (node: unknown): boolean => {
      if (!node || typeof node !== 'object') return false
      const n = node as { text?: unknown; children?: unknown[]; root?: unknown }
      if (typeof n.text === 'string' && n.text.trim()) return true
      if (n.root) return walk(n.root)
      return Array.isArray(n.children) && n.children.some(walk)
    }
    return 'root' in (value as object) ? walk(value) : true
  }
  return true
}

/**
 * For every `x` / `xEn` pair (at any depth: groups, arrays, populated relations),
 * put the English text in `x` when it is filled in. Components keep reading `x`.
 */
function applyEnglish<T>(value: T): T {
  if (Array.isArray(value)) return value.map(applyEnglish) as T
  if (!value || typeof value !== 'object' || value instanceof Date) return value
  const source = value as Record<string, unknown>
  const out: Record<string, unknown> = {}
  for (const [key, v] of Object.entries(source)) out[key] = applyEnglish(v)
  for (const key of Object.keys(source)) {
    if (!key.endsWith(EN_SUFFIX)) continue
    const base = key.slice(0, -EN_SUFFIX.length)
    if (base && base in source && hasContent(source[key])) out[base] = out[key]
  }
  return out as T
}

const pick = (doc: unknown, context: unknown) =>
  (context as LangContext | undefined)?.lang === 'en' ? applyEnglish(doc) : doc

/** afterRead hook for collections: English view of bilingual fields when `context.lang === 'en'`. */
export const pickLanguageCollection: CollectionAfterReadHook = ({ doc, context }) =>
  pick(doc, context)

/** afterRead hook for globals. */
export const pickLanguageGlobal: GlobalAfterReadHook = ({ doc, context }) => pick(doc, context)
