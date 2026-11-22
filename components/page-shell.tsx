// Shared layout pieces for content pages (legal, services, calculator, brief, case studies).
import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Eyebrow, Reveal } from "@/components/motion"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-clip bg-background text-foreground">
      <Header />
      <main className="pt-32 sm:pt-40">{children}</main>
      <Footer />
    </div>
  )
}

export type Crumb = { name: string; href: string }

/** Visible breadcrumb trail (the last item is the current page). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink/45">
        {items.map((c, i) => (
          <li key={c.href} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} className="text-ink/25" />}
            {i < items.length - 1 ? (
              <Link href={c.href} className="transition-colors hover:text-ink">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink/70">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Page heading: eyebrow, big title with an italic accent, intro text. */
export function PageHero({
  label,
  title,
  em,
  text,
  children,
}: {
  label: string
  title: string
  em?: string
  text?: string
  children?: React.ReactNode
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <Eyebrow index="YMS">{label}</Eyebrow>
      </Reveal>
      <Reveal as="h1" delay={80} className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
        {title} {em && <em className="font-serif font-normal italic text-brand">{em}</em>}
      </Reveal>
      {text && (
        <Reveal as="p" delay={160} className="mt-6 max-w-2xl text-base leading-relaxed text-ink/55 sm:text-lg">
          {text}
        </Reveal>
      )}
      {children}
    </div>
  )
}

/** JSON-LD script tag. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
