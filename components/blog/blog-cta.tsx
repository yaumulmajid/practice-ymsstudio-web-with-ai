"use client"

import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion"
import { useT, useWa } from "@/components/lang"

/** Closing call-to-action under each article. */
export default function BlogCta({ title, text, button }: { title: string; text: string; button: string }) {
  const t = useT()
  const wa = useWa()
  return (
    <Reveal className="relative mt-16 overflow-hidden rounded-[28px] bg-ink p-8 text-white sm:p-10">
      <div className="animate-drift pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />
      <p className="relative text-xl font-semibold leading-tight tracking-[-0.03em] sm:text-2xl lg:text-3xl">{title}</p>
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">{text}</p>
      <a
        href={wa(t.wa.general)}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-8 inline-flex items-center gap-3 rounded-full bg-white py-2.5 pl-6 pr-2.5 text-sm font-medium text-ink transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-soft"
      >
        {button}
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight size={15} />
        </span>
      </a>
    </Reveal>
  )
}
