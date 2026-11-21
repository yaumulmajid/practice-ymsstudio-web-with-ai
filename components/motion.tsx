"use client"

import { useEffect, useRef, type CSSProperties, type ElementType, type MouseEvent, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  style?: CSSProperties
  [key: string]: unknown
}

/** Fades, lifts and un-blurs its children the first time they scroll into view. */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "", style, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in")
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Mouse handler that feeds cursor position to the `.spotlight` CSS effect. */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
}

/** Small section label, e.g. "01 — Layanan". */
export function Eyebrow({ index, children, dark = false }: { index: string; children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] ${
        dark ? "text-white/60" : "text-ink/50"
      }`}
    >
      <span className="text-brand">{index}</span>
      <span className={`h-px w-8 ${dark ? "bg-white/20" : "bg-ink/15"}`} />
      {children}
    </div>
  )
}

export const WA_NUMBER = "6283822640883"
export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
