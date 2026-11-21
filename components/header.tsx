"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { waLink } from "@/components/motion"

const navLinks = [
  { name: "Beranda", id: "home" },
  { name: "Layanan", id: "services" },
  { name: "Portfolio", id: "portfolio" },
  { name: "Harga", id: "pricing" },
  { name: "Hubungi", id: "contact" },
]

const CONSULT_LINK = waLink("Halo, saya ingin konsultasi tentang website")

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-baseline gap-1 font-semibold tracking-tight ${className}`}>
      <span className="text-lg text-ink">YMS</span>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand transition-transform duration-500 group-hover:scale-150" />
      <span className="font-serif text-lg italic font-normal text-ink/70">studio</span>
    </Link>
  )
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        setActive("contact")
        return
      }
      const current = navLinks.find(({ id }) => {
        const rect = document.getElementById(id)?.getBoundingClientRect()
        return rect ? rect.top <= 160 && rect.bottom >= 160 : false
      })
      if (current) setActive(current.id)
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full pl-6 pr-2 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
          isScrolled || isOpen
            ? "border border-ink/[0.06] bg-white/75 shadow-[0_8px_30px_-12px_rgba(14,17,19,0.12)] backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
        aria-label="Navigasi utama"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  active === link.id ? "text-ink" : "text-ink/50 hover:text-ink"
                }`}
                aria-current={active === link.id ? "true" : undefined}
              >
                <span
                  className={`absolute inset-0 -z-10 rounded-full bg-ink/[0.05] transition-all duration-500 ${
                    active === link.id ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                />
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={CONSULT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-[13px] font-medium text-white transition-all duration-500 hover:bg-brand-deep sm:inline-flex"
          >
            Konsultasi
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={14} />
            </span>
          </a>

          <button
            className="relative grid h-10 w-10 place-items-center rounded-full lg:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
          >
            <span
              className={`absolute h-px w-5 bg-ink transition-transform duration-500 ${
                isOpen ? "rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-ink transition-transform duration-500 ${
                isOpen ? "-rotate-45" : "translate-y-[4px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-ink/[0.06] bg-white/90 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:hidden ${
          isOpen ? "max-h-[480px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
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
              href={CONSULT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-medium text-white"
            >
              Konsultasi Gratis <ArrowUpRight size={16} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
