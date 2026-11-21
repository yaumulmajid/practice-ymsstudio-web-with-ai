import type React from "react"
import type { Metadata } from "next"
import SiteDocument from "@/components/site-document"
import { buildMetadata } from "@/lib/seo"

// Root layout for the Indonesian site, served at /
export const metadata: Metadata = buildMetadata("id")

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="id">{children}</SiteDocument>
}
