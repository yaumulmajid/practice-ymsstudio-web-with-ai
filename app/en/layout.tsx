import type React from "react"
import type { Metadata } from "next"
import SiteDocument from "@/components/site-document"
import { buildMetadata } from "@/lib/seo"

// Root layout for the English site, served at /en
export const metadata: Metadata = buildMetadata("en")

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="en">{children}</SiteDocument>
}
