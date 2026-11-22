"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion"
import { useLang, useT, useWa } from "@/components/lang"
import { localePath, PATHS } from "@/lib/i18n"
import { pui } from "@/lib/pages-ui"

export default function CTA() {
  const t = useT()
  const wa = useWa()
  const c = t.cta
  const lang = useLang()

  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-5">
      <Reveal className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-ink px-6 py-24 text-center sm:py-36">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="animate-drift absolute left-1/2 top-full h-[560px] w-[960px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(42,142,158,0.55),transparent)] blur-2xl" />
          <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">{c.kicker}</p>
          <h2 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
            {c.line1}
            <br />
            {c.line2A} <em className="font-serif font-normal italic text-brand-soft/90">{c.line2Em}</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">{c.text}</p>

          <a
            href={wa(t.wa.cta)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 text-base font-medium text-ink transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-soft"
          >
            {c.button}
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={18} />
            </span>
          </a>
          <p className="mt-5">
            <Link
              href={`${localePath(lang, PATHS.brief)}#brief`}
              className="text-sm font-medium text-white/60 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              {pui[lang].ctaBrief}
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  )
}
