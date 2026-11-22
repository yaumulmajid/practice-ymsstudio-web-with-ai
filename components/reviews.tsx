"use client"

import { ArrowUpRight, Quote, Star } from "lucide-react"
import { Reveal, SectionHead } from "@/components/motion"
import { useT } from "@/components/lang"
import { domain } from "@/lib/i18n"

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")

/** Client reviews. Renders nothing until real reviews are added in lib/i18n.ts. */
export default function Reviews() {
  const t = useT()
  const r = t.reviews
  if (!r.items.length) return null

  const [first, ...rest] = r.items

  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="03"
          label={r.label}
          title={
            <>
              {r.titleA} <em className="font-serif font-normal italic text-brand">{r.titleEm}</em>
            </>
          }
          text={r.text}
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured review */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <figure className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-ink p-8 text-white sm:p-10">
              <div className="animate-drift pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/35 blur-3xl" aria-hidden="true" />
              <Quote size={36} className="relative text-brand" aria-hidden="true" />
              <blockquote className="relative mt-6 text-xl font-medium leading-snug tracking-[-0.02em] sm:text-2xl lg:text-3xl">“{first.quote}”</blockquote>
              <figcaption className="relative mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-sm font-semibold">{initials(first.name)}</span>
                  <div>
                    <p className="font-semibold">{first.name}</p>
                    <p className="text-sm text-white/55">{first.role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Stars n={first.rating} />
                  {first.project && (
                    <a
                      href={first.project}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-white/55 transition-colors hover:text-white"
                      aria-label={`${r.visit} ${domain(first.project)}`}
                    >
                      {domain(first.project)} <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {rest.map((item, i) => (
            <Reveal key={item.name + i} delay={(i % 2) * 100}>
              <figure className="flex h-full flex-col rounded-[28px] border border-ink/[0.07] bg-white p-7 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.18)]">
                <Stars n={item.rating} />
                <blockquote className="mt-5 text-base leading-relaxed text-ink/75">“{item.quote}”</blockquote>
                <figcaption className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-xs font-semibold text-brand">{initials(item.name)}</span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.name}</p>
                      <p className="text-xs text-ink/50">{item.role}</p>
                    </div>
                  </div>
                  {item.project && (
                    <a
                      href={item.project}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-ink/45 transition-colors hover:text-brand"
                      aria-label={`${r.visit} ${domain(item.project)}`}
                    >
                      {domain(item.project)} <ArrowUpRight size={12} />
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n}/5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={14} className={i < n ? "fill-amber-400 text-amber-400" : "text-ink/15"} />
      ))}
    </div>
  )
}
