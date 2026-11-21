import type React from "react"
import type { Metadata } from "next"
import SiteDocument from "@/components/site-document"
import { buildMetadata } from "@/lib/seo"
import { getSite } from "@/lib/content"

// Root layout for the English site, served at /en
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(await getSite("en"))
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="en">{children}</SiteDocument>
}
