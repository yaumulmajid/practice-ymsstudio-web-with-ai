"use client"

import { useRef, type CSSProperties, type MouseEvent } from "react"
import Image from "next/image"
import { ArrowRight, Star, Zap } from "lucide-react"
import { waLink } from "@/components/motion"

const HERO_WA = waLink(
  "Halo Yaumul, saya pelaku UMKM mau konsultasi pembuatan website untuk usaha saya. Bisa bantu?",
)

const highlights = [
  { title: "Selesai 3 Hari", text: "Kerja cepat dan efisien" },
  { title: "Garansi 100%", text: "Uang kembali" },
  { title: "20+ UMKM Puas", text: "Rating 4.9 dari 5" },
  { title: "Support 24/7", text: "Via WhatsApp" },
]

const marqueeItems = [
  "Fashion & F&B",
  "Toko Online",
  "Company Profile",
  "Jasa & Konsultan",
  "Produk Lokal",
  "Landing Page",
  "WordPress",
  "WooCommerce",
  "SEO Ready",
]

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`)
    el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`)
    el.style.setProperty("--tx", `${(x * 14).toFixed(1)}px`)
    el.style.setProperty("--ty", `${(y * 14).toFixed(1)}px`)
  }
  const onLeave = () => {
    const el = stageRef.current
    if (!el) return
    ;["--rx", "--ry", "--tx", "--ty"].forEach((p) => el.style.setProperty(p, "0"))
  }

  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40" aria-labelledby="hero-heading">
      <a
        href="#pricing"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Langsung ke Paket & Harga
      </a>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="animate-drift absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(42,142,158,0.16),transparent)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Promo badge */}
          <div
            className="fade-up inline-flex items-center gap-2.5 rounded-full border border-ink/[0.07] bg-white/70 py-1.5 pl-2 pr-4 text-xs font-medium text-ink/70 shadow-sm backdrop-blur"
            style={d(0)}
            role="status"
          >
            <span className="relative grid h-5 w-5 place-items-center rounded-full bg-brand/10">
              <span className="animate-ping-soft absolute h-2 w-2 rounded-full bg-brand" />
              <span className="relative h-2 w-2 rounded-full bg-brand" />
            </span>
            <span className="hidden sm:inline">Promo: Diskon 30% + Gratis Domain & Hosting</span>
            <span className="sm:hidden">Diskon 30% + Gratis Domain</span>
          </div>

          <h1
            id="hero-heading"
            className="mt-7 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[4.75rem]"
          >
            <span className="line-mask">
              <span style={d(120)}>Jasa Website UMKM</span>
            </span>
            <span className="line-mask">
              <span style={d(240)}>
                Profesional,{" "}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-brand">harga terjangkau.</em>
              </span>
            </span>
          </h1>

          <p
            className="fade-up mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg"
            style={d(450)}
          >
            Website cepat dan mobile-friendly untuk UMKM. Dari landing page hingga toko online dengan WordPress atau
            Custom Development. Selesai 3 hari, bergaransi.
          </p>

          <nav
            aria-label="Aksi utama"
            className="fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={d(580)}
          >
            <a
              href={HERO_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(14,17,19,0.5)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-deep sm:w-auto"
              aria-label="Konsultasi gratis via WhatsApp"
            >
              Konsultasi Gratis
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-x-0.5">
                <ArrowRight size={15} />
              </span>
            </a>
            <button
              type="button"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/10 bg-white/60 px-6 py-4 text-sm font-medium text-ink backdrop-blur transition-all duration-500 hover:border-ink/25 hover:bg-white sm:w-auto"
              aria-label="Lihat paket dan harga"
            >
              Lihat Paket & Harga
              <span className="text-ink/40">· mulai 799rb</span>
            </button>
          </nav>
        </div>

        {/* Visual stage */}
        <div
          ref={stageRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="fade-up relative mx-auto mt-16 max-w-5xl [perspective:1400px] lg:mt-20"
          style={d(750)}
        >
          <figure
            className="relative overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white p-1.5 shadow-[0_40px_100px_-40px_rgba(14,17,19,0.35)] transition-transform duration-700 ease-out [transform:rotateX(var(--rx,0))_rotateY(var(--ry,0))]"
          >
            <div className="flex items-center gap-1.5 px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <span className="mx-auto hidden rounded-full bg-ink/[0.04] px-16 py-1 text-[10px] text-ink/40 sm:block">
                ymsstudio.id
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-soft">
              <Image
                src="/project-hero.webp"
                alt="Tampilan contoh website UMKM profesional dengan desain modern"
                fill
                className="object-cover object-top"
                priority
                fetchPriority="high"
                quality={85}
                sizes="(max-width: 1024px) 95vw, 1000px"
              />
            </div>
          </figure>

          {/* Floating chips */}
          <div
            className="absolute -left-3 top-1/4 hidden transition-transform duration-700 ease-out [transform:translate(calc(var(--tx,0px)*-1),calc(var(--ty,0px)*-1))] sm:block lg:-left-10"
            aria-hidden="true"
          >
            <div className="animate-float-slow flex items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white/90 px-4 py-3 shadow-xl shadow-ink/[0.06] backdrop-blur">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
                <Zap size={16} />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-ink">3 Hari</p>
                <p className="text-[11px] text-ink/50">Rata-rata pengerjaan</p>
              </div>
            </div>
          </div>
          <div
            className="absolute -right-3 bottom-1/4 hidden transition-transform duration-700 ease-out [transform:translate(var(--tx,0px),var(--ty,0px))] sm:block lg:-right-10"
            aria-hidden="true"
          >
            <div className="animate-float-slower flex items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white/90 px-4 py-3 shadow-xl shadow-ink/[0.06] backdrop-blur">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-ink">4.9 / 5</p>
                <p className="text-[11px] text-ink/50">20+ website live</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/[0.06] bg-ink/[0.06] lg:grid-cols-4">
          {highlights.map((h, i) => (
            <div key={h.title} className="fade-up bg-canvas px-5 py-6 sm:px-6" style={d(900 + i * 80)}>
              <dt className="text-sm font-semibold text-ink sm:text-base">{h.title}</dt>
              <dd className="mt-1 text-xs text-ink/50 sm:text-sm">{h.text}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Marquee */}
      <div className="marquee-mask mt-16 overflow-hidden border-y border-ink/[0.06] py-5 lg:mt-20" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-12">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap text-sm font-medium text-ink/40">
              {item}
              <span className="font-serif text-lg text-brand/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
