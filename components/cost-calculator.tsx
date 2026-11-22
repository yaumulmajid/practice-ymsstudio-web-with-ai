"use client"

// Cost calculator: 4 quick questions → recommended package with its CMS starting price.
// Extras are listed (not priced) and confirmed during the consultation, so the page never
// shows a number the studio hasn't set.
import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, RotateCcw } from "lucide-react"
import { useLang, useT, useWa } from "@/components/lang"
import { localePath, PATHS } from "@/lib/i18n"
import { services } from "@/lib/page-content/services"
import { pui } from "@/lib/pages-ui"

type TypeKey = "landing" | "profile" | "store" | "app" | "unsure"
type PagesKey = "one" | "few" | "many" | "lots"
type FeatureKey = "blog" | "cms" | "multilang" | "payment" | "booking" | "member" | "integration" | "copywriting"
type TimeKey = "relaxed" | "normal" | "rush"

const TYPES: TypeKey[] = ["landing", "profile", "store", "app", "unsure"]
const PAGES: PagesKey[] = ["one", "few", "many", "lots"]
const FEATURES: FeatureKey[] = ["blog", "cms", "multilang", "payment", "booking", "member", "integration", "copywriting"]
const TIMES: TimeKey[] = ["relaxed", "normal", "rush"]

/** Package recommendation: 0 landing, 1 company profile, 2 online store, null = custom web app. */
function recommend(type: TypeKey | null, pages: PagesKey | null, features: FeatureKey[]): number | null {
  const has = (f: FeatureKey) => features.includes(f)
  if (type === "app" || has("member") || has("integration") || has("booking")) return null
  if (type === "store" || has("payment")) return 2
  if (type === "profile" || pages === "few" || pages === "many" || pages === "lots" || has("blog") || has("cms") || has("multilang")) return 1
  return 0
}

/** Features the recommended package doesn't cover by default (shown as "priced during consultation"). */
function extrasFor(tier: number | null, features: FeatureKey[]): FeatureKey[] {
  if (tier === null) return []
  const included: Record<number, FeatureKey[]> = { 0: [], 1: ["blog", "cms"], 2: ["cms", "payment"] }
  return features.filter((f) => !included[tier].includes(f))
}

const SERVICE_SLUGS = ["jasa-landing-page", "jasa-company-profile", "jasa-toko-online"]

