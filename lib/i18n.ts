// All page copy in Indonesian (default, served at /) and English (served at /en).

export type Lang = "id" | "en"
export const LANGS: Lang[] = ["id", "en"]
export const homePath = (lang: Lang) => (lang === "id" ? "/" : "/en")

type Item = { title: string; text: string }

export type Review = {
  name: string
  role: string // e.g. "Owner, Sarasa Catering"
  quote: string
  rating: number // 1–5
  project?: string // optional website, e.g. "https://sarasa.id"
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

export type ProjectCopy = { title: string; category: string; description: string }

export type Dict = {
  meta: { title: string; description: string; ogLocale: string }
  nav: { work: string; services: string; reviews: string; pricing: string; faq: string; cta: string; open: string; close: string }
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
  work: { label: string; titleA: string; titleEm: string; titleB: string; text: string; visit: string; projects: ProjectCopy[] }
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
  wa: {
    general: string
    hero: string
    float: string
    custom: string
    cta: string
    tier: (name: string, price: string) => string
  }
}

// ─────────────────────────────────────────────────────────────
// Client reviews. Add REAL reviews only (with the client's permission).
// The Reviews section stays hidden until this list has at least one entry.
// Write each quote in both languages below.
// ─────────────────────────────────────────────────────────────
const reviewsId: Review[] = []
const reviewsEn: Review[] = []

const id: Dict = {
  meta: {
    title: "YMS Studio - Jasa Website UMKM Profesional (Desain Custom & Bergaransi)",
    description:
      "Jasa pembuatan website profesional untuk UMKM & bisnis kecil Indonesia. Landing page, company profile, dan toko online mulai Rp 2 juta — desain custom, domain & hosting termasuk, bergaransi.",
    ogLocale: "id_ID",
  },
  nav: { work: "Karya", services: "Layanan", reviews: "Review", pricing: "Harga", faq: "FAQ", cta: "Mulai Proyek", open: "Buka menu", close: "Tutup menu" },
  hero: {
    skip: "Langsung ke Paket & Harga",
    badge: "Menerima proyek baru",
    kicker: "Jasa Website UMKM & Bisnis",
    line1: "Website profesional",
    line2: "yang bikin bisnis Anda",
    words: ["dipercaya.", "ditemukan.", "dipilih.", "laris."],
    sub: "Kami merancang dan membangun website yang cepat, mudah ditemukan di Google, dan mengubah pengunjung menjadi pelanggan.",
    ctaPrimary: "Konsultasi Gratis",
    ctaSecondary: "Lihat Paket",
    ctaSecondaryNote: "· mulai Rp 2jt",
    open: "Buka",
    visit: "Kunjungi",
    guaranteeTitle: "Garansi revisi",
    guaranteeText: "Sampai Anda puas",
    ratingTitle: "4.9/5 rating klien",
    ratingText: "20+ website live",
    marquee: ["Landing Page", "Company Profile", "Toko Online", "Web App Custom", "SEO & Google Business", "Google & Meta Ads", "Maintenance"],
  },
  work: {
    label: "Karya Terpilih",
    titleA: "Website yang sudah",
    titleEm: "bekerja",
    titleB: "untuk klien kami",
    text: "Klik untuk melihat langsung website yang sudah live — bukan sekadar mockup.",
    visit: "Kunjungi website",
    projects: [
      { title: "Sarasa — Catering Online", category: "E-Commerce", description: "Platform catering dengan katalog menu, pemilihan tanggal & jumlah tamu, perhitungan harga otomatis, dan pembayaran online." },
      { title: "Haris Jaya Service", category: "Company Profile", description: "Company profile jasa service AC yang fokus konversi: daftar layanan, rating pelanggan, dan tombol WhatsApp di setiap layar." },
      { title: "Indeks Kualitas Kebijakan", category: "Web App", description: "Sistem informasi instansi pemerintah: registrasi pengguna, unggah/unduh data, optimasi query, dan pembaruan antarmuka." },
      { title: "Ibrahima Place", category: "Booking & Reservasi", description: "Website reservasi penginapan dengan kalender ketersediaan, notifikasi otomatis, dan alur booking yang sederhana." },
      { title: "The Donut Experiment", category: "Food & Beverage", description: "Website toko donat dengan menu interaktif, pemesanan online, dan informasi lokasi gerai." },
      { title: "LoopNet Property Listing", category: "Property Listing", description: "Portal listing properti komersial dengan pencarian lokasi & harga serta formulir kontak agen." },
    ],
  },
  services: {
    label: "Layanan",
    titleA: "Semua yang bisnis Anda butuhkan untuk",
    titleEm: "tumbuh online",
    text: "Satu tim untuk desain, pengembangan, SEO, dan iklan — Anda cukup fokus menjalankan bisnis.",
    items: [
      { title: "Desain & Pengembangan Web", text: "Landing page, company profile, toko online, hingga web app custom. Didesain khusus untuk brand Anda — bukan template pasaran." },
      { title: "SEO & Google Business", text: "Struktur SEO on-page, Search Console, dan Google Business Profile agar bisnis Anda muncul saat dicari." },
      { title: "Google Ads & Meta Ads", text: "Kampanye iklan yang dioptimasi untuk traffic dan konversi, dengan laporan yang mudah dipahami." },
      { title: "Performa & Keamanan", text: "Website cepat, SSL, backup otomatis, dan perlindungan dari spam serta serangan umum." },
      { title: "Analytics & Tracking", text: "GA4, Meta Pixel, dan tracking konversi WhatsApp — tahu persis dari mana pelanggan datang." },
      { title: "Maintenance & Support", text: "Update konten, perbaikan bug, dan bantuan teknis via WhatsApp setelah website live." },
    ],
    processLabel: "Cara kami bekerja",
    processTitleA: "Proses jelas,",
    processTitleEm: "tanpa ribet.",
    steps: [
      { title: "Konsultasi", text: "Kami pelajari bisnis, target pelanggan, dan tujuan website Anda." },
      { title: "Desain", text: "Rancangan tampilan sesuai identitas brand, direvisi sampai pas." },
      { title: "Development", text: "Dibangun cepat, responsif, dan siap SEO di semua perangkat." },
      { title: "Launch & Support", text: "Website online, Anda dilatih mengelola, kami tetap mendampingi." },
    ],
  },
  reviews: {
    label: "Review Klien",
    titleA: "Apa kata",
    titleEm: "klien kami",
    text: "Pengalaman langsung dari pemilik bisnis yang sudah bekerja sama dengan YMS Studio.",
    visit: "Lihat website",
    items: reviewsId,
  },
  pricing: {
    label: "Investasi",
    titleA: "Harga jelas,",
    titleEm: "hasil maksimal",
    text: "Pilih paket sesuai tahap bisnis Anda. Semua harga sudah termasuk domain, hosting tahun pertama, dan desain custom.",
    included: ["Desain custom", "Domain .com + hosting", "SSL & keamanan", "Mobile-friendly", "SEO-ready", "Tombol WhatsApp"],
    from: "Mulai dari",
    currency: "Rp",
    popular: "Paling Populer",
    choose: "Pilih",
    customTitle: "Butuh web app atau sistem custom?",
    customText: "Dashboard, sistem informasi, booking, membership, integrasi API — kami hitungkan sesuai kebutuhan.",
    customCta: "Diskusikan proyek",
    tiers: [
      {
        name: "Landing Page",
        price: "2jt",
        tagline: "Satu halaman yang meyakinkan untuk kampanye, produk, atau personal brand.",
        timeline: "5–7 hari kerja",
        renewal: "Perpanjangan Rp 600rb/tahun",
        features: [
          "1 halaman, desain custom (bukan template)",
          "Copywriting dasar & struktur yang menjual",
          "Domain .com + hosting 1 tahun",
          "SSL, keamanan & optimasi kecepatan",
          "Tombol WhatsApp & formulir kontak",
          "SEO on-page dasar",
          "Google Analytics 4 + Meta Pixel",
          "2x revisi desain",
        ],
      },
      {
        name: "Company Profile",
        price: "3,5jt",
        tagline: "Website bisnis lengkap yang membangun kepercayaan dan mudah ditemukan di Google.",
        timeline: "7–14 hari kerja",
        renewal: "Perpanjangan Rp 900rb/tahun",
        featured: true,
        features: [
          "Hingga 6 halaman + blog/artikel",
          "Desain custom sesuai identitas brand",
          "CMS — edit konten sendiri dengan mudah",
          "Domain .com + hosting 1 tahun",
          "Email bisnis (3 akun)",
          "SEO on-page lengkap + Search Console",
          "Setup Google Business Profile",
          "Google Analytics 4 + Meta Pixel",
          "Backup otomatis mingguan",
          "3x revisi + support 3 bulan",
        ],
      },
      {
        name: "Toko Online",
        price: "6jt",
        tagline: "Toko online siap jualan: dari katalog sampai pembayaran dan ongkir otomatis.",
        timeline: "14–21 hari kerja",
        renewal: "Perpanjangan Rp 1,5jt/tahun",
        features: [
          "Katalog produk tanpa batas + varian",
          "Keranjang, checkout & voucher diskon",
          "Payment gateway (Midtrans / Xendit)",
          "Ongkir otomatis & order via WhatsApp",
          "Dashboard admin pesanan & stok",
          "Domain .com + hosting performa tinggi",
          "Email bisnis (5 akun)",
          "SEO produk + GA4 e-commerce & Pixel",
          "Backup harian + training kelola toko",
          "4x revisi + support 6 bulan",
        ],
      },
    ],
  },
  faq: {
    label: "FAQ",
    titleA: "Pertanyaan yang",
    titleEm: "sering ditanya",
    items: [
      { q: "Berapa harga pembuatan website di YMS Studio?", a: "Mulai dari Rp 2.000.000 untuk landing page, Rp 3.500.000 untuk company profile, dan Rp 6.000.000 untuk toko online. Semua paket sudah termasuk domain, hosting 1 tahun, SSL, dan desain custom." },
      { q: "Berapa lama proses pembuatan website?", a: "Landing page 5–7 hari kerja, company profile 7–14 hari kerja, dan toko online 14–21 hari kerja, tergantung kelengkapan materi dari klien." },
      { q: "Apakah saya bisa mengubah isi website sendiri?", a: "Bisa. Paket Company Profile dan Toko Online menggunakan CMS, dan kami berikan panduan serta training agar Anda bisa mengelola konten sendiri." },
      { q: "Apakah website yang dibuat mobile-friendly dan SEO-ready?", a: "Ya. Semua website responsif, dioptimasi kecepatan, dan sudah disiapkan struktur SEO on-page agar mudah ditemukan di Google." },
      { q: "Apakah ada garansi?", a: "Ya. Setiap paket mendapat revisi desain sesuai paket, garansi perbaikan bug, dan support teknis selama masa support berlaku." },
    ],
  },
  cta: {
    kicker: "Siap mulai?",
    line1: "Mari bangun website",
    line2A: "yang",
    line2Em: "menghasilkan.",
    text: "Ceritakan bisnis Anda — kami bantu rekomendasikan solusi yang tepat beserta estimasi biayanya, gratis.",
    button: "Chat via WhatsApp",
  },
  footer: {
    about: "Jasa pembuatan website profesional untuk UMKM dan bisnis. Spesialis WordPress & Custom Development dengan harga terjangkau dan hasil maksimal.",
    servicesLabel: "Layanan",
    services: ["Landing Page", "Company Profile", "Toko Online", "Web App Custom"],
    navLabel: "Navigasi",
    contactLabel: "Hubungi",
    available: "Siap untuk proyek baru",
    rights: "Semua hak dilindungi.",
    privacy: "Kebijakan Privasi",
    terms: "Syarat Layanan",
  },
  wa: {
    general: "Halo YMS Studio, saya ingin konsultasi pembuatan website.",
    hero: "Halo YMS Studio, saya ingin konsultasi pembuatan website untuk bisnis saya.",
    float: "Halo YMS Studio, saya ingin konsultasi pembuatan website untuk usaha saya.",
    custom: "Halo YMS Studio, saya butuh web app / sistem custom. Bisa diskusi?",
    cta: "Halo YMS Studio, saya ingin memulai proyek website.",
    tier: (name, price) => `Halo YMS Studio, saya tertarik dengan paket ${name} (mulai Rp ${price}).`,
  },
}

const en: Dict = {
  meta: {
    title: "YMS Studio - Professional Website Design & Development for Small Businesses",
    description:
      "Professional websites for small businesses and growing brands in Indonesia. Landing pages, company profiles, and online stores from IDR 2M — custom design, domain & hosting included, with a revision guarantee.",
    ogLocale: "en_US",
  },
  nav: { work: "Work", services: "Services", reviews: "Reviews", pricing: "Pricing", faq: "FAQ", cta: "Start a Project", open: "Open menu", close: "Close menu" },
  hero: {
    skip: "Skip to Pricing",
    badge: "Taking on new projects",
    kicker: "Web Design & Development Studio",
    line1: "Professional websites",
    line2: "that make your business",
    words: ["trusted.", "found.", "chosen.", "grow."],
    sub: "We design and build websites that load fast, rank on Google, and turn visitors into customers.",
    ctaPrimary: "Free Consultation",
    ctaSecondary: "See Pricing",
    ctaSecondaryNote: "· from IDR 2M",
    open: "Open",
    visit: "Visit",
    guaranteeTitle: "Revision guarantee",
    guaranteeText: "Until you're happy",
    ratingTitle: "4.9/5 client rating",
    ratingText: "20+ live websites",
    marquee: ["Landing Pages", "Company Profiles", "Online Stores", "Custom Web Apps", "SEO & Google Business", "Google & Meta Ads", "Maintenance"],
  },
  work: {
    label: "Selected Work",
    titleA: "Websites already",
    titleEm: "working",
    titleB: "for our clients",
    text: "Click through to the live websites — not just mockups.",
    visit: "Visit website",
    projects: [
      { title: "Sarasa — Online Catering", category: "E-Commerce", description: "Catering platform with a menu catalogue, date & guest selection, automatic pricing, and online payment." },
      { title: "Haris Jaya Service", category: "Company Profile", description: "Conversion-focused company profile for an AC service business: service list, customer ratings, and WhatsApp on every screen." },
      { title: "Policy Quality Index", category: "Web App", description: "Government information system: user registration, data upload/download, query optimisation, and a refreshed interface." },
      { title: "Ibrahima Place", category: "Booking & Reservations", description: "Lodging reservation website with an availability calendar, automatic notifications, and a simple booking flow." },
      { title: "The Donut Experiment", category: "Food & Beverage", description: "Donut shop website with an interactive menu, online ordering, and store locations." },
      { title: "LoopNet Property Listing", category: "Property Listing", description: "Commercial property listing portal with location & price search and agent contact forms." },
    ],
  },
  services: {
    label: "Services",
    titleA: "Everything your business needs to",
    titleEm: "grow online",
    text: "One team for design, development, SEO, and ads — so you can focus on running your business.",
    items: [
      { title: "Web Design & Development", text: "Landing pages, company profiles, online stores, and custom web apps. Designed for your brand — never an off-the-shelf template." },
      { title: "SEO & Google Business", text: "On-page SEO, Search Console, and Google Business Profile so customers find you when they search." },
      { title: "Google Ads & Meta Ads", text: "Ad campaigns optimised for traffic and conversions, with reports that are easy to read." },
      { title: "Performance & Security", text: "Fast websites, SSL, automatic backups, and protection from spam and common attacks." },
      { title: "Analytics & Tracking", text: "GA4, Meta Pixel, and WhatsApp conversion tracking — know exactly where customers come from." },
      { title: "Maintenance & Support", text: "Content updates, bug fixes, and technical help over WhatsApp after launch." },
    ],
    processLabel: "How we work",
    processTitleA: "A clear process,",
    processTitleEm: "no hassle.",
    steps: [
      { title: "Discovery", text: "We learn about your business, customers, and goals for the website." },
      { title: "Design", text: "A design that fits your brand identity, refined until it's right." },
      { title: "Development", text: "Built fast, responsive, and SEO-ready on every device." },
      { title: "Launch & Support", text: "Your site goes live, you're trained to manage it, and we stay on hand." },
    ],
  },
  reviews: {
    label: "Client Reviews",
    titleA: "What our",
    titleEm: "clients say",
    text: "First-hand experiences from business owners who have worked with YMS Studio.",
    visit: "View website",
    items: reviewsEn,
  },
  pricing: {
    label: "Investment",
    titleA: "Clear pricing,",
    titleEm: "real results",
    text: "Choose the package that fits your stage. Every price includes a domain, first-year hosting, and custom design.",
    included: ["Custom design", ".com domain + hosting", "SSL & security", "Mobile-friendly", "SEO-ready", "WhatsApp button"],
    from: "Starting at",
    currency: "IDR",
    popular: "Most Popular",
    choose: "Choose",
    customTitle: "Need a custom web app or system?",
    customText: "Dashboards, information systems, booking, memberships, API integrations — quoted to your requirements.",
    customCta: "Discuss your project",
    tiers: [
      {
        name: "Landing Page",
        price: "2M",
        tagline: "One persuasive page for a campaign, product, or personal brand.",
        timeline: "5–7 working days",
        renewal: "Renewal IDR 600K/year",
        features: [
          "1 page, custom design (no templates)",
          "Basic copywriting & a structure that sells",
          ".com domain + 1 year hosting",
          "SSL, security & speed optimisation",
          "WhatsApp button & contact form",
          "Basic on-page SEO",
          "Google Analytics 4 + Meta Pixel",
          "2 design revisions",
        ],
      },
      {
        name: "Company Profile",
        price: "3.5M",
        tagline: "A complete business website that builds trust and gets found on Google.",
        timeline: "7–14 working days",
        renewal: "Renewal IDR 900K/year",
        featured: true,
        features: [
          "Up to 6 pages + blog",
          "Custom design matched to your brand",
          "CMS — edit your own content easily",
          ".com domain + 1 year hosting",
          "Business email (3 accounts)",
          "Full on-page SEO + Search Console",
          "Google Business Profile setup",
          "Google Analytics 4 + Meta Pixel",
          "Weekly automatic backups",
          "3 revisions + 3 months support",
        ],
      },
      {
        name: "Online Store",
        price: "6M",
        tagline: "A store ready to sell: from catalogue to payments and automatic shipping rates.",
        timeline: "14–21 working days",
        renewal: "Renewal IDR 1.5M/year",
        features: [
          "Unlimited products + variants",
          "Cart, checkout & discount vouchers",
          "Payment gateway (Midtrans / Xendit)",
          "Automatic shipping rates & WhatsApp orders",
          "Admin dashboard for orders & stock",
          ".com domain + high-performance hosting",
          "Business email (5 accounts)",
          "Product SEO + GA4 e-commerce & Pixel",
          "Daily backups + store management training",
          "4 revisions + 6 months support",
        ],
      },
    ],
  },
  faq: {
    label: "FAQ",
    titleA: "Frequently asked",
    titleEm: "questions",
    items: [
      { q: "How much does a website cost at YMS Studio?", a: "From IDR 2,000,000 for a landing page, IDR 3,500,000 for a company profile, and IDR 6,000,000 for an online store. Every package includes a domain, 1 year of hosting, SSL, and custom design." },
      { q: "How long does it take to build a website?", a: "Landing pages take 5–7 working days, company profiles 7–14 working days, and online stores 14–21 working days, depending on how quickly materials are ready." },
      { q: "Can I edit the website content myself?", a: "Yes. The Company Profile and Online Store packages use a CMS, and we provide a guide and training so you can manage content yourself." },
      { q: "Are the websites mobile-friendly and SEO-ready?", a: "Yes. Every website is responsive, optimised for speed, and set up with on-page SEO so it's easy to find on Google." },
      { q: "Is there a guarantee?", a: "Yes. Every package includes design revisions, a bug-fix guarantee, and technical support for the duration of the support period." },
    ],
  },
  cta: {
    kicker: "Ready to start?",
    line1: "Let's build a website",
    line2A: "that",
    line2Em: "performs.",
    text: "Tell us about your business — we'll recommend the right solution and an estimated cost, free of charge.",
    button: "Chat on WhatsApp",
  },
  footer: {
    about: "Professional website design and development for small businesses and growing brands. WordPress & custom development specialists — fair pricing, real results.",
    servicesLabel: "Services",
    services: ["Landing Pages", "Company Profiles", "Online Stores", "Custom Web Apps"],
    navLabel: "Navigate",
    contactLabel: "Contact",
    available: "Available for new projects",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  wa: {
    general: "Hi YMS Studio, I'd like to discuss a website project.",
    hero: "Hi YMS Studio, I'd like a free consultation about a website for my business.",
    float: "Hi YMS Studio, I'd like to discuss a website for my business.",
    custom: "Hi YMS Studio, I need a custom web app / system. Can we discuss?",
    cta: "Hi YMS Studio, I'd like to start a website project.",
    tier: (name, price) => `Hi YMS Studio, I'm interested in the ${name} package (from IDR ${price}).`,
  },
}

export const dictionaries: Record<Lang, Dict> = { id, en }
