"use client"

import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, MessageCircle } from "lucide-react"
import Link from "next/link"
import { LangSwitch, Logo, useNavLinks } from "@/components/header"
import { useLang, useSettings, useT, useWa } from "@/components/lang"
import { homePath, localePath, PATHS } from "@/lib/i18n"
import { LOCAL_CITIES, LOCAL_SHORT, services } from "@/lib/page-content/services"
import { openConsentSettings } from "@/lib/consent"
import { pui } from "@/lib/pages-ui"

export default function Footer() {
  const t = useT()
  const f = t.footer
  const s = useSettings()
  const wa = useWa()
  const lang = useLang()
  const year = new Date().getFullYear()
  const { links: navLinks, isHome } = useNavLinks()
  const servicesHref = isHome ? "#services" : `${homePath(lang)}#services`
  const u = pui[lang]
  // Footer service names (CMS) link to their service pages, in the same order.
  const serviceHref = (i: number) => (services[i] ? localePath(lang, PATHS.service(services[i].slug)) : servicesHref)
  const socials = [
    { label: "WhatsApp", href: `https://wa.me/${s.waNumber}`, icon: MessageCircle },
    { label: "Instagram", href: s.instagram, icon: Instagram },
    { label: "Google Maps", href: s.mapsUrl, icon: MapPin },
    { label: "Facebook", href: s.facebook, icon: Facebook },
    { label: "Email", href: s.email ? `mailto:${s.email}` : "", icon: Mail },
  ].filter((x) => x.href)

  return (
    <footer id="contact" className="relative overflow-hidden pt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/55">{f.about}</p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/[0.08] text-ink/60 transition-all duration-500 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">{f.servicesLabel}</h4>
            <ul className="mt-5 space-y-3">
              {f.services.map((item, i) => (
                <li key={item}>
                  <Link href={serviceHref(i)} className="text-sm text-ink/70 transition-colors duration-300 hover:text-brand">
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={localePath(lang, PATHS.local("cikarang"))} className="text-sm text-ink/70 transition-colors duration-300 hover:text-brand">
                  {u.footer.local}
                </Link>
              </li>
              <li className="flex flex-wrap items-center gap-x-1.5 text-sm text-ink/45">
                {u.footer.alsoIn}
                {LOCAL_CITIES.filter((c) => c !== "cikarang").map((c, i) => (
                  <span key={c} className="inline-flex items-center gap-1.5">
                    {i > 0 && <span aria-hidden="true">·</span>}
                    <Link href={localePath(lang, PATHS.local(c))} className="text-ink/70 transition-colors duration-300 hover:text-brand">
                      {LOCAL_SHORT[c]}
                    </Link>
                  </span>
                ))}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">{f.navLabel}</h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink/70 transition-colors duration-300 hover:text-brand">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">{f.contactLabel}</h4>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={wa(t.wa.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-brand"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  {f.chatWa}
                  <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </li>
              <li>
                <Link href={localePath(lang, PATHS.brief)} className="text-sm text-ink/70 transition-colors duration-300 hover:text-brand">
                  {u.footer.brief}
                </Link>
              </li>
              <li>
                <Link href={localePath(lang, PATHS.calculator)} className="text-sm text-ink/70 transition-colors duration-300 hover:text-brand">
                  {u.footer.calculator}
                </Link>
              </li>
              {s.mapsUrl && (
                <li>
                  <a
                    href={s.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-ink/70 transition-colors duration-300 hover:text-brand"
                  >
                    <MapPin size={15} className="text-brand" />
                    {f.maps}
                    <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </li>
              )}
            </ul>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink/55">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-soft absolute h-2 w-2 rounded-full bg-emerald-500" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {f.available}
            </p>
            <LangSwitch className="mt-6 w-fit" />
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-ink/[0.07] py-8 text-xs text-ink/45 md:flex-row">
          <p>
            © {year} YMS Web Studio. {f.rights}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={localePath(lang, PATHS.privacy)} className="transition-colors hover:text-ink">
              {f.privacy}
            </Link>
            <Link href={localePath(lang, PATHS.terms)} className="transition-colors hover:text-ink">
              {f.terms}
            </Link>
            <button type="button" onClick={openConsentSettings} className="transition-colors hover:text-ink">
              {u.footer.cookies}
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-center font-semibold leading-[0.75] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(11,18,32,0.08)] [font-size:clamp(5rem,22vw,20rem)]"
      >
        YMS<span className="font-serif font-normal italic">studio</span>
      </div>
    </footer>
  )
}
