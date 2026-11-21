// Languages + fixed interface labels (menu, buttons, aria labels).
// Everything else — page copy, projects, reviews, pricing, FAQ, blog — is edited
// in the CMS (/keystatic) and stored in /content. See lib/content.ts.

export type Lang = "id" | "en"
export const LANGS: Lang[] = ["id", "en"]
export const homePath = (lang: Lang) => (lang === "id" ? "/" : "/en")
export const blogPath = (lang: Lang, slug?: string) => `${lang === "id" ? "" : "/en"}/blog${slug ? `/${slug}` : ""}`

type Item = { title: string; text: string }

export type Review = {
  name: string
  role: string
  quote: string
  rating: number
  project?: string
}

export type Tier = {
  name: string
  price: string
  tagline: string
  timeline: string
  renewal: string
  features: string[]
  featured?: boolean
}

export type Project = {
  client: string
  url: string
  image: string
  tags: string[]
  showInHero: boolean
  title: string
  category: string
  description: string
}

export type Settings = {
  waNumber: string
  phoneDisplay: string
  email: string
  instagram: string
  facebook: string
}

export type Dict = {
  meta: { title: string; description: string; ogLocale: string }
  nav: { work: string; services: string; reviews: string; pricing: string; faq: string; blog: string; cta: string; open: string; close: string }
  hero: {
    skip: string
    badge: string
    kicker: string
    line1: string
    line2: string
    words: string[]
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    ctaSecondaryNote: string
    open: string
    visit: string
    guaranteeTitle: string
    guaranteeText: string
    ratingTitle: string
    ratingText: string
    marquee: string[]
  }
  work: { label: string; titleA: string; titleEm: string; titleB: string; text: string; visit: string }
  services: {
    label: string
    titleA: string
    titleEm: string
    text: string
    items: Item[]
    processLabel: string
    processTitleA: string
    processTitleEm: string
    steps: Item[]
  }
  reviews: { label: string; titleA: string; titleEm: string; text: string; visit: string; items: Review[] }
  pricing: {
    label: string
    titleA: string
    titleEm: string
    text: string
    included: string[]
    from: string
    currency: string
    popular: string
    choose: string
    customTitle: string
    customText: string
    customCta: string
    tiers: Tier[]
  }
  faq: { label: string; titleA: string; titleEm: string; items: { q: string; a: string }[] }
  cta: { kicker: string; line1: string; line2A: string; line2Em: string; text: string; button: string }
  footer: {
    about: string
    servicesLabel: string
    services: string[]
    navLabel: string
    contactLabel: string
    available: string
    rights: string
    privacy: string
    terms: string
  }
  /** WhatsApp pre-filled messages. `tier` uses {paket} and {harga} placeholders. */
  wa: { general: string; hero: string; float: string; custom: string; cta: string; tier: string }
  blog: {
    label: string
    titleA: string
    titleEm: string
    text: string
    read: string
    minRead: string
    back: string
    more: string
    empty: string
    ctaTitle: string
    ctaText: string
    ctaButton: string
    dateLocale: string
  }
}

/** Labels that are part of the interface rather than editable content. */
export const ui = {
  id: {
    ogLocale: "id_ID",
    nav: { work: "Karya", services: "Layanan", reviews: "Review", pricing: "Harga", faq: "FAQ", blog: "Blog", cta: "Mulai Proyek", open: "Buka menu", close: "Tutup menu" },
    hero: { skip: "Langsung ke Paket & Harga", open: "Buka", visit: "Kunjungi" },
    work: { visit: "Kunjungi website" },
    reviews: { visit: "Lihat website" },
    pricing: { from: "Mulai dari", currency: "Rp", popular: "Paling Populer", choose: "Pilih" },
    footer: { servicesLabel: "Layanan", navLabel: "Navigasi", contactLabel: "Hubungi", rights: "Semua hak dilindungi.", privacy: "Kebijakan Privasi", terms: "Syarat Layanan" },
    blog: {
      label: "Blog",
      titleA: "Insight untuk",
      titleEm: "bisnis online",
      text: "Panduan praktis seputar website, SEO, dan pemasaran digital untuk UMKM.",
      read: "Baca artikel",
      minRead: "menit baca",
      back: "Semua artikel",
      more: "Artikel lainnya",
      empty: "Belum ada artikel.",
      ctaTitle: "Butuh website untuk bisnis Anda?",
      ctaText: "Konsultasi gratis — kami bantu pilih solusi yang tepat beserta estimasi biayanya.",
      ctaButton: "Chat via WhatsApp",
      dateLocale: "id-ID",
    },
  },
  en: {
    ogLocale: "en_US",
    nav: { work: "Work", services: "Services", reviews: "Reviews", pricing: "Pricing", faq: "FAQ", blog: "Blog", cta: "Start a Project", open: "Open menu", close: "Close menu" },
    hero: { skip: "Skip to Pricing", open: "Open", visit: "Visit" },
    work: { visit: "Visit website" },
    reviews: { visit: "View website" },
    pricing: { from: "Starting at", currency: "IDR", popular: "Most Popular", choose: "Choose" },
    footer: { servicesLabel: "Services", navLabel: "Navigate", contactLabel: "Contact", rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms of Service" },
    blog: {
      label: "Blog",
      titleA: "Insights for",
      titleEm: "online business",
      text: "Practical guides on websites, SEO, and digital marketing for small businesses.",
      read: "Read article",
      minRead: "min read",
      back: "All articles",
      more: "More articles",
      empty: "No articles yet.",
      ctaTitle: "Need a website for your business?",
      ctaText: "Free consultation — we'll recommend the right solution and an estimated cost.",
      ctaButton: "Chat on WhatsApp",
      dateLocale: "en-GB",
    },
  },
} as const

/** Fill the {paket}/{harga} placeholders of the pricing WhatsApp message. */
export const tierMessage = (template: string, name: string, price: string) =>
  template.replace(/\{paket\}/g, name).replace(/\{harga\}/g, price)

export const waLink = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`
export const domain = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "")
