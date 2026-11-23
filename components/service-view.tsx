// Service landing page (/layanan/<slug>) and the local pages (/jasa-website-<city>).
// Copy comes from lib/page-content/services.ts; prices, timelines, features and the
// process steps come from the CMS so they never drift from the home page.
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Calculator, Check, Clock, MapPin, Plus } from "lucide-react"
import CTA from "@/components/cta"
import { Eyebrow, Reveal } from "@/components/motion"
import { Breadcrumbs, JsonLd, PageHero, Shell } from "@/components/page-shell"
import { getSite } from "@/lib/content"
import { localePath, PATHS, tierMessage, waLink, type Lang, type Project, type Tier } from "@/lib/i18n"
import { absUrl, breadcrumbLd, crumbs, faqLd } from "@/lib/page-meta"
import { LOCAL_CITIES, LOCAL_SHORT, locals, services, type LocalCity, type LocalCopy, type Service, type ServiceCopy } from "@/lib/page-content/services"
import { pui } from "@/lib/pages-ui"

/** "2jt" → 2000000, "3,5jt" → 3500000 (for structured data). */
export function priceToNumber(price: string): number | undefined {
  const m = price.replace(/\s/g, "").match(/^([\d.,]+)(jt|juta|rb|ribu)?$/i)
  if (!m) return undefined
  const n = Number(m[1].replace(/\./g, "").replace(",", "."))
  const unit = m[2]?.toLowerCase()
  return Math.round(n * (unit?.startsWith("j") ? 1_000_000 : unit?.startsWith("r") ? 1_000 : 1))
}

const btnDark =
  "group inline-flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-deep"
const btnLight =
  "inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink/25"

