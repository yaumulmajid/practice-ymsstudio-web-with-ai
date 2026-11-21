"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type MouseEvent, type ReactNode } from "react"


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
  // Kept in React state (not classList) so re-renders never drop the visible state.
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
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
        dark ? "text-white/50" : "text-ink/50"
      }`}
    >
      <span className="text-brand">{index}</span>
      <span className={`h-px w-8 ${dark ? "bg-white/20" : "bg-ink/15"}`} />
      {children}
    </div>
  )
}

/** Section heading block used across the page. */
export function SectionHead({
  index,
  label,
  title,
  text,
  dark = false,
  center = false,
}: {
  index: string
  label: string
  title: ReactNode
  text?: string
  dark?: boolean
  center?: boolean
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : text ? "grid gap-6 md:grid-cols-2 md:items-end" : ""}>
      <div>
        <Reveal>
          <Eyebrow index={index} dark={dark}>
            {label}
          </Eyebrow>
        </Reveal>
        <Reveal
          as="h2"
          delay={80}
          className={`mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-6xl ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </Reveal>
      </div>
      {text && (
        <Reveal
          as="p"
          delay={160}
          className={`text-base leading-relaxed ${center ? "mt-5" : "max-w-md md:justify-self-end"} ${
            dark ? "text-white/55" : "text-ink/55"
          }`}
        >
          {text}
        </Reveal>
      )}
    </div>
  )
}
