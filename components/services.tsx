"use client"

import { BarChart3, Code2, Gauge, LifeBuoy, Megaphone, Search } from "lucide-react"
import { Reveal, SectionHead, trackSpotlight } from "@/components/motion"

const services = [
  {
    icon: Code2,
    title: "Desain & Pengembangan Web",
    text: "Landing page, company profile, toko online, hingga web app custom. Didesain khusus untuk brand Anda — bukan template pasaran.",
    big: true,
  },
  {
    icon: Search,
    title: "SEO & Google Business",
    text: "Struktur SEO on-page, Search Console, dan Google Business Profile agar bisnis Anda muncul saat dicari.",
  },
  {
    icon: Megaphone,
    title: "Google Ads & Meta Ads",
    text: "Kampanye iklan yang dioptimasi untuk traffic dan konversi, dengan laporan yang mudah dipahami.",
  },
  {
    icon: Gauge,
    title: "Performa & Keamanan",
    text: "Website cepat, SSL, backup otomatis, dan perlindungan dari spam serta serangan umum.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Tracking",
    text: "GA4, Meta Pixel, dan tracking konversi WhatsApp — tahu persis dari mana pelanggan datang.",
  },
  {
    icon: LifeBuoy,
    title: "Maintenance & Support",
    text: "Update konten, perbaikan bug, dan bantuan teknis via WhatsApp setelah website live.",
  },
]

const steps = [
  { title: "Konsultasi", text: "Kami pelajari bisnis, target pelanggan, dan tujuan website Anda." },
  { title: "Desain", text: "Rancangan tampilan sesuai identitas brand, direvisi sampai pas." },
  { title: "Development", text: "Dibangun cepat, responsif, dan siap SEO di semua perangkat." },
  { title: "Launch & Support", text: "Website online, Anda dilatih mengelola, kami tetap mendampingi." },
]

function BrowserArt() {
  return (
    <div className="pointer-events-none relative mt-8 h-44 overflow-hidden rounded-t-2xl border border-b-0 border-ink/[0.08] bg-canvas sm:h-52" aria-hidden="true">
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
  return (
    <section id="services" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="02"
          label="Layanan"
          title={
            <>
              Semua yang bisnis Anda butuhkan untuk <em className="font-serif font-normal italic text-brand">tumbuh online</em>
            </>
          }
          text="Satu tim untuk desain, pengembangan, SEO, dan iklan — Anda cukup fokus menjalankan bisnis."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={(i % 3) * 100} className={s.big ? "md:col-span-2 md:row-span-2" : ""}>
                <article
                  onMouseMove={trackSpotlight}
                  className={`spotlight group flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/[0.07] bg-canvas p-7 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(14,17,19,0.2)] ${
                    s.big ? "pb-0 sm:p-10 sm:pb-0" : ""
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand shadow-sm transition-all duration-700 group-hover:bg-brand group-hover:text-white">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <h3 className={`mt-8 font-semibold tracking-tight text-ink ${s.big ? "text-2xl sm:text-3xl" : "text-lg"}`}>
                    {s.title}
                  </h3>
                  <p className={`mt-3 leading-relaxed text-ink/55 ${s.big ? "max-w-md text-base" : "text-sm"}`}>{s.text}</p>
                  {s.big && <BrowserArt />}
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Process */}
        <div className="mt-24 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">Cara kami bekerja</p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink">
              Proses jelas, <em className="font-serif font-normal italic text-brand">tanpa ribet.</em>
            </h3>
          </Reveal>
          <ol className="divide-y divide-ink/[0.07] border-y border-ink/[0.07]">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90} className="group grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr_1.4fr]">
                <span className="font-serif text-2xl italic text-ink/25 transition-colors duration-500 group-hover:text-brand">
                  0{i + 1}
                </span>
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
