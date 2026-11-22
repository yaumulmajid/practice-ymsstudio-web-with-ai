"use client"

// Site-wide conversion tracking: every click on a WhatsApp link (any button, any page)
// sends a GA4 "whatsapp_click" event and the Google Ads WhatsApp conversion.
// gtag itself is loaded in site-document.tsx.
import { useEffect } from "react"

/** Google Ads conversion for WhatsApp chats (same label the floating button used before). */
export const ADS_WA_CONVERSION = "AW-17737646735/hlfWCMHqi9obEI-F_IlC"

type Gtag = (...args: unknown[]) => void

export default function Analytics() {
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
