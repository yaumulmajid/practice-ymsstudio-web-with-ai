// Contact page (/kontak): every way to reach the studio + the project brief form.
import { notFound } from "next/navigation"
import { ArrowUpRight, Check, Clock, Mail, MapPin, MessageCircle } from "lucide-react"
import BriefForm from "@/components/brief-form"
import { Reveal } from "@/components/motion"
import { Breadcrumbs, JsonLd, PageHero, Shell } from "@/components/page-shell"
import { getSite } from "@/lib/content"
import { isLang, PATHS, waLink } from "@/lib/i18n"
import { absUrl, breadcrumbLd, crumbs, pageMetadata } from "@/lib/page-meta"
import { pui } from "@/lib/pages-ui"

type Props = { params: Promise<{ lang: string }> }

export const generateMetadata = async ({ params }: Props) => {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const b = pui[lang].brief
  return pageMetadata({ lang, path: PATHS.brief, title: `${pui[lang].contact.title} · ${b.title} ${b.titleEm}`, description: b.text })
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const u = pui[lang]
  const b = u.brief
  const c = u.contact
  const { settings: s, dict } = await getSite(lang)
  const trail = [{ name: b.label, path: PATHS.brief }]

  const cards = [
    s.waNumber && { icon: MessageCircle, label: c.wa, value: s.phoneDisplay || `+${s.waNumber}`, note: c.waText, href: waLink(s.waNumber, dict.wa.general), primary: true },
    s.email && { icon: Mail, label: c.email, value: s.email, href: `mailto:${s.email}` },
    { icon: MapPin, label: c.location, value: c.locationText, href: s.mapsUrl || undefined },
    { icon: Clock, label: c.hours, value: c.hoursText },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; note?: string; href?: string; primary?: boolean }[]

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `${c.title} · YMS Studio`,
    url: absUrl(lang, PATHS.brief),
    about: { "@id": "https://ymsstudio.id/#services" },
  }

  return (
    <Shell>
      <JsonLd data={breadcrumbLd(lang, trail)} />
      <JsonLd data={contactLd} />
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
        <Breadcrumbs items={crumbs(lang, trail)} />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <PageHero label={b.label} title={b.title} em={b.titleEm} text={b.text} />

            {/* Contact options */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {cards.map(({ icon: Icon, label, value, note, href, primary }, i) => {
                const body = (
                  <>
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${primary ? "bg-[#25D366] text-white" : "bg-brand-soft text-brand-deep"}`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-xs ${primary ? "text-white/55" : "text-ink/45"}`}>{label}</span>
                      <span className={`mt-0.5 block truncate text-[15px] font-semibold ${primary ? "text-white" : "text-ink"}`}>{value}</span>
                      {note && <span className={`mt-0.5 block text-xs ${primary ? "text-white/55" : "text-ink/45"}`}>{note}</span>}
                    </span>
                    {href && <ArrowUpRight size={17} className={`shrink-0 transition-transform duration-500 group-hover:rotate-45 ${primary ? "text-white/70" : "text-ink/35"}`} />}
                  </>
                )
                const cls = `group flex items-center gap-4 rounded-[22px] p-4 transition-all duration-500 ${
                  primary ? "bg-ink hover:-translate-y-0.5 hover:bg-brand-deep sm:col-span-2 lg:col-span-1" : "border border-ink/[0.07] bg-white hover:border-ink/20"
                }`
                return (
                  <Reveal key={label} delay={200 + i * 70}>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls} data-track={primary ? "contact_page" : undefined}>
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </Reveal>
                )
              })}
            </div>

            <ul className="mt-8 hidden space-y-3 lg:block">
              {b.side.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink/60">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-soft text-brand-deep">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div id="brief" className="scroll-mt-28">
            <Reveal delay={150}>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">{c.formTitle}</h2>
              <p className="mt-2 mb-6 text-sm leading-relaxed text-ink/55 sm:text-base">{c.formText}</p>
              <BriefForm />
            </Reveal>
          </div>
        </div>
      </div>
    </Shell>
  )
}
