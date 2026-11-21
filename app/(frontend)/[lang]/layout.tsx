import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SiteDocument from "@/components/site-document"
import { getSite } from "@/lib/content"
import { isLang } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

// Root layout of the public site. proxy.ts maps "/" → /id and keeps "/en" as is,
// so visitors see "/" (Indonesian) and "/en" (English).
//
// Pages are rendered on first request and cached (ISR); saving in the CMS
// revalidates them. Nothing is prerendered at build time, so the Docker build
// does not need a database.
export const revalidate = 3600
export const dynamicParams = true

export function generateStaticParams() {
  return []
}

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return isLang(lang) ? buildMetadata(await getSite(lang)) : {}
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return <SiteDocument lang={lang}>{children}</SiteDocument>
}
