"use client"

import { useEffect, useState, type CSSProperties } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, Lock, ShieldCheck, Star } from "lucide-react"
import { domain } from "@/lib/i18n"
import { useProjects, useT, useWa } from "@/components/lang"


const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties

function WordRotator() {
  const words = useT().hero.words
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600)
    return () => clearInterval(t)
  }, [words.length])
  const prev = (index - 1 + words.length) % words.length
  return (
    <span className="word-rotator text-brand" aria-label={words.join(" ")}>
      {words.map((w, i) => (
        <span
          key={w}
          aria-hidden="true"
          className={`font-serif font-normal italic tracking-[-0.02em] ${i === index ? "is-active" : i === prev ? "is-leaving" : ""}`}
        >
          {w}
        </span>
      ))}
    </span>
  )
}

function Showcase() {
  const t = useT()
  // Projects ticked "Tampilkan di Hero" in the CMS (falls back to all projects).
  const all = useProjects()
  const picked = all.filter((p) => p.showInHero)
  const projects = picked.length ? picked : all
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = projects[active]
  const next = () => setActive((i) => (i + 1) % projects.length)

  return (
    <div
      className="fade-up relative mx-auto mt-16 max-w-5xl lg:mt-20"
      style={d(700)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Window */}
      <div className="relative rounded-[26px] bg-white p-2 shadow-[0_50px_120px_-40px_rgba(11,18,32,0.35)] ring-1 ring-ink/[0.06]">
        <div className="flex items-center gap-3 px-3 pb-2.5 pt-1.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-ink/[0.04] px-4 py-1.5 text-xs text-ink/60 sm:min-w-[280px] sm:justify-center">
            <Lock size={11} className="shrink-0 text-ink/40" />
            <span key={current.url} className="fade-up truncate" style={d(0)}>
              {domain(current.url)}
            </span>
          </div>
          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-ink/70 transition-colors hover:bg-ink/[0.04] hover:text-ink sm:inline-flex"
          >
            {t.hero.open} <ArrowUpRight size={13} />
          </a>
        </div>

        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-[16/10] overflow-hidden rounded-[20px] bg-[#e8ebef] sm:aspect-[16/9]"
          aria-label={`${t.hero.visit} ${domain(current.url)}`}
        >
          {projects.map((p, i) => (
            <Image
              key={p.url}
              src={p.image}
              alt={p.title}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 95vw, 1000px"
              quality={75}
              className={`object-cover object-top transition-all duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
          {/* Caption */}
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
            <div key={current.url} className="fade-up rounded-2xl bg-white/85 px-4 py-3 shadow-lg ring-1 ring-ink/[0.05] backdrop-blur-md" style={d(150)}>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-brand">{current.category}</p>
              <p className="mt-0.5 text-sm font-semibold text-ink sm:text-base">{current.title}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white shadow-lg transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </a>
      </div>

      {/* Tabs */}
      <div className="scrollbar-hide -mx-5 mt-5 overflow-x-auto px-5">
        <div className="grid grid-flow-col auto-cols-[minmax(7.5rem,1fr)] gap-2">
          {projects.map((p, i) => {
            const on = i === active
            return (
              <button
                key={p.url}
                type="button"
                onClick={() => setActive(i)}
                className={`relative overflow-hidden rounded-xl px-3.5 py-3 text-left transition-colors duration-500 ${
                  on ? "bg-white shadow-sm ring-1 ring-ink/[0.07]" : "hover:bg-white/60"
                }`}
                aria-pressed={on}
              >
                <span className={`block truncate text-xs font-semibold ${on ? "text-ink" : "text-ink/45"}`}>{p.client}</span>
                <span className="block truncate text-[11px] text-ink/40">{p.category}</span>
                <span className="absolute inset-x-3 bottom-1.5 h-[2px] overflow-hidden rounded-full bg-ink/[0.06]">
                  {on && (
                    <span
                      key={active}
                      className="hero-progress block h-full origin-left bg-brand"
                      style={{ animationPlayState: paused ? "paused" : "running" }}
                      onAnimationEnd={next}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Floating chips */}
      <div className="animate-float-slow absolute -left-10 top-[28%] hidden rounded-2xl bg-white px-4 py-3 shadow-xl shadow-ink/[0.08] ring-1 ring-ink/[0.05] xl:block" aria-hidden="true">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck size={17} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{t.hero.guaranteeTitle}</p>
            <p className="text-[11px] text-ink/50">{t.hero.guaranteeText}</p>
          </div>
        </div>
      </div>
      <div className="animate-float-slower absolute -right-10 top-[48%] hidden rounded-2xl bg-white px-4 py-3 shadow-xl shadow-ink/[0.08] ring-1 ring-ink/[0.05] xl:block" aria-hidden="true">
        <div className="flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="mt-1 text-sm font-semibold text-ink">{t.hero.ratingTitle}</p>
        <p className="text-[11px] text-ink/50">{t.hero.ratingText}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  const t = useT()
  const wa = useWa()
  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40" aria-labelledby="hero-heading">
      <a
        href="#pricing"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {t.hero.skip}
      </a>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="animate-drift absolute -top-48 left-[10%] h-[520px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(42,142,158,0.16),transparent)]" />
        <div className="animate-drift absolute -top-24 right-[5%] h-[460px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.10),transparent)] [animation-delay:-9s]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="fade-up inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-2 pr-4 text-xs font-medium text-ink/70 shadow-sm ring-1 ring-ink/[0.06]"
            style={d(0)}
          >
            <span className="relative grid h-5 w-5 place-items-center rounded-full bg-emerald-50">
              <span className="animate-ping-soft absolute h-2 w-2 rounded-full bg-emerald-500" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.hero.badge}
          </div>

          <h1 id="hero-heading" className="mt-7 text-ink">
            <span className="fade-up block text-sm font-semibold uppercase tracking-[0.2em] text-brand" style={d(60)}>
              {t.hero.kicker}
            </span>
            <span className="mt-5 block text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[5rem]">
              <span className="line-mask">
                <span style={d(140)}>{t.hero.line1}</span>
              </span>
              <span className="line-mask">
                <span style={d(240)}>
                  {t.hero.line2} <WordRotator />
                </span>
              </span>
            </span>
          </h1>

          <p className="fade-up mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg" style={d(420)}>
            {t.hero.sub}
          </p>

          <div className="fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={d(540)}>
            <a
              href={wa(t.wa.hero)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 text-sm font-medium text-white shadow-[0_12px_30px_-10px_rgba(11,18,32,0.55)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-deep sm:w-auto"
            >
              {t.hero.ctaPrimary}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-x-0.5">
                <ArrowRight size={15} />
              </span>
            </a>
            <button
              type="button"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-medium text-ink ring-1 ring-ink/10 transition-all duration-500 hover:ring-ink/25 sm:w-auto"
            >
              {t.hero.ctaSecondary} <span className="text-ink/40">{t.hero.ctaSecondaryNote}</span>
            </button>
          </div>
        </div>

        <Showcase />
      </div>

      {/* Marquee */}
      <div className="marquee-mask mt-20 overflow-hidden border-y border-ink/[0.06] py-5" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-12">
          {[...t.hero.marquee, ...t.hero.marquee].map((item, i) => (
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