function ProjectCard({ p, lang, label }: { p: Project; lang: Lang; label: string }) {
  return (
    <Link
      href={localePath(lang, PATHS.project(p.slug))}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/[0.07] bg-white p-3 transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.2)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-ink/5">
        {p.image && (
          <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 pt-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-deep">{p.category}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em] text-ink">{p.title}</h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ink">
          {label} <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  )
}

function Faqs({ items, title }: { items: { q: string; a: string }[]; title: string }) {
  return (
    <section className="mt-24">
      <Reveal as="h2" className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
        {title}
      </Reveal>
      <div className="mt-8 divide-y divide-ink/[0.07] border-y border-ink/[0.07]">
        {items.map((f) => (
          <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-medium text-ink sm:text-lg">
              {f.q}
              <Plus size={20} className="mt-1 shrink-0 text-ink/40 transition-transform duration-500 group-open:rotate-45" />
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/60 sm:text-base">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

type Props = { lang: Lang } & ({ kind: "service"; service: Service } | { kind: "local"; city: LocalCity })

export default async function ServiceView(props: Props) {
  const { lang } = props
  const u = pui[lang]
  const site = await getSite(lang)
  const t = site.dict
  const localCopy: LocalCopy | undefined = props.kind === "local" ? locals[props.city].copy[lang] : undefined
  const copy: ServiceCopy = props.kind === "service" ? props.service.copy[lang] : localCopy!
  const path = props.kind === "service" ? PATHS.service(props.service.slug) : PATHS.local(props.city)
  const tier: Tier | undefined = props.kind === "service" && props.service.tierIndex !== null ? t.pricing.tiers[props.service.tierIndex] : undefined
  const isCustom = props.kind === "service" && props.service.tierIndex === null

  const wanted = props.kind === "service" ? props.service.projects : site.projects.map((p) => p.slug)
  const picked = wanted
    .map((slug) => site.projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p))
  // A listed project may be hidden in the CMS: top up with other projects so there are still three.
  const projects = [...picked, ...site.projects.filter((p) => !picked.includes(p))].slice(0, 3)

  const waText = tier ? tierMessage(t.wa.tier, tier.name, tier.price) : isCustom ? t.wa.custom : t.wa.general
  const wa = waLink(site.settings.waNumber, waText)
  const trail = [{ name: copy.name, path }]
  const price = tier ? priceToNumber(tier.price) : undefined

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${copy.title} ${copy.em}`,
    serviceType: copy.name,
    description: copy.description,
    url: absUrl(lang, path),
    provider: { "@type": "LocalBusiness", "@id": "https://ymsstudio.id/#services", name: "YMS Studio", url: "https://ymsstudio.id" },
    areaServed: props.kind === "local" ? locals[props.city].areaServed.map((name) => ({ "@type": "City", name })) : { "@type": "Country", name: "Indonesia" },
    ...(price ? { offers: { "@type": "Offer", price: String(price), priceCurrency: "IDR", url: absUrl(lang, path), availability: "https://schema.org/InStock" } } : {}),
  }

  return (
    <Shell>
      <JsonLd data={breadcrumbLd(lang, trail)} />
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd(copy.faqs)} />

      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
        <Breadcrumbs items={crumbs(lang, trail)} />

        {/* Hero + price card */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <PageHero label={props.kind === "local" ? locals[props.city].label : u.service.label} title={copy.title} em={copy.em} text={copy.intro}>
            <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className={btnDark}>
                {u.service.ctaWa}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </a>
              <Link href={localePath(lang, PATHS.calculator)} className={btnLight}>
                <Calculator size={16} /> {u.service.ctaCalc}
              </Link>
            </Reveal>
          </PageHero>

          {props.kind === "service" && (
            <Reveal delay={200} className="rounded-[28px] border border-ink/[0.07] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(11,18,32,0.25)]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">{tier ? u.service.from : copy.name}</p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-ink">
                {tier ? (
                  <>
                    <span className="mr-1 text-lg font-medium text-ink/45">{t.pricing.currency}</span>
                    {tier.price}
                  </>
                ) : (
                  <span className="text-2xl">{u.service.custom}</span>
                )}
              </p>
              {tier?.timeline && (
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink/55">
                  <Clock size={15} /> {u.service.timeline}: {tier.timeline}
                </p>
              )}
              {tier?.tagline && <p className="mt-4 text-sm leading-relaxed text-ink/55">{tier.tagline}</p>}
              {isCustom && t.pricing.customText && <p className="mt-4 text-sm leading-relaxed text-ink/55">{t.pricing.customText}</p>}
            </Reveal>
          )}

          {localCopy && (
            <Reveal delay={200} className="rounded-[28px] bg-ink p-7 text-white">
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                <MapPin size={14} /> {localCopy.areasTitle}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {localCopy.areas.map((a) => (
                  <li key={a} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80">
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/55">{localCopy.remote}</p>
            </Reveal>
          )}
        </div>

        {/* For who + benefits */}
        <section className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Reveal>
              <Eyebrow index="01">{u.service.forWho}</Eyebrow>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {copy.forWho.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 60} className="flex gap-3 text-base leading-relaxed text-ink/70">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-deep">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal>
              <Eyebrow index="02">{u.service.benefits}</Eyebrow>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 80} className="rounded-[24px] border border-ink/[0.07] bg-white p-6">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{b.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Included (package features) or all packages (local page) */}
        {tier && tier.features.length > 0 && (
          <section className="mt-24 rounded-[32px] bg-brand-soft/60 p-7 sm:p-10">
            <Reveal>
              <Eyebrow index="03">{u.service.included}</Eyebrow>
            </Reveal>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed text-ink/75 sm:text-base">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-deep" /> {f}
                </li>
              ))}
            </ul>
          </section>
        )}
        {localCopy && (
          <section className="mt-24">
            <Reveal>
              <Eyebrow index="03">{u.service.label}</Eyebrow>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => {
                const st = s.tierIndex !== null ? t.pricing.tiers[s.tierIndex] : undefined
                return (
                  <Reveal key={s.slug} delay={i * 70} className="h-full">
                    <Link
                      href={localePath(lang, PATHS.service(s.slug))}
                      className="group flex h-full flex-col rounded-[24px] border border-ink/[0.07] bg-white p-6 transition-[transform,box-shadow] duration-700 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.2)]"
                    >
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">{s.copy[lang].name}</h3>
                      <p className="mt-2 text-sm text-ink/55">
                        {st ? `${u.service.from} ${t.pricing.currency} ${st.price}` : u.service.custom}
                      </p>
                      <ArrowUpRight size={18} className="mt-auto pt-4 text-ink/40 transition-transform duration-500 group-hover:rotate-45 group-hover:text-ink" />
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          </section>
        )}

        {/* Process (CMS) */}
        {t.services.steps.length > 0 && (
          <section className="mt-24">
            <Reveal>
              <Eyebrow index="04">{u.service.process}</Eyebrow>
            </Reveal>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.services.steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 80} className="rounded-[24px] border border-ink/[0.07] bg-white p-6">
                  <span className="font-serif text-2xl italic text-brand">0{i + 1}</span>
                  <h3 className="mt-3 text-base font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{s.text}</p>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* Work */}
        {projects.length > 0 && (
          <section className="mt-24">
            <Reveal as="h2" className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
              {u.service.work}
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80} className="h-full">
                  <ProjectCard p={p} lang={lang} label={u.service.viewCase} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <Faqs items={copy.faqs} title={u.service.faq} />

        {/* Other services */}
        {props.kind === "service" && (
          <section className="mt-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">{u.service.other}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {services
                .filter((s) => s.slug !== props.service.slug)
                .map((s) => (
                  <Link key={s.slug} href={localePath(lang, PATHS.service(s.slug))} className={btnLight}>
                    {s.copy[lang].name}
                  </Link>
                ))}
              <Link href={localePath(lang, PATHS.local("bekasi"))} className={btnLight}>
                <MapPin size={15} /> {locals.bekasi.copy[lang].name}
              </Link>
            </div>
          </section>
        )}

        {/* Other areas */}
        {props.kind === "local" && (
          <section className="mt-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">{u.service.otherAreas}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {LOCAL_CITIES.filter((c) => c !== props.city).map((c) => (
                <Link key={c} href={localePath(lang, PATHS.local(c))} className={btnLight}>
                  <MapPin size={15} /> {LOCAL_SHORT[c]}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <CTA />
      <div className="h-3 sm:h-5" />
    </Shell>
  )
}

export const serviceSlugs = services.map((s) => s.slug)
