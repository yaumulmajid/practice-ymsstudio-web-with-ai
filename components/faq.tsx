"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Reveal, SectionHead } from "@/components/motion"
import { useT } from "@/components/lang"

export default function FAQ() {
  const t = useT()
  const f = t.faq
  const index = t.reviews.items.length ? "05" : "04"
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHead
            index={index}
            label={f.label}
            title={
              <>
                {f.titleA} <em className="font-serif font-normal italic text-brand">{f.titleEm}</em>
              </>
            }
          />
        </div>

        <div className="border-t border-ink/[0.08]">
          {f.items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 60} className={`faq-item border-b border-ink/[0.08] ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-medium tracking-tight text-ink sm:text-lg"
                  >
                    {item.q}
                    <span
                      className={`faq-icon grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        isOpen ? "border-ink bg-ink text-white" : "border-ink/10 text-ink"
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} className="faq-body" role="region">
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-sm leading-relaxed text-ink/60 sm:text-base">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
