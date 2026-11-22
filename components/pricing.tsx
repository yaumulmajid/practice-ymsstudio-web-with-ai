"use client"

import { ArrowRight, ArrowUpRight, Check, Clock } from "lucide-react"
import { Reveal, SectionHead } from "@/components/motion"
import { tierMessage } from "@/lib/i18n"
import { useT, useWa } from "@/components/lang"

export default function Pricing() {
  const t = useT()
  const wa = useWa()
  const p = t.pricing
  const index = t.reviews.items.length ? "04" : "03"

  return (
    <section id="pricing" tabIndex={-1} className="relative py-24 outline-none md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          center
          index={index}
          label={p.label}
          title={
            <>
              {p.titleA} <em className="font-serif font-normal italic text-brand">{p.titleEm}</em>
            </>
          }
          text={p.text}
        />

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {p.included.map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-ink/[0.08] bg-white px-3 py-1.5 text-xs text-ink/65">
              <Check size={12} className="text-brand" strokeWidth={3} />
              {item}
            </span>
          ))}
        </Reveal>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
          {p.tiers.map((tier, i) => {
            const dark = tier.featured
            return (
              <Reveal key={tier.name} delay={i * 120} className="h-full">
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[28px] p-8 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 ${
                    dark
                      ? "bg-ink text-white shadow-[0_40px_80px_-30px_rgba(11,18,32,0.6)]"
                      : "border border-ink/[0.07] bg-white text-ink hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.18)]"
                  }`}
                >
                  {dark && <div className="animate-drift pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />}

                  <div className="relative flex items-center justify-between">
                    <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
                    {dark && <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80">{p.popular}</span>}
                  </div>
                  <p className={`relative mt-2 min-h-[2.5rem] text-sm ${dark ? "text-white/60" : "text-ink/55"}`}>{tier.tagline}</p>

                  <div className="relative mt-8">
                    <span className={`text-xs ${dark ? "text-white/45" : "text-ink/40"}`}>{p.from}</span>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className={`text-base ${dark ? "text-white/50" : "text-ink/40"}`}>{p.currency}</span>
                      <span className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{tier.price}</span>
                    </div>
                  </div>
                  <p className={`relative mt-3 inline-flex items-center gap-1.5 text-xs ${dark ? "text-white/55" : "text-ink/50"}`}>
                    <Clock size={12} /> {tier.timeline}
                  </p>

                  <a
                    href={wa(tierMessage(t.wa.tier, tier.name, tier.price))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn relative mt-8 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all duration-500 ${
                      dark ? "bg-white text-ink hover:bg-brand-soft" : "bg-ink text-white hover:bg-brand-deep"
                    }`}
                  >
                    {p.choose} {tier.name}
                    <ArrowRight size={15} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
                  </a>

                  <div className={`relative my-8 h-px ${dark ? "bg-white/10" : "bg-ink/[0.07]"}`} />

                  <ul className="relative space-y-3.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${dark ? "bg-brand text-white" : "bg-brand-soft text-brand"}`}>
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span className={`text-sm leading-snug ${dark ? "text-white/75" : "text-ink/65"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <p className={`relative mt-auto pt-8 text-xs ${dark ? "text-white/40" : "text-ink/40"}`}>{tier.renewal}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-4">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] border border-dashed border-ink/15 p-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-ink">{p.customTitle}</h3>
              <p className="mt-1 text-sm text-ink/55">{p.customText}</p>
            </div>
            <a
              href={wa(t.wa.custom)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-white"
            >
              {p.customCta}
              <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
