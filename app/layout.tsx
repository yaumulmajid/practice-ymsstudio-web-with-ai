import type React from "react"
import type { Metadata } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import { Suspense } from "react"
import WhatsAppButton from "@/components/ui/WhatsAppButton"
import { faqs } from "@/lib/site-data"
import "./globals.css"

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

export const metadata: Metadata = {
  title: "YMS Studio - Jasa Website UMKM Profesional (Desain Custom & Bergaransi)",

  description:
    "Jasa pembuatan website profesional untuk UMKM & bisnis kecil Indonesia. Landing page, company profile, dan toko online mulai Rp 2 juta — desain custom, domain & hosting termasuk, bergaransi.",

  keywords: [
    "website UMKM",
    "jasa website UMKM",
    "jasa pembuatan website UMKM",
    "jasa website murah UMKM",
    "jasa toko online UMKM",
    "website UMKM profesional",
    "jasa landing page UMKM",
    "website UMKM Indonesia",
    "YMS Studio",
  ],

  authors: [{ name: "YMS Studio" }],
  creator: "YMS Studio",
  publisher: "YMS Studio",

  openGraph: {
    title: "YMS Studio - Jasa Website UMKM Profesional (Desain Custom & Bergaransi)",
    description:
      "Pembuatan website UMKM cepat, mobile-friendly, dan terjangkau. Toko online, company profile, landing page untuk bisnis kecil Indonesia.",
    type: "website",
    locale: "id_ID",
    url: "https://ymsstudio.id",
    siteName: "YMS Studio",
    images: [
      {
        url: "https://ymsstudio.id/og-image.webp",
        width: 1200,
        height: 630,
        alt: "YMS Studio - Jasa Website UMKM Profesional Indonesia",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "YMS Studio - Jasa Website UMKM Profesional (Desain Custom & Bergaransi)",
    description:
      "Jasa pembuatan website UMKM mulai Rp 2 juta. Landing page, company profile, toko online. Desain custom, cepat, dan bergaransi.",
    images: ["https://ymsstudio.id/og-image.webp"],
    creator: "@ymsstudio",
    site: "@ymsstudio",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "N8RuJSquQF6x7Ic0l1pLNKa3uGpnQGdhrv7AKAuCW70",
  },

  alternates: {
    canonical: "https://ymsstudio.id",
    languages: {
      "id-ID": "https://ymsstudio.id",
    },
  },
}

// Structured data JSON-LD
const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YMS Studio",
    url: "https://ymsstudio.id",
    logo: "https://ymsstudio.id/logo.webp",
    sameAs: [
      "https://www.instagram.com/ymsstud.io",
      "https://www.facebook.com/ymsstudio",
      "https://www.linkedin.com/company/ymsstudio",
    ],
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://ymsstudio.id",
    name: "YMS Studio — Jasa Website UMKM Profesional (Desain Custom & Bergaransi)",
    publisher: {
      "@type": "Organization",
      name: "YMS Studio",
      logo: {
        "@type": "ImageObject",
        url: "https://ymsstudio.id/logo.webp",
      },
    },
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ymsstudio.id/#services",
    name: "YMS Studio - Jasa Pembuatan Website UMKM",
    url: "https://ymsstudio.id",
    image: "https://ymsstudio.id/logo.webp",
    logo: "https://ymsstudio.id/logo.webp",
    description:
      "Jasa pembuatan website profesional untuk UMKM Indonesia. Cepat, mobile-friendly, SEO-ready, mulai Rp 2 juta, dan bergaransi.",
    telephone: "+6283822640883",
    priceRange: "Rp 2.000.000 - Rp 6.000.000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Blok A5 No 29, Jl. Wimbledon Raya, Jatireja, Cikarang Timur",
      addressLocality: "Bekasi",
      addressRegion: "Jawa Barat",
      postalCode: "17533",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.23827,
      longitude: 106.975571,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/ymsstudios/",
      "https://www.facebook.com/ymsstudio.web/",
      "https://wa.me/6283822640883",
    ],
    serviceType: [
      "Jasa Website UMKM",
      "Jasa Landing Page",
      "Jasa Toko Online",
      "Jasa Company Profile",
      "Jasa WordPress",
      "Jasa Website Bisnis Kecil",
      "Website",
      "Jasa Website",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50",
    },
  },
  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Jasa Pembuatan Website UMKM",
    provider: {
      "@type": "LocalBusiness",
      name: "YMS Studio",
      url: "https://ymsstudio.id",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    description:
      "Jasa pembuatan website profesional untuk UMKM Indonesia. Termasuk landing page, toko online, company profile mulai Rp 2 juta.",
    offers: {
      "@type": "Offer",
      price: "2000000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: "https://ymsstudio.id",
    },
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0E1113" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Structured Data - Minified */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.organization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.website) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.localBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.service) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.faq) }}
        />
      </head>

      <body className="antialiased">
        {children}
        
        {/* Lazy load non-critical components */}
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
        {/* Defer Google Analytics */}
        <script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=AW-17737646735"
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17737646735', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  )
}