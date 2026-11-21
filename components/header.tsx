"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { waLink } from "@/lib/site-data"
import { homePath, LANGS } from "@/lib/i18n"
import { useLang, useT } from "@/components/lang"

export function Logo({ className = "" }: { className?: string }) {
  const lang = useLang()
  return (
    <Link
      href={homePath(lang)}
      className={`group inline-flex items-baseline gap-1 font-semibold tracking-tight ${className}`}
      aria-label="YMS Studio"
    >
      <span className="text-lg text-ink">YMS</span>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand transition-transform duration-500 group-hover:scale-150" />
      <span className="font-serif text-lg font-normal italic text-ink/70">studio</span>
    </Link>
  )
}

/** ID | EN switch. Plain links so each language has its own crawlable URL. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang()
  return (
    <div className={`flex items-center rounded-full bg-ink/[0.05] p-0.5 text-[11px] font-semibold ${className}`} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <Link
          key={l}
          href={homePath(l)}
          hrefLang={l}
          aria-current={l === lang ? "page" : undefined}
          className={`rounded-full px-2.5 py-1.5 uppercase transition-all duration-300 ${
            l === lang ? "bg-white text-ink shadow-sm" : "text-ink/45 hover:text-ink"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  )
}

export default function Header() {
  const t = useT()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [active, setActive] = useState("")

  const navLinks = [
    { name: t.nav.work, id: "work" },
    { name: t.nav.services, id: "services" },
    ...(t.reviews.items.length ? [{ name: t.nav.reviews, id: "reviews" }] : []),
    { name: t.nav.pricing, id: "pricing" },
    { name: t.nav.faq, id: "faq" },
  ]
  const consult = waLink(t.wa.general)

  useEffect(() => {
    const ids = ["work", "services", "reviews", "pricing", "faq"]
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
      const current = ids.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect()
        return rect ? rect.top <= 160 && rect.bottom >= 160 : false
      })
      setActive(current ?? "")
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
  }, [isOpen])

  const go = (id: string) => {
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const solid = isScrolled || isOpen

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-5 pr-2 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:pl-6 ${
          solid
            ? "border border-ink/[0.06] bg-white/80 shadow-[0_8px_30px_-12px_rgba(11,18,32,0.15)] backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const on = active === link.id
            return (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    on ? "text-ink" : "text-ink/50 hover:text-ink"
                  }`}
                  aria-current={on ? "true" : undefined}
                >
                  <span
                    className={`absolute inset-0 -z-10 rounded-full bg-ink/[0.05] transition-all duration-500 ${
                      on ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`}
                  />
                  {link.name}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <a
            href={consult}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-[13px] font-medium text-white transition-all duration-500 hover:bg-brand-deep sm:inline-flex"
          >
            {t.nav.cta}
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={14} />
            </span>
          </a>

          <button
            className="relative grid h-10 w-10 place-items-center rounded-full md:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? t.nav.close : t.nav.open}
            aria-expanded={isOpen}
          >
            {[0, 1].map((i) => (
              <span
                key={i}
                className={`absolute h-px w-5 bg-ink transition-all duration-500 ${
                  isOpen ? (i ? "-rotate-45" : "rotate-45") : i ? "translate-y-[4px]" : "-translate-y-[4px]"
                }`}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-ink/[0.06] bg-white/95 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:hidden ${
          isOpen ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="p-3">
          {navLinks.map((link, i) => (
            <li
              key={link.id}
              className={`transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? `${80 + i * 50}ms` : "0ms" }}
            >
              <button
                onClick={() => go(link.id)}
                className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-2xl font-medium tracking-tight text-ink transition-colors hover:bg-ink/[0.03]"
              >
                {link.name}
                <span className="text-xs font-normal text-ink/30">0{i + 1}</span>
              </button>
            </li>
          ))}
          <li className="p-1 pt-2">
            <a
              href={consult}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-medium text-white"
            >
              {t.nav.cta} <ArrowUpRight size={16} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
