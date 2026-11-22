"use client"

// Site-wide conversion tracking: every click on a WhatsApp link (any button, any page)
// sends a GA4 "whatsapp_click" event and the Google Ads WhatsApp conversion.
// gtag itself is loaded in site-document.tsx.
import { useEffect } from "react"
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent"

/** Google Ads conversion for WhatsApp chats (same label the floating button used before). */
export const ADS_WA_CONVERSION = "AW-17737646735/hlfWCMHqi9obEI-F_IlC"

type Gtag = (...args: unknown[]) => void

/** Where the visit came from, read by the brief form and stored on the lead. */
export const ATTRIBUTION_KEY = "yms_attribution"

export type Attribution = { source?: string; medium?: string; campaign?: string; gclid?: string; referrer?: string; landing?: string; at?: string }

/** This visit's entry point, read once on the first page (later pages lose the URL tags). */
function currentTouch(): Attribution {
  const q = new URLSearchParams(window.location.search)
  let ref = ""
  try {
    ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : ""
  } catch {
    /* malformed referrer */
  }
  const external = ref && ref !== window.location.hostname.replace(/^www\./, "") ? ref : ""
  return {
    source: q.get("utm_source") || undefined,
    medium: q.get("utm_medium") || undefined,
    campaign: q.get("utm_campaign") || undefined,
    gclid: q.get("gclid") || undefined,
    referrer: external || undefined,
    landing: window.location.pathname,
  }
}

/**
 * Remembers the latest *marketing* touch (UTM tags, a Google Ads click, or an external
 * referrer) for 90 days. Plain internal navigation and direct visits never overwrite it.
 * Only with analytics consent; without it any stored value is removed.
 */
function rememberAttribution(touch: Attribution, consent: Consent | null) {
  try {
    if (!consent?.analytics) {
      localStorage.removeItem(ATTRIBUTION_KEY)
      return
    }
    const saved = JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || "null") as Attribution | null
    const expired = !saved?.at || Date.now() - Date.parse(saved.at) > 90 * 864e5
    const isTouch = touch.source || touch.gclid || touch.referrer
    if (isTouch || !saved || expired) {
      localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify({ ...touch, at: new Date().toISOString() }))
    }
  } catch {
    /* storage blocked (private mode) — attribution is optional */
  }
}

export default function Analytics() {
  useEffect(() => {
    // Read the entry point now; store it now or as soon as the visitor accepts analytics.
    const touch = currentTouch()
    rememberAttribution(touch, readConsent())
    const onConsent = (e: Event) => rememberAttribution(touch, (e as CustomEvent<Consent>).detail)
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])
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
