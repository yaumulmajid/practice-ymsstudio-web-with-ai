"use client"

import { BarChart3, Code2, Gauge, LifeBuoy, Megaphone, Search } from "lucide-react"
import { Reveal, SectionHead, trackSpotlight } from "@/components/motion"
import { useT } from "@/components/lang"

// Order matches t.services.items
const icons = [Code2, Search, Megaphone, Gauge, BarChart3, LifeBuoy]

function BrowserArt() {
  return (
    <div className="pointer-events-none relative mt-8 h-44 overflow-hidden rounded-t-2xl border border-b-0 border-ink/[0.08] bg-white sm:h-52" aria-hidden="true">
      <div className="flex items-center gap-1.5 border-b border-ink/[0.06] px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-3 h-4 w-40 rounded-full bg-ink/[0.05]" />
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] gap-4 p-5">
        <div className="space-y-2.5">
          <div className="h-3 w-4/5 rounded-full bg-ink/80 transition-all duration-700 group-hover:w-full" />
          <div className="h-3 w-3/5 rounded-full bg-ink/80" />
          <div className="mt-4 h-2 w-full rounded-full bg-ink/10" />
          <div className="h-2 w-5/6 rounded-full bg-ink/10" />
          <div className="mt-4 h-7 w-28 rounded-full bg-brand transition-all duration-700 group-hover:w-32" />
        </div>
        <div className="rounded-xl bg-gradient-to-br from-brand/30 to-brand-soft transition-transform duration-700 group-hover:scale-105" />
      </div>
    </div>
  )
}

export default function Services() {
  const t = useT()
  const s = t.services

  return (
    <section id="services" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="02"
          label={s.label}
          title={
            <>
              {s.titleA} <em className="font-serif font-normal italic text-brand">{s.titleEm}</em>
            </>
          }
          text={s.text}
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {s.items.map((item, i) => {
            const Icon = icons[i % icons.length]
            const big = i === 0
            return (
              <Reveal key={item.title} delay={(i % 3) * 100} className={big ? "md:col-span-2 md:row-span-2" : ""}>
                <article
                  onMouseMove={trackSpotlight}
                  className={`spotlight group flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/[0.07] bg-canvas p-7 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.2)] ${
                    big ? "pb-0 sm:p-10 sm:pb-0" : ""
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand shadow-sm transition-all duration-700 group-hover:bg-brand group-hover:text-white">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <h3 className={`mt-8 font-semibold tracking-tight text-ink ${big ? "text-2xl sm:text-3xl" : "text-lg"}`}>{item.title}</h3>
                  <p className={`mt-3 leading-relaxed text-ink/55 ${big ? "max-w-md text-base" : "text-sm"}`}>{item.text}</p>
                  {big && <BrowserArt />}
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Process */}
        <div className="mt-24 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">{s.processLabel}</p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink">
              {s.processTitleA} <em className="font-serif font-normal italic text-brand">{s.processTitleEm}</em>
            </h3>
          </Reveal>
          <ol className="divide-y divide-ink/[0.07] border-y border-ink/[0.07]">
            {s.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90} className="group grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr_1.4fr]">
                <span className="font-serif text-2xl italic text-ink/25 transition-colors duration-500 group-hover:text-brand">0{i + 1}</span>
                <span className="text-lg font-semibold tracking-tight text-ink">{step.title}</span>
                <span className="col-start-2 text-sm leading-relaxed text-ink/55 sm:col-start-3">{step.text}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
