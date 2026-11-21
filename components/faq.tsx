"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Reveal, SectionHead } from "@/components/motion"
import { faqs } from "@/lib/site-data"

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHead
            center={false}
            index="04"
            label="FAQ"
            title={
              <>
                Pertanyaan yang <em className="font-serif font-normal italic text-brand">sering ditanya</em>
              </>
            }
          />
        </div>

        <div className="border-t border-ink/[0.08]">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 60} className={`faq-item border-b border-ink/[0.08] ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-medium tracking-tight text-ink sm:text-lg"
                  >
                    {f.q}
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
                    <p className="max-w-xl pb-6 text-sm leading-relaxed text-ink/60 sm:text-base">{f.a}</p>
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
