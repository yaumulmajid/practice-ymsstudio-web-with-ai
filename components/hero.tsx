"use client"

import { useEffect, useState, type CSSProperties } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, Star } from "lucide-react"
import { projects, waLink, type Project } from "@/lib/site-data"

const words = ["dipercaya.", "ditemukan.", "dipilih.", "laris."]

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties
const domain = (url: string) => url.replace(/^https?:\/\//, "")

function WordRotator() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600)
    return () => clearInterval(t)
  }, [])
  const prev = (index - 1 + words.length) % words.length
  return (
    <span className="word-rotator text-brand" aria-label={words.join(" ")}>
      {words.map((w, i) => (
        <span
          key={w}
          aria-hidden="true"
          className={`font-serif font-normal italic tracking-[-0.02em] ${
            i === index ? "is-active" : i === prev ? "is-leaving" : ""
          }`}
        >
          {w}
        </span>
      ))}
    </span>
  )
}

function ProjectCard({ p, className = "", eager = false }: { p: Project; className?: string; eager?: boolean }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 transition-colors duration-500 hover:border-white/30 ${className}`}
      aria-label={`Kunjungi ${domain(p.url)}`}
    >
      <div className="relative aspect-[10/7] overflow-hidden rounded-xl">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 1024px) 70vw, 300px"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
          priority={eager}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-between text-xs font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Kunjungi website
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink">
            <ArrowUpRight size={14} />
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between px-2 pb-1 pt-2.5">
        <span className="truncate text-[12px] font-medium text-white/80">{domain(p.url)}</span>
        <span className="text-[10px] uppercase tracking-wider text-white/35">{p.category}</span>
      </div>
    </a>
  )
}

export default function Hero() {
  const colA = projects
  const colB = [...projects].reverse()

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-ink pb-16 pt-28 text-white sm:pt-32 lg:min-h-[min(100svh,960px)] lg:pb-0 lg:pt-0"
      aria-labelledby="hero-heading"
    >
      <a
        href="#pricing"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Langsung ke Paket & Harga
      </a>

      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-drift absolute -left-40 top-1/3 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(42,142,158,0.35),transparent)] blur-2xl" />
        <div className="noise absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:min-h-[min(100svh,960px)] lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Copy */}
        <div className="lg:py-32">
          <div
            className="fade-up inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 text-xs font-medium text-white/70 backdrop-blur"
            style={d(0)}
          >
            <span className="relative grid h-5 w-5 place-items-center rounded-full bg-emerald-400/15">
              <span className="animate-ping-soft absolute h-2 w-2 rounded-full bg-emerald-400" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Menerima proyek baru
          </div>

          <h1
            id="hero-heading"
            className="mt-7 text-[2.75rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl lg:text-[4.1rem]"
          >
            <span className="line-mask">
              <span style={d(100)}>Jasa website UMKM</span>
            </span>
            <span className="line-mask">
              <span style={d(200)}>yang bikin bisnis</span>
            </span>
            <span className="line-mask">
              <span style={d(300)}>
                Anda <WordRotator />
              </span>
            </span>
          </h1>

          <p className="fade-up mt-7 max-w-md text-base leading-relaxed text-white/55 sm:text-lg" style={d(480)}>
            Studio desain & pengembangan web untuk UMKM dan brand yang ingin tampil profesional, cepat, dan mudah
            ditemukan di Google.
          </p>

          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={d(600)}>
            <a
              href={waLink("Halo YMS Studio, saya ingin konsultasi pembuatan website untuk bisnis saya.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white py-3 pl-6 pr-3 text-sm font-medium text-ink transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-soft"
            >
              Konsultasi Gratis
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:translate-x-0.5">
                <ArrowRight size={15} />
              </span>
            </a>
            <button
              type="button"
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white/85 transition-colors duration-500 hover:border-white/40 hover:text-white"
            >
              Lihat Karya Kami
            </button>
          </div>

          <dl className="fade-up mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8" style={d(720)}>
            <div>
              <dt className="sr-only">Rating</dt>
              <dd className="flex items-center gap-2">
                <span className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </span>
                <span className="text-sm font-semibold">4.9/5</span>
              </dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dd className="text-sm font-semibold">20+</dd>
              <dt className="text-sm text-white/45">website live</dt>
            </div>
            <div className="flex items-baseline gap-2">
              <dd className="text-sm font-semibold">Mulai Rp 2jt</dd>
              <dt className="text-sm text-white/45">domain & hosting termasuk</dt>
            </div>
          </dl>
        </div>

        {/* Project wall — desktop */}
        <div
          className="wall wall-mask relative hidden h-[min(100svh,960px)] min-h-[640px] [perspective:1600px] lg:block"
          aria-label="Contoh website buatan kami"
        >
          <div className="absolute inset-0 grid grid-cols-2 gap-4 [transform:rotateX(14deg)_rotateZ(-8deg)_scale(1.12)] [transform-style:preserve-3d]">
            <div className="animate-scroll-up flex flex-col gap-4">
              {[...colA, ...colA].map((p, i) => (
                <ProjectCard key={`a${i}`} p={p} eager={i < 2} />
              ))}
            </div>
            <div className="animate-scroll-down -mt-24 flex flex-col gap-4">
              {[...colB, ...colB].map((p, i) => (
                <ProjectCard key={`b${i}`} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project rows — mobile & tablet */}
      <div className="marquee-row marquee-mask relative mt-4 space-y-3 overflow-hidden lg:hidden">
        <div className="animate-marquee flex w-max gap-3">
          {[...colA, ...colA].map((p, i) => (
            <ProjectCard key={`m${i}`} p={p} className="w-64" eager={i < 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
