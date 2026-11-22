"use client"

// Site-wide conversion tracking: every click on a WhatsApp link (any button, any page)
// sends a GA4 "whatsapp_click" event and the Google Ads WhatsApp conversion.
// gtag itself is loaded in site-document.tsx.
import { useEffect } from "react"

/** Google Ads conversion for WhatsApp chats (same label the floating button used before). */
export const ADS_WA_CONVERSION = "AW-17737646735/hlfWCMHqi9obEI-F_IlC"

type Gtag = (...args: unknown[]) => void

/** Where the visit came from, read by the brief form and stored on the lead. */
export const ATTRIBUTION_KEY = "yms_attribution"

export type Attribution = { source?: string; medium?: string; campaign?: string; gclid?: string; referrer?: string; landing?: string; at?: string }

/**
 * Remembers the latest *marketing* touch (UTM tags, a Google Ads click, or an external
 * referrer) for 90 days. Plain internal navigation and direct visits never overwrite it.
 */
function rememberAttribution() {
  try {
    const q = new URLSearchParams(window.location.search)
    const ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : ""
    const external = ref && ref !== window.location.hostname.replace(/^www\./, "") ? ref : ""
    const next: Attribution = {
      source: q.get("utm_source") || undefined,
      medium: q.get("utm_medium") || undefined,
      campaign: q.get("utm_campaign") || undefined,
      gclid: q.get("gclid") || undefined,
      referrer: external || undefined,
    }
    const saved = JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || "null") as Attribution | null
    const expired = !saved?.at || Date.now() - Date.parse(saved.at) > 90 * 864e5
    const isTouch = next.source || next.gclid || next.referrer
    if (isTouch || !saved || expired) {
      localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify({ ...next, landing: window.location.pathname, at: new Date().toISOString() }))
    }
  } catch {
    /* storage blocked (private mode) — attribution is optional */
  }
}

export default function Analytics() {
  useEffect(rememberAttribution, [])
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      // Article share links (data-share) open WhatsApp too, but they aren't leads.
      if (!link || link.hasAttribute("data-share") || !/^(wa\.me|api\.whatsapp\.com)\//.test(link.href.replace(/^https?:\/\//, ""))) return
      const gtag = (window as unknown as { gtag?: Gtag }).gtag
      if (!gtag) return
      const location = link.closest("[data-track]")?.getAttribute("data-track") || link.closest("section[id], footer, header, nav")?.id || link.closest("header, footer")?.tagName.toLowerCase() || "page"
      gtag("event", "whatsapp_click", {
        page_path: window.location.pathname,
        link_location: location,
        link_text: (link.textContent || link.getAttribute("aria-label") || "").trim().slice(0, 60),
      })
      gtag("event", "conversion", { send_to: ADS_WA_CONVERSION })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])
  return null
}
