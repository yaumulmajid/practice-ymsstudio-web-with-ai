"use client"

// Cookie banner: shown until the visitor chooses, and again from the footer link.
// The choice goes to Google Consent Mode (lib/consent.ts).
import { useEffect, useState } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"
import { useLang } from "@/components/lang"
import { CONSENT_OPEN_EVENT, readConsent, saveConsent, type Consent } from "@/lib/consent"
import { localePath, PATHS } from "@/lib/i18n"
import { pui } from "@/lib/pages-ui"

function Toggle({ id, checked, disabled, onChange, label, text }: { id: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void; label: string; text: string }) {
  return (
    <label htmlFor={id} className={`flex items-start justify-between gap-4 rounded-2xl border border-ink/[0.07] p-4 ${disabled ? "opacity-70" : "cursor-pointer"}`}>
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-ink/55">{text}</span>
      </span>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="relative mt-0.5 h-6 w-10 shrink-0 rounded-full bg-ink/15 transition-colors duration-300 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-300 peer-checked:bg-brand peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40"
      />
    </label>
  )
}

export default function CookieConsent() {
  const lang = useLang()
  const c = pui[lang].cookie
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(false)
  const [choice, setChoice] = useState<Consent>({ analytics: true, marketing: true })

  useEffect(() => {
    const saved = readConsent()
    if (saved) setChoice(saved)
    else setOpen(true)
    const reopen = () => {
      const current = readConsent()
      if (current) setChoice(current)
      setDetails(true)
      setOpen(true)
    }
    window.addEventListener(CONSENT_OPEN_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen)
  }, [])

  if (!open) return null

  const save = (value: Consent) => {
    saveConsent(value)
    setOpen(false)
    setDetails(false)
  }
  const btn = "inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-full px-5 text-sm font-medium transition-colors duration-300"

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      data-testid="cookie-banner"
      className="blog-in fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-md rounded-[24px] border border-ink/[0.08] bg-white p-5 shadow-[0_30px_80px_-30px_rgba(11,18,32,0.45)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-deep">
          <Cookie size={17} />
        </span>
        <div>
          <h2 id="cookie-title" className="text-base font-semibold tracking-[-0.02em] text-ink">
            {c.title}
          </h2>
          <p className="mt-1 text-[13px] leading-relaxed text-ink/60">
            {c.text}{" "}
            <Link href={localePath(lang, PATHS.privacy)} className="underline decoration-ink/20 underline-offset-2 hover:text-ink">
              {c.policy}
            </Link>
          </p>
        </div>
      </div>

      {details && (
        <div className="mt-4 space-y-2">
          <Toggle id="ck-necessary" checked disabled label={c.necessary} text={c.necessaryText} />
          <Toggle id="ck-analytics" checked={choice.analytics} onChange={(v) => setChoice((x) => ({ ...x, analytics: v }))} label={c.analytics} text={c.analyticsText} />
          <Toggle id="ck-marketing" checked={choice.marketing} onChange={(v) => setChoice((x) => ({ ...x, marketing: v }))} label={c.marketing} text={c.marketingText} />
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {details ? (
          <button type="button" onClick={() => save(choice)} className={`${btn} bg-ink text-white hover:bg-brand-deep`}>
            {c.save}
          </button>
        ) : (
          <button type="button" onClick={() => setDetails(true)} className={`${btn} border border-ink/10 text-ink hover:border-ink/25`}>
            {c.settings}
          </button>
        )}
        <button type="button" onClick={() => save({ analytics: false, marketing: false })} className={`${btn} border border-ink/10 text-ink hover:border-ink/25`}>
          {c.reject}
        </button>
        <button type="button" onClick={() => save({ analytics: true, marketing: true })} className={`${btn} bg-ink text-white hover:bg-brand-deep ${details ? "basis-full" : ""}`}>
          {c.accept}
        </button>
      </div>
    </div>
  )
}
