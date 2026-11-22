"use server"

// Project brief form → "leads" collection in the CMS (an email goes out when SMTP is set).
// Spam protection: hidden honeypot field, minimum fill time, and a per-IP rate limit.
import { headers } from "next/headers"
import { getPayloadClient } from "@/lib/payload"
import { isLang, type Lang } from "@/lib/i18n"

export type LeadState = { ok: boolean; error?: "required" | "phone" | "email" | "rate" | "server" }

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // keep memory bounded
  return recent.length > MAX_PER_WINDOW
}

const field = (form: FormData, name: string, max: number) => String(form.get(name) ?? "").trim().slice(0, max)

/** Indonesian numbers: "0812…" / "+62 812…" → "62812…". */
function normalizePhone(raw: string) {
  let digits = raw.replace(/\D/g, "")
  if (digits.startsWith("0")) digits = `62${digits.slice(1)}`
  return digits
}

export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  // Bots fill every field (honeypot) or submit instantly; pretend success so they don't retry.
  if (field(form, "website", 200)) return { ok: true }
  const startedAt = Number(form.get("startedAt") || 0)
  if (startedAt && Date.now() - startedAt < 2500) return { ok: true }

  const name = field(form, "name", 100)
  const whatsapp = normalizePhone(field(form, "whatsapp", 30))
  const email = field(form, "email", 160)
  if (!name || !field(form, "whatsapp", 30)) return { ok: false, error: "required" }
  if (whatsapp.length < 9 || whatsapp.length > 15) return { ok: false, error: "phone" }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "email" }

  const h = await headers()
  const ip = (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "unknown").trim()
  if (rateLimited(ip)) return { ok: false, error: "rate" }

  const langValue = field(form, "lang", 4)
  const lang: Lang = isLang(langValue) ? langValue : "id"
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: "leads",
      data: {
        name,
        business: field(form, "business", 120),
        whatsapp,
        email: email || undefined,
        service: field(form, "service", 80),
        budget: field(form, "budget", 60),
        timeline: field(form, "timeline", 60),
        message: field(form, "message", 3000),
        sourcePage: field(form, "sourcePage", 300),
        lang,
      },
      overrideAccess: true,
    })
    return { ok: true }
  } catch (err) {
    console.error("Lead submission failed", err)
    return { ok: false, error: "server" }
  }
}
