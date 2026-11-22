"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionHead } from "@/components/motion"
import { useLang, useProjects, useT } from "@/components/lang"
import { domain, localePath, PATHS } from "@/lib/i18n"
import { pui } from "@/lib/pages-ui"

const themes = [
  { card: "bg-white border border-ink/[0.07]", text: "text-ink", sub: "text-ink/55", chip: "border-ink/10 text-ink/70", btn: "bg-ink text-white hover:bg-brand-deep" },
  { card: "bg-brand-soft", text: "text-ink", sub: "text-ink/60", chip: "border-ink/10 text-ink/70", btn: "bg-ink text-white hover:bg-brand-deep" },
  { card: "bg-ink", text: "text-white", sub: "text-white/55", chip: "border-white/15 text-white/70", btn: "bg-white text-ink hover:bg-brand-soft" },
]

export default function Projects() {
  const t = useT()
  const projects = useProjects()
  const lang = useLang()
  const caseLabel = pui[lang].service.viewCase

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="01"
          label={t.work.label}
          title={
            <>
              {t.work.titleA} <em className="font-serif font-normal italic text-brand">{t.work.titleEm}</em> {t.work.titleB}
            </>
          }
          text={t.work.text}
        />

        <ol className="mt-16 space-y-6">
          {projects.map((p, i) => {
            const th = themes[i % themes.length]
            return (
              <li key={p.url} className="sticky" style={{ top: `${88 + i * 18}px` }}>
                <article
                  className={`group grid overflow-hidden rounded-[32px] shadow-[0_-20px_60px_-30px_rgba(11,18,32,0.25)] md:min-h-[480px] md:grid-cols-[0.9fr_1.1fr] ${th.card}`}
                >
                  <div className="flex flex-col p-7 sm:p-10">
                    <div className={`flex items-center justify-between text-xs ${th.sub}`}>
                      <span className="font-medium uppercase tracking-[0.18em]">{p.category}</span>
                      <span>
                        {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className={`mt-8 text-2xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-3xl lg:text-4xl ${th.text}`}>{p.title}</h3>
                    <p className={`mt-4 max-w-sm text-sm leading-relaxed sm:text-base ${th.sub}`}>{p.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className={`rounded-full border px-3 py-1 text-xs ${th.chip}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center gap-4 pt-10">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/btn inline-flex items-center gap-2 rounded-full py-3 pl-5 pr-3 text-sm font-medium transition-colors duration-500 ${th.btn}`}
                      >
                        {t.work.visit}
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-current/10">
                          <ArrowUpRight size={15} className="transition-transform duration-500 group-hover/btn:rotate-45" />
                        </span>
                      </a>
                      <Link
                        href={localePath(lang, PATHS.project(p.slug))}
                        className={`text-sm font-medium underline decoration-current/25 underline-offset-4 transition-colors hover:decoration-current ${th.text}`}
                      >
                        {caseLabel}
                      </Link>
                      <span className={`hidden text-sm lg:inline ${th.sub}`}>{domain(p.url)}</span>
                    </div>
                  </div>

                  <a href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className="relative block min-h-[260px] overflow-hidden">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]"
                    />
                  </a>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
