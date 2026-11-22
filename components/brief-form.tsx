"use client"

// Project brief form (/kontak). Submits to a server action; on success offers to
// continue on WhatsApp with the brief pre-filled.
import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Calculator, CheckCircle2, Loader2, X } from "lucide-react"
import { ATTRIBUTION_KEY } from "@/components/analytics"
import { useLang, useWa } from "@/components/lang"
import { CONSENT_EVENT } from "@/lib/consent"
import { submitLead, type LeadState } from "@/lib/lead-action"
import { localePath, PATHS } from "@/lib/i18n"
import { services } from "@/lib/page-content/services"
import { pui } from "@/lib/pages-ui"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const input =
  "h-12 w-full rounded-2xl border border-ink/[0.1] bg-white px-4 text-base text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink/30 focus:border-brand/50 focus:shadow-[0_0_0_4px_rgba(42,142,158,0.12)]"
const label = "mb-2 block text-sm font-medium text-ink/75"

export default function BriefForm() {
  const lang = useLang()
  const wa = useWa()
  const b = pui[lang].brief
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { ok: false })
  const [startedAt] = useState(() => Date.now())
  const [preset, setPreset] = useState("")
  const [summary, setSummary] = useState("")
  const [source, setSource] = useState("")
  const [estimate, setEstimate] = useState("")
  const [attribution, setAttribution] = useState("")
  const [clientError, setClientError] = useState<LeadState["error"]>()
  const formRef = useRef<HTMLFormElement>(null)

  // ?service=… (calculator or a service page) pre-selects the service;
  // ?estimate=… carries the calculator answers into the brief.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const s = q.get("service")
    if (s) setPreset(s.slice(0, 80))
    const e = q.get("estimate")
    if (e) setEstimate(e.slice(0, 1500))
    setSource(window.location.pathname)
    const readAttribution = () => {
      try {
        setAttribution(localStorage.getItem(ATTRIBUTION_KEY) || "")
      } catch {
        /* storage blocked */
      }
    }
    readAttribution()
    // Analytics (lib/consent) stores the visit source only after consent, which may come later.
    const onConsent = () => window.setTimeout(readAttribution, 0)
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  useEffect(() => {
    if (state.ok) {
      window.gtag?.("event", "generate_lead", { form: "project_brief", page_path: window.location.pathname })
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [state.ok])

  const serviceOptions = [...services.map((s) => s.copy[lang].name), b.unsure]
  if (preset && !serviceOptions.includes(preset)) serviceOptions.unshift(preset)
  const shownError = clientError ?? state.error
  const errorText = shownError
    ? { required: b.errRequired, phone: b.errPhone, email: b.errEmail, rate: b.errRate, server: b.errServer }[shownError]
    : ""

  if (state.ok) {
    return (
      <div className="blog-in rounded-[28px] border border-ink/[0.07] bg-white p-8 text-center sm:p-12">
        <CheckCircle2 size={44} className="mx-auto text-brand" />
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">{b.okTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink/60">{b.okText}</p>
        <a
          href={wa(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-deep"
        >
          {b.okWa}
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight size={16} />
          </span>
        </a>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={(e) => {
        const f = new FormData(formRef.current!)
        const v = (k: string) => String(f.get(k) ?? "").trim()
        // Validate here first: React resets the form after a server action, so catching
        // mistakes before submitting keeps what the visitor typed.
        const digits = v("whatsapp").replace(/\D/g, "").replace(/^0/, "62")
        const err: LeadState["error"] = !v("name") || !digits
          ? "required"
          : digits.length < 9 || digits.length > 15
            ? "phone"
            : v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))
              ? "email"
              : undefined
        setClientError(err)
        if (err) {
          e.preventDefault()
          return
        }
        setSummary(
          [
            lang === "id" ? `Halo YMS Studio, saya ${v("name")} baru saja mengirim brief di website.` : `Hi YMS Studio, I'm ${v("name")} and I just sent a brief on your website.`,
            v("business") && `${b.business}: ${v("business")}`,
            v("service") && `${b.service}: ${v("service")}`,
            v("budget") && `${b.budget}: ${v("budget")}`,
            v("timeline") && `${b.timeline}: ${v("timeline")}`,
            v("message") && `\n${v("message")}`,
            estimate && `\n${b.estimateLabel}:\n${estimate}`,
          ]
            .filter(Boolean)
            .join("\n"),
        )
      }}
      className="rounded-[28px] border border-ink/[0.07] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(11,18,32,0.25)] sm:p-9"
      noValidate
    >
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="sourcePage" value={source} />
      <input type="hidden" name="attribution" value={attribution} />
      <input type="hidden" name="estimate" value={estimate} />

      {estimate && (
        <div data-testid="brief-estimate" className="mb-6 flex gap-3 rounded-2xl bg-brand-soft p-4 text-sm text-ink/75">
          <Calculator size={18} className="mt-0.5 shrink-0 text-brand-deep" />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-ink">{b.estimateLabel}</p>
            <p className="mt-1 whitespace-pre-line leading-relaxed">{estimate}</p>
          </div>
          <button type="button" onClick={() => setEstimate("")} aria-label={b.estimateRemove} className="self-start rounded-full p-1 text-ink/40 transition-colors hover:text-ink">
            <X size={16} />
          </button>
        </div>
      )}
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bf-name" className={label}>
            {b.name} <span className="text-brand">*</span>
          </label>
          <input id="bf-name" name="name" required autoComplete="name" maxLength={100} className={input} />
        </div>
        <div>
          <label htmlFor="bf-business" className={label}>
            {b.business}
          </label>
          <input id="bf-business" name="business" autoComplete="organization" maxLength={120} className={input} />
        </div>
        <div>
          <label htmlFor="bf-wa" className={label}>
            {b.whatsapp} <span className="text-brand">*</span>
          </label>
          <input id="bf-wa" name="whatsapp" required type="tel" inputMode="tel" autoComplete="tel" placeholder="0812…" maxLength={30} className={input} />
        </div>
        <div>
          <label htmlFor="bf-email" className={label}>
            {b.email}
          </label>
          <input id="bf-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={160} className={input} />
        </div>
        <div>
          <label htmlFor="bf-service" className={label}>
            {b.service}
          </label>
          <select id="bf-service" name="service" key={preset} defaultValue={preset} className={`${input} appearance-none`}>
            <option value="">{b.choose}</option>
            {serviceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bf-budget" className={label}>
            {b.budget}
          </label>
          <select id="bf-budget" name="budget" defaultValue="" className={`${input} appearance-none`}>
            <option value="">{b.choose}</option>
            {b.budgets.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bf-timeline" className={label}>
            {b.timeline}
          </label>
          <select id="bf-timeline" name="timeline" defaultValue="" className={`${input} appearance-none`}>
            <option value="">{b.choose}</option>
            {b.timelines.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bf-message" className={label}>
            {b.message}
          </label>
          <textarea
            id="bf-message"
            name="message"
            rows={5}
            maxLength={3000}
            placeholder={b.messageHint}
            className={`${input} h-auto resize-y py-3 leading-relaxed`}
          />
        </div>
      </div>

      {errorText && (
        <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorText}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink/45">
          {b.privacy}{" "}
          <Link href={localePath(lang, PATHS.privacy)} className="underline decoration-ink/20 underline-offset-2 hover:text-ink">
            {b.privacyLink}
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-deep disabled:opacity-60"
        >
          {pending && <Loader2 size={16} className="animate-spin" />}
          {pending ? b.sending : b.submit}
        </button>
      </div>
    </form>
  )
}
