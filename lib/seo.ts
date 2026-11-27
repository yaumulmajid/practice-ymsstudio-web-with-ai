// SEO: shared metadata pieces and JSON-LD structured data per language.
import type { Metadata } from "next"
import type { SiteData } from "@/lib/content"

// Structured data JSON-LD
export function buildStructuredData(site: SiteData) {
  const faqs = site.dict.faq.items
  const { settings } = site
  const en = site.lang === "en"
  const social = [settings.instagram, settings.facebook].filter(Boolean)
  const rated = site.dict.reviews.items.filter((r) => r.rating >= 1 && r.rating <= 5 && r.name)
  return {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YMS Studio",
    url: "https://ymsstudio.id",
    logo: "https://ymsstudio.id/logo.webp",
    sameAs: social,
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://ymsstudio.id",
    name: en ? "YMS Studio — Web Design & Development Company in Indonesia" : "YMS Studio — Jasa Website UMKM Profesional (Desain Custom & Bergaransi)",
    inLanguage: en ? "en-US" : "id-ID",
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
    // Must match the Google Business Profile name exactly (same in every language: one business).
    name: "YMS Studio - Jasa Pembuatan Website",
    alternateName: "YMS Studio",
    url: "https://ymsstudio.id",
    image: "https://ymsstudio.id/logo.webp",
    logo: "https://ymsstudio.id/logo.webp",
    description: en
      ? "Web design and development studio in Cikarang, Indonesia: landing pages, company profiles, online stores, custom web apps, and white-label work for agencies. Fast, mobile-friendly, SEO-ready, from IDR 2 million."
      : "Jasa pembuatan website profesional untuk UMKM Indonesia. Cepat, mobile-friendly, SEO-ready, mulai Rp 2 juta, dan bergaransi.",
    telephone: `+${settings.waNumber}`,
    priceRange: "Rp 2.000.000 - Rp 6.000.000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Graha Asri, Jl. Citanduy Timur 1A, Lavender Hijau Blok UU No. 6, Simpangan, Cikarang Utara",
      addressLocality: "Kabupaten Bekasi",
      addressRegion: "Jawa Barat",
      postalCode: "17534",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.2788885,
      longitude: 107.1836068,
    },
    ...(settings.mapsUrl ? { hasMap: settings.mapsUrl } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    sameAs: [...social, `https://wa.me/${settings.waNumber}`],
    serviceType: en
      ? ["Web Design", "Web Development", "Landing Page Design", "Company Profile Website", "Online Store Development", "Custom Web App Development", "WordPress Development", "Next.js Development", "White-Label Web Development"]
      : [
      "Jasa Website UMKM",
      "Jasa Landing Page",
      "Jasa Toko Online",
      "Jasa Company Profile",
      "Jasa WordPress",
      "Jasa Website Bisnis Kecil",
      "Website",
      "Jasa Website",
    ],
    areaServed: [{ "@type": "Country", name: "Indonesia" }, { "@type": "Place", name: en ? "Worldwide (remote)" : "Seluruh dunia (online)" }],
    knowsLanguage: ["id", "en"],
    // Rating from the reviews actually published in the CMS (never a made-up count).
    ...(rated.length
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (rated.reduce((sum, r) => sum + r.rating, 0) / rated.length).toFixed(1),
            reviewCount: String(rated.length),
            bestRating: "5",
            worstRating: "1",
          },
          review: rated.slice(0, 5).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewBody: r.quote,
            reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5", worstRating: "1" },
          })),
        }
      : {}),
  },
  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: en ? "Web Design & Development" : "Jasa Pembuatan Website UMKM",
    provider: {
      "@type": "LocalBusiness",
      name: "YMS Studio",
      url: "https://ymsstudio.id",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    description: en
      ? "Professional web design and development from Indonesia: landing pages, online stores, and company profiles from IDR 2 million, plus custom web apps."
      : "Jasa pembuatan website profesional untuk UMKM Indonesia. Termasuk landing page, toko online, company profile mulai Rp 2 juta.",
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

export const SITE = "https://ymsstudio.id"
export const OG_IMAGE = `${SITE}/og-image.webp`

export function buildMetadata(site: SiteData): Metadata {
  const { lang } = site
  const t = site.dict.meta
  const url = lang === "id" ? SITE : `${SITE}/en`
  return {
    metadataBase: new URL(SITE),
    title: t.title,
    description: t.description,
    keywords:
      lang === "id"
        ? ["website UMKM", "jasa website UMKM", "jasa pembuatan website", "jasa website profesional", "jasa toko online", "jasa company profile", "jasa landing page", "YMS Studio"]
        : ["web design Indonesia", "web development company Indonesia", "web developer Indonesia", "outsource web development Indonesia", "white label web development", "web design Cikarang", "web design Jakarta", "YMS Studio"],
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
