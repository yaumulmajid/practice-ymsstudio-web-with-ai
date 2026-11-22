"use client"

import { useEffect, useState, type MouseEvent } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  ChevronRight,
  FileText,
  HelpCircle,
  LayoutGrid,
  Mail,
  MessageCircle,
  Sparkles,
  Star,
  Tag,
  type LucideIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { blogPath, homePath, LANGS, localePath, PATHS, type Lang } from "@/lib/i18n"
import { useBlogSlugs, useLang, useT, useWa } from "@/components/lang"
import { services } from "@/lib/page-content/services"
import { pui } from "@/lib/pages-ui"

type NavLink = { name: string; id: string; href: string }

const NAV_ICONS: Record<string, LucideIcon> = {
  work: LayoutGrid,
  services: Sparkles,
  reviews: Star,
  pricing: Tag,
  faq: HelpCircle,
  blog: BookOpen,
  contact: Mail,
}

/** Path without the language prefix ("/en/blog" → "/blog"). Indonesian pages are served
 *  through an internal /id rewrite, so that prefix is stripped too. */
const barePath = (pathname: string | null) => (pathname ?? "/").replace(/^\/(id|en)(?=\/|$)/, "") || "/"

/** Section links (scroll on the home page, navigate elsewhere) plus Blog. */
export function useNavLinks(): { links: NavLink[]; isHome: boolean } {
  const t = useT()
  const lang = useLang()
  const home = homePath(lang)
  const isHome = barePath(usePathname()) === "/"
  const section = (name: string, id: string) => ({ name, id, href: isHome ? `#${id}` : `${home}#${id}` })
  return {
    isHome,
    links: [
      section(t.nav.work, "work"),
      section(t.nav.services, "services"),
      ...(t.reviews.items.length ? [section(t.nav.reviews, "reviews")] : []),
      section(t.nav.pricing, "pricing"),
      section(t.nav.faq, "faq"),
      { name: t.nav.blog, id: "blog", href: blogPath(lang) },
      { name: t.nav.contact, id: "contact", href: localePath(lang, PATHS.brief) },
    ],
  }
}

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

/** The same page in another language (blog posts map to their translation by slug). */
function useLangHref() {
  const path = barePath(usePathname())
  const slugs = useBlogSlugs()
  return (l: Lang) => {
    const post = path.match(/^\/blog\/([^/]+)/)
    if (post) return slugs[l].includes(post[1]) ? blogPath(l, post[1]) : blogPath(l)
    if (path.startsWith("/blog")) return blogPath(l)
    // Other pages use the same path in both languages (/x ↔ /en/x).
    return path === "/" || path === "" ? homePath(l) : localePath(l, path)
  }
}

