"use client"

import { useEffect, useState } from "react"
import { useT, useWa } from "@/components/lang"

export default function WhatsAppButton() {
  const t = useT()
  const wa = useWa()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <a
      href={wa(t.wa.float)}
      target="_blank"
      rel="noopener noreferrer"
      data-track="floating_button"
      aria-label="Chat WhatsApp"
      className={`group fixed bottom-5 right-5 z-50 flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:bottom-6 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink opacity-0 shadow-lg ring-1 ring-ink/[0.06] transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        {t.cta.button}
      </span>
      <span
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-500 group-hover:scale-105"
        style={{ animation: "waGlow 3s ease-in-out infinite" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.73 0 .58 5.15.58 11.47c0 2.02.52 4 .1 5.88L0 24l6.86-1.82a12.18 12.18 0 0 0 5.14 1.18h.01c6.32 0 11.47-5.15 11.47-11.47 0-3.07-1.2-5.95-3.46-8.21ZM12.04 22a10.1 10.1 0 0 1-5.18-1.42l-.37-.22-4.07 1.08 1.09-3.97-.24-.41A10 10 0 1 1 12.04 22Zm5.55-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37 0-.52-.05-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.19 5.1 4.38.71.3 1.27.47 1.7.6.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </span>
    </a>
  )
}
