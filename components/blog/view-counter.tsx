"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

/**
 * Read counter on the article page. Counts one read per browser session per article
 * (a refresh does not count again), then shows the live total. The page itself is
 * cached, so the server-rendered number is only the starting value.
 */
export default function ViewCounter({ slug, initial, label, locale }: { slug: string; initial: number; label: string; locale: string }) {
  const [views, setViews] = useState(initial)

  useEffect(() => {
    const key = `yms:read:${slug}`
    let counted = false
    try {
      counted = sessionStorage.getItem(key) === "1"
    } catch {
      /* storage blocked: count anyway */
    }
    const url = `/api/posts/${encodeURIComponent(slug)}/${counted ? "views" : "view"}`
    fetch(url, { method: counted ? "GET" : "POST", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { views?: number } | null) => {
        if (typeof data?.views === "number") setViews(data.views)
        if (!counted) {
          try {
            sessionStorage.setItem(key, "1")
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {})
  }, [slug])

  return (
    <span className="inline-flex items-center gap-1" title={label}>
      <Eye size={12} /> {views.toLocaleString(locale)} {label}
    </span>
  )
}