/** ID | EN switch. Plain links so each language has its own crawlable URL. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang()
  const hrefFor = useLangHref()
  return (
    <div className={`flex items-center rounded-full bg-ink/[0.05] p-0.5 text-[11px] font-semibold ${className}`} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
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
  const wa = useWa()
  const pathname = barePath(usePathname())
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [active, setActive] = useState("")

  const { links: navLinks, isHome } = useNavLinks()
  const consult = wa(t.wa.general)
  const lang = useLang()
  const m = pui[lang].menu

  useEffect(() => {
    const ids = ["work", "services", "reviews", "pricing", "faq"]
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
      if (!isHome) return setActive(pathname.startsWith("/blog") ? "blog" : pathname.startsWith(PATHS.brief) ? "contact" : "")
      const current = ids.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect()
        return rect ? rect.top <= 160 && rect.bottom >= 160 : false
      })
      setActive(current ?? "")
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome, pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    document.body.dataset.menu = isOpen ? "open" : ""
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  const go = (e: MouseEvent, link: NavLink) => {
    setIsOpen(false)
    const el = link.href.startsWith("#") ? document.getElementById(link.id) : null
    if (el) {
      e.preventDefault()
      window.setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), isOpen ? 60 : 0)
    }
  }

  const solid = isScrolled || isOpen

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-5 pr-2 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:pl-6 ${
          isOpen
            ? "border border-ink/[0.06] bg-white shadow-[0_8px_30px_-12px_rgba(11,18,32,0.15)]"
            : solid
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
                <Link
                  href={link.href}
                  onClick={(e) => go(e, link)}
                  className={`relative block whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 lg:px-4 ${
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
                </Link>
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
            className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-[13px] font-medium text-white transition-all duration-500 hover:bg-brand-deep sm:inline-flex md:hidden lg:inline-flex"
          >
            {t.nav.cta}
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={14} />
            </span>
          </a>

          <button
            className={`relative inline-flex h-10 items-center gap-2.5 rounded-full pl-4 pr-3 text-[13px] font-medium transition-colors duration-500 md:hidden ${
              isOpen ? "bg-ink text-white" : "bg-ink/[0.06] text-ink"
            }`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? t.nav.close : t.nav.open}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true">{m.label}</span>
            <span className="relative grid h-4 w-4 place-items-center" aria-hidden="true">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className={`absolute h-[1.5px] rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                    isOpen ? `w-4 ${i ? "-rotate-45" : "rotate-45"}` : i ? "w-2.5 translate-x-[3px] translate-y-[3px]" : "w-4 -translate-y-[3px]"
                  }`}
                />
              ))}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu: dark sheet revealed from the Menu button. Rows carry an icon and a
          one-line description (information scent); contact actions sit in a dock at the
          bottom, within thumb reach. */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="fixed inset-0 -z-10 overflow-hidden bg-background text-ink md:hidden"
        style={{
          clipPath: isOpen ? "circle(150% at calc(100% - 3.25rem) 2.75rem)" : "circle(0% at calc(100% - 3.25rem) 2.75rem)",
          transition: "clip-path 0.8s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="animate-drift absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(42,142,158,0.18),transparent)]" />
          <div className="absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(42,142,158,0.1),transparent)]" />
        </div>

        <div className="relative flex h-[100dvh] flex-col">
          {/* Scrollable navigation */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-10 pt-24 [@media(max-height:720px)]:pt-[5.5rem]">
            <ul className="space-y-1">
              {navLinks.map((link, i) => {
                const on = active === link.id
                const Icon = NAV_ICONS[link.id] ?? ChevronRight
                return (
                  <li
                    key={link.id}
                    className={`transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
                    style={{ transitionDelay: isOpen ? `${120 + i * 40}ms` : "0ms" }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => go(e, link)}
                      aria-current={on ? "page" : undefined}
                      className={`group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-colors [@media(max-height:720px)]:py-1.5 duration-300 active:bg-ink/[0.05] ${on ? "bg-white shadow-[0_8px_24px_-16px_rgba(11,18,32,0.35)]" : ""}`}
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors [@media(max-height:720px)]:h-9 [@media(max-height:720px)]:w-9 duration-300 ${
                          on ? "bg-brand text-white" : "bg-white text-ink/70 ring-1 ring-ink/[0.06] group-active:bg-brand group-active:text-white"
                        }`}
                      >
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-semibold leading-tight tracking-[-0.015em]">{link.name}</span>
                        <span className="mt-0.5 block truncate text-xs text-ink/45">{m.desc[link.id as keyof typeof m.desc] ?? ""}</span>
                      </span>
                      <ChevronRight size={16} className={`shrink-0 transition-transform duration-300 group-active:translate-x-0.5 ${on ? "text-brand" : "text-ink/25"}`} />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Services: swipeable cards */}
            <div
              className={`mt-7 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
              style={{ transitionDelay: isOpen ? `${160 + navLinks.length * 40}ms` : "0ms" }}
            >
              <p className="px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">{m.explore}</p>
              <div className="-mx-5 mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-5 px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {services.map((sv) => {
                  const tier = sv.tierIndex !== null ? t.pricing.tiers[sv.tierIndex] : undefined
                  return (
                    <Link
                      key={sv.slug}
                      href={localePath(lang, PATHS.service(sv.slug))}
                      onClick={() => setIsOpen(false)}
                      className="flex w-[44%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-ink/[0.07] bg-white p-4 transition-colors active:border-ink/20"
                    >
                      <span className="text-sm font-semibold leading-snug">{sv.copy[lang].name}</span>
                      <span className="mt-3 text-xs text-ink/45">
                        {tier ? `${t.pricing.from} ${t.pricing.currency} ${tier.price}` : pui[lang].service.custom}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact dock (thumb zone) */}
          <div
            className={`relative shrink-0 rounded-t-[28px] border-t border-ink/[0.06] bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 text-ink shadow-[0_-20px_50px_-25px_rgba(11,18,32,0.25)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ transitionDelay: isOpen ? "220ms" : "0ms" }}
          >
            {/* Fade above the dock hints that the list scrolls on short screens. */}
            <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping-soft absolute h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">{m.consult}</p>
                <p className="mt-0.5 truncate text-xs text-ink/50">{m.hours}</p>
              </div>
            </div>
            <a
              href={consult}
              target="_blank"
              rel="noopener noreferrer"
              data-track="mobile_menu"
              className="group mt-4 flex h-14 items-center justify-between rounded-2xl bg-[#25D366] pl-5 pr-2 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,211,102,0.9)] transition-transform active:scale-[0.98]"
            >
              <span className="inline-flex items-center gap-2.5">
                <MessageCircle size={20} /> {m.chat}
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/20">
                <ArrowUpRight size={18} />
              </span>
            </a>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              <Link
                href={`${localePath(lang, PATHS.brief)}#brief`}
                onClick={() => setIsOpen(false)}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-ink text-sm font-medium text-white transition-transform active:scale-[0.98]"
              >
                <FileText size={16} /> {m.brief}
              </Link>
              <Link
                href={localePath(lang, PATHS.calculator)}
                onClick={() => setIsOpen(false)}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-ink/10 text-sm font-medium text-ink transition-transform active:scale-[0.98]"
              >
                <Calculator size={16} /> {m.calc}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