export default function CostCalculator() {
  const lang = useLang()
  const t = useT()
  const wa = useWa()
  const c = pui[lang].calc
  const [step, setStep] = useState(0)
  const [type, setType] = useState<TypeKey | null>(null)
  const [pages, setPages] = useState<PagesKey | null>(null)
  const [features, setFeatures] = useState<FeatureKey[]>([])
  const [time, setTime] = useState<TimeKey | null>(null)

  const tierIndex = useMemo(() => recommend(type, pages, features), [type, pages, features])
  const tier = tierIndex !== null ? t.pricing.tiers[tierIndex] : undefined
  const extras = extrasFor(tierIndex, features)
  const done = step === 4
  const canNext = (step === 0 && type) || (step === 1 && pages) || step === 2 || (step === 3 && time)

  const packageName = tier?.name ?? (lang === "id" ? "Web App Custom" : "Custom Web App")
  const answers = [
    `• ${c.q1} ${type ? c.types[type] : "-"}`,
    `• ${c.q2} ${pages ? c.pages[pages] : "-"}`,
    `• ${c.q3} ${features.length ? features.map((f) => c.features[f]).join(", ") : "-"}`,
    `• ${c.q4} ${time ? c.timelines[time] : "-"}`,
    `→ ${packageName}${tier ? ` (${c.startsAt.toLowerCase()} ${t.pricing.currency} ${tier.price})` : ""}`,
  ].join("\n")
  const waText = `${c.waIntro}\n${answers}`
  // The brief form's service options are the service-page names, so pass the matching one.
  const serviceName = services.find((s) => s.slug === (tierIndex !== null ? SERVICE_SLUGS[tierIndex] : "jasa-web-app"))?.copy[lang].name ?? packageName
  const briefHref = `${localePath(lang, PATHS.brief)}?${new URLSearchParams({ service: serviceName, estimate: answers })}#brief`

  function choose<T>(setter: (v: T) => void, v: T) {
    setter(v)
    // Single-choice questions move on by themselves, which feels quicker on phones.
    window.setTimeout(() => setStep((s) => s + 1), 180)
  }

  const option = (active: boolean) =>
    `flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all duration-300 sm:text-base ${
      active ? "border-ink bg-ink text-white shadow-[0_20px_40px_-25px_rgba(11,18,32,0.6)]" : "border-ink/[0.08] bg-white text-ink hover:border-ink/25"
    }`
  const questions = [c.q1, c.q2, c.q3, c.q4]

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs font-medium text-ink/45">
        <span>{done ? c.result : `${c.step} ${step + 1} ${c.of} 4`}</span>
        {step > 0 && (
          <button type="button" onClick={() => setStep(done ? 3 : step - 1)} className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
            <ArrowLeft size={14} /> {c.back}
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
        <div className="h-full rounded-full bg-brand transition-[width] duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }} />
      </div>

      <div key={step} className="blog-in mt-8">
        {!done && <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-3xl">{questions[step]}</h2>}
        {step === 2 && <p className="mt-2 text-sm text-ink/50">{c.q3hint}</p>}

        {step === 0 && (
          <div className="mt-6 space-y-3">
            {TYPES.map((k) => (
              <button key={k} type="button" onClick={() => choose(setType, k)} className={option(type === k)} aria-pressed={type === k}>
                {c.types[k]} {type === k && <Check size={18} />}
              </button>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {PAGES.map((k) => (
              <button key={k} type="button" onClick={() => choose(setPages, k)} className={option(pages === k)} aria-pressed={pages === k}>
                {c.pages[k]} {pages === k && <Check size={18} />}
              </button>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((k) => {
              const on = features.includes(k)
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setFeatures((f) => (on ? f.filter((x) => x !== k) : [...f, k]))}
                  className={option(on)}
                  aria-pressed={on}
                >
                  {c.features[k]}
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${on ? "border-white bg-white text-ink" : "border-ink/20"}`}>
                    {on && <Check size={13} strokeWidth={3} />}
                  </span>
                </button>
              )
            })}
          </div>
        )}
        {step === 3 && (
          <div className="mt-6 space-y-3">
            {TIMES.map((k) => (
              <button key={k} type="button" onClick={() => choose(setTime, k)} className={option(time === k)} aria-pressed={time === k}>
                {c.timelines[k]} {time === k && <Check size={18} />}
              </button>
            ))}
          </div>
        )}

        {!done && step === 2 && (
          <button
            type="button"
            onClick={() => setStep(3)}
            disabled={!canNext}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-deep disabled:opacity-40"
          >
            {c.next} <ArrowRight size={16} />
          </button>
        )}

        {/* Result */}
        {done && (
          <div>
            <div className="overflow-hidden rounded-[28px] bg-ink p-7 text-white sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">{c.result}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{packageName}</h2>
              {tier ? (
                <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
                  <div>
                    <p className="text-xs text-white/45">{c.startsAt}</p>
                    <p className="mt-1 text-4xl font-semibold tracking-[-0.04em]">
                      <span className="mr-1 text-lg font-medium text-white/50">{t.pricing.currency}</span>
                      {tier.price}
                    </p>
                  </div>
                  {tier.timeline && (
                    <div>
                      <p className="text-xs text-white/45">{c.timeline}</p>
                      <p className="mt-1 inline-flex items-center gap-2 text-base">
                        <Clock size={15} /> {tier.timeline}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">{c.customNote}</p>
              )}
            </div>

            {tier && tier.features.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-ink">{c.includes}</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {tier.features.slice(0, 6).map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-ink/65">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand-deep" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {extras.length > 0 && (
              <div className="mt-6 rounded-2xl border border-dashed border-ink/[0.15] p-5">
                <p className="text-sm font-medium text-ink">{c.extras}</p>
                <p className="mt-2 text-sm text-ink/60">{extras.map((f) => c.features[f]).join(" · ")}</p>
              </div>
            )}
            {time === "rush" && <p className="mt-4 text-sm text-ink/55">{c.rushNote}</p>}
            <p className="mt-4 text-xs leading-relaxed text-ink/40">{c.disclaimer}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={wa(waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                {c.sendWa}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </a>
              <Link href={briefHref} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/25">
                {c.sendBrief}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setStep(0)
                  setType(null)
                  setPages(null)
                  setFeatures([])
                  setTime(null)
                }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-ink/55 transition-colors hover:text-ink"
              >
                <RotateCcw size={15} /> {c.restart}
              </button>
            </div>
            {tierIndex !== null && (
              <p className="mt-6 text-sm text-ink/50">
                <Link href={localePath(lang, PATHS.service(SERVICE_SLUGS[tierIndex]))} className="underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
                  {packageName} →
                </Link>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
