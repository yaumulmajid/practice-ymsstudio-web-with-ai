"use client"

import { ArrowUpRight, Code2, Megaphone, MessagesSquare } from "lucide-react"
import { Eyebrow, Reveal, trackSpotlight } from "@/components/motion"

const services = [
  {
    icon: Code2,
    title: "Pengembangan Web",
    description:
      "Kami membuat website modern, responsif, dan cepat dengan teknologi terkini seperti WordPress dan Custom Development. Cocok untuk company profile, landing page, hingga toko online yang profesional dan user-friendly.",
  },
  {
    icon: MessagesSquare,
    title: "Konsultasi Digital",
    description:
      "Konsultasi mendalam untuk merencanakan strategi digital bisnis Anda. Kami bantu tentukan teknologi yang tepat, fitur yang dibutuhkan, dan solusi terbaik untuk mencapai tujuan bisnis dengan efektif dan efisien.",
  },
  {
    icon: Megaphone,
    title: "Google Ads & Meta Ads",
    description:
      "Layanan pengelolaan iklan profesional di Google dan Meta (Facebook & Instagram). Kami optimalkan kampanye iklan Anda untuk meningkatkan traffic, engagement, dan konversi penjualan dengan ROI yang maksimal.",
  },
]

const steps = [
  { title: "Konsultasi", text: "Diskusi kebutuhan & tujuan bisnis" },
  { title: "Desain", text: "Tampilan sesuai identitas brand" },
  { title: "Development", text: "Dibangun cepat & mobile-friendly" },
  { title: "Live", text: "Online, siap menerima pelanggan" },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <Reveal>
              <Eyebrow index="01">Layanan</Eyebrow>
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink md:text-5xl">
              Apa yang kami <em className="font-serif font-normal italic text-brand">tawarkan</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={160} className="max-w-md text-base leading-relaxed text-ink/55 md:justify-self-end">
            Solusi komprehensif untuk mewujudkan visi digital Anda dan mendorong hasil bisnis nyata.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 110} className="h-full">
                <article
                  onMouseMove={trackSpotlight}
                  className="spotlight group flex h-full flex-col rounded-3xl border border-ink/[0.07] bg-white p-7 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:border-ink/[0.12] hover:shadow-[0_30px_60px_-30px_rgba(14,17,19,0.2)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand transition-all duration-700 group-hover:bg-brand group-hover:text-white">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="font-serif text-sm italic text-ink/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 text-xl font-semibold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/55">{s.description}</p>
                  <div className="mt-auto pt-8">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/40 transition-colors duration-500 group-hover:text-brand">
                      Selengkapnya
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Process */}
        <Reveal className="mt-20">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">
            Proses kerja sederhana
          </p>
        </Reveal>
        <div className="relative mt-8">
          <div
            className="absolute left-0 right-0 top-[15px] hidden h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent lg:block"
            aria-hidden="true"
          />
        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 120} className="relative text-center">
              <span className="relative mx-auto grid h-8 w-8 place-items-center rounded-full border border-ink/10 bg-canvas text-xs font-medium text-ink">
                {i + 1}
              </span>
              <p className="mt-4 text-sm font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-xs text-ink/50">{step.text}</p>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
