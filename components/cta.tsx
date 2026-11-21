"use client"

import { ArrowUpRight } from "lucide-react"
import { Reveal, waLink } from "@/components/motion"

export default function CTA() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <Reveal className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-ink px-6 py-24 text-center sm:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="animate-drift absolute left-1/2 top-full h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(42,142,158,0.55),transparent)] blur-2xl" />
          <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">
            Siap meningkatkan
            <br />
            <em className="font-serif font-normal italic text-brand-soft/90">kehadiran digital</em> Anda?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Mari ciptakan sesuatu yang luar biasa bersama. Hubungi kami untuk mendiskusikan proyek Anda dan bagaimana
            kami dapat membantu.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink("Halo, saya ingin konsultasi tentang website")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-6 pr-3 text-sm font-medium text-ink transition-all duration-500 hover:-translate-y-0.5"
            >
              Hubungi via WhatsApp
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </a>
            <button
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white/80 transition-colors duration-500 hover:border-white/40 hover:text-white"
            >
              Lihat Paket
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
