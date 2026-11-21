import type React from "react"
import { Suspense } from "react"
import { Inter, Instrument_Serif } from "next/font/google"
import WhatsAppButton from "@/components/ui/WhatsAppButton"
import { LangProvider } from "@/components/lang"
import type { Lang } from "@/lib/i18n"
import { buildStructuredData } from "@/lib/seo"
import { getSite } from "@/lib/content"
import "@/app/globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

const serif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-display",
  weight: "400",
  style: ["normal", "italic"],
})

/** The <html> document shared by every language's root layout. */
export default async function SiteDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const site = await getSite(lang)
  const structuredData = buildStructuredData(site)

  return (
    <html lang={lang} className={`${inter.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#F7F9FB" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* FAQPage markup is added on the home page only (where the FAQ is visible). */}
        {Object.entries(structuredData).filter(([k]) => k !== "faq").map(([, data], i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
      </head>

      <body className="antialiased">
        <LangProvider site={site}>
          {children}
          <Suspense fallback={null}>
            <WhatsAppButton />
          </Suspense>
        </LangProvider>

        <script defer src="https://www.googletagmanager.com/gtag/js?id=AW-17737646735" />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17737646735', { page_path: window.location.pathname });
            `,
          }}
        />
      </body>
    </html>
  )
}
