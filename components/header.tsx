"use client"

import { useEffect, useState, type MouseEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, Facebook, FileText, Instagram, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { blogPath, homePath, LANGS, localePath, PATHS, type Lang } from "@/lib/i18n"
import { useBlogSlugs, useLang, useSettings, useT, useWa } from "@/components/lang"
import { services } from "@/lib/page-content/services"
import { pui } from "@/lib/pages-ui"

type NavLink = { name: string; id: string; href: string }

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
  const settings = useSettings()
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

      {/* Mobile menu: full-screen sheet revealed from the menu button */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="fixed inset-0 -z-10 bg-background md:hidden"
        style={{
          clipPath: isOpen ? "circle(150% at calc(100% - 3.25rem) 2.75rem)" : "circle(0% at calc(100% - 3.25rem) 2.75rem)",
          transition: "clip-path 0.8s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
        <div className="relative flex h-[100dvh] flex-col overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24">
          <ul>
            {navLinks.map((link, i) => {
              const on = active === link.id
              return (
                <li
                  key={link.id}
                  className={`border-b border-ink/[0.06] transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: isOpen ? `${120 + i * 45}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => go(e, link)}
                    aria-current={on ? "page" : undefined}
                    className="group flex items-center gap-4 py-3.5"
                  >
                    <span className="w-6 text-[11px] font-medium tabular-nums text-ink/30">0{i + 1}</span>
                    <span
                      className={`flex-1 text-[1.75rem] font-semibold leading-none tracking-[-0.03em] transition-colors duration-300 ${
                        on ? "text-brand" : "text-ink group-active:text-brand"
                      }`}
                    >
                      {link.name}
                    </span>
                    {on ? (
                      <span className="h-2 w-2 rounded-full bg-brand" />
                    ) : (
                      <ArrowUpRight size={20} className="text-ink/25 transition-transform duration-500 group-hover:rotate-45" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div
            className={`mt-7 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: isOpen ? `${160 + navLinks.length * 45}ms` : "0ms" }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">{m.explore}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {services.map((sv) => (
                <Link
                  key={sv.slug}
                  href={localePath(lang, PATHS.service(sv.slug))}
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-ink/[0.08] bg-white px-3.5 py-2 text-sm text-ink/70 transition-colors active:border-ink/25"
                >
                  {sv.copy[lang].name}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`mt-auto pt-8 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: isOpen ? `${220 + navLinks.length * 45}ms` : "0ms" }}
          >
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={consult}
                target="_blank"
                rel="noopener noreferrer"
                data-track="mobile_menu"
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#25D366] text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(37,211,102,0.7)]"
              >
                <MessageCircle size={18} /> {m.chat}
              </a>
              <Link
                href={`${localePath(lang, PATHS.brief)}#brief`}
                onClick={() => setIsOpen(false)}
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink text-sm font-semibold text-white"
              >
                <FileText size={17} /> {m.brief}
              </Link>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="inline-flex items-center gap-2 text-xs text-ink/55">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-soft absolute h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {m.available}
              </p>
              <div className="flex items-center gap-1.5">
                {[
                  { href: settings.instagram, icon: Instagram, label: "Instagram" },
                  { href: settings.facebook, icon: Facebook, label: "Facebook" },
                ]
                  .filter((x) => x.href)
                  .map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-ink/[0.08] text-ink/55"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
