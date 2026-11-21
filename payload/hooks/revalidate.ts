import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Revalidate the whole public site after content changes. The catalogue is
 * small, so a full revalidation is cheap and avoids stale cross-page data
 * (a product shows up on Home, Collections, search, related products...).
 */
function revalidateSite(context: Record<string, unknown>) {
  if (context?.disableRevalidate) return
  // Dynamic import so this module also loads outside Next.js (seed scripts, CLI).
  import('next/cache')
    .then(({ revalidatePath }) => revalidatePath('/', 'layout'))
    .catch(() => {
      /* not running inside Next.js */
    })
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateSite(req.context)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context)
  return doc
}
