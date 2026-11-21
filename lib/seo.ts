// SEO: shared metadata pieces and JSON-LD structured data per language.
import type { Metadata } from "next"
import { dictionaries, type Lang } from "@/lib/i18n"

// Structured data JSON-LD
export function buildStructuredData(lang: Lang) {
  const faqs = dictionaries[lang].faq.items
  return {
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
}

const SITE = "https://ymsstudio.id"
const OG_IMAGE = `${SITE}/og-image.webp`

export function buildMetadata(lang: Lang): Metadata {
  const t = dictionaries[lang].meta
  const url = lang === "id" ? SITE : `${SITE}/en`
  return {
    metadataBase: new URL(SITE),
    title: t.title,
    description: t.description,
    keywords:
      lang === "id"
        ? ["website UMKM", "jasa website UMKM", "jasa pembuatan website", "jasa website profesional", "jasa toko online", "jasa company profile", "jasa landing page", "YMS Studio"]
        : ["web design Indonesia", "website development Indonesia", "small business website", "online store development", "company profile website", "landing page design", "YMS Studio"],
    authors: [{ name: "YMS Studio" }],
    creator: "YMS Studio",
    publisher: "YMS Studio",
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      locale: t.ogLocale,
      alternateLocale: lang === "id" ? ["en_US"] : ["id_ID"],
      url,
      siteName: "YMS Studio",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: t.title, type: "image/webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [OG_IMAGE],
      creator: "@ymsstudio",
      site: "@ymsstudio",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    verification: { google: "N8RuJSquQF6x7Ic0l1pLNKa3uGpnQGdhrv7AKAuCW70" },
    alternates: {
      canonical: url,
      languages: { "id-ID": SITE, "en-US": `${SITE}/en`, "x-default": SITE },
    },
  }
}
