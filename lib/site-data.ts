// Single source of truth for page content and the SEO structured data in app/layout.tsx.

export const WA_NUMBER = "6283822640883"
export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

export type Project = {
  title: string
  client: string
  category: string
  url: string
  image: string
  year: string
  description: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: "Sarasa — Catering Online",
    client: "Sarasa",
    category: "E-Commerce",
    url: "https://sarasa.id",
    image: "/project-4.webp",
    year: "2025",
    description:
      "Platform catering dengan katalog menu, pemilihan tanggal & jumlah tamu, perhitungan harga otomatis, dan pembayaran online.",
    tags: ["WordPress", "WooCommerce", "Payment Gateway"],
  },
  {
    title: "Haris Jaya Service",
    client: "Haris Jaya",
    category: "Company Profile",
    url: "https://harisjayaservice.com",
    image: "/project-2.webp",
    year: "2025",
    description:
      "Company profile jasa service AC yang fokus konversi: daftar layanan, rating pelanggan, dan tombol WhatsApp di setiap layar.",
    tags: ["WordPress", "Elementor", "Lead Generation"],
  },
  {
    title: "Indeks Kualitas Kebijakan",
    client: "LAN RI",
    category: "Web App",
    url: "https://ikk.lan.go.id",
    image: "/project-3.webp",
    year: "2024",
    description:
      "Sistem informasi instansi pemerintah: registrasi pengguna, unggah/unduh data, optimasi query, dan pembaruan antarmuka.",
    tags: ["Spring Boot", "Vue.js", "PostgreSQL"],
  },
  {
    title: "Ibrahima Place",
    client: "Ibrahima Place",
    category: "Booking & Reservasi",
    url: "https://ibrahimaplace.com",
    image: "/project-1.webp",
    year: "2024",
    description:
      "Website reservasi penginapan dengan kalender ketersediaan, notifikasi otomatis, dan alur booking yang sederhana.",
    tags: ["WordPress", "Booking System"],
  },
  {
    title: "The Donut Experiment",
    client: "The Donut Experiment",
    category: "Food & Beverage",
    url: "https://thedonutexperiment.com",
    image: "/project-5.webp",
    year: "2024",
    description:
      "Website toko donat dengan menu interaktif, pemesanan online, dan informasi lokasi gerai.",
    tags: ["WordPress", "WooCommerce"],
  },
  {
    title: "LoopNet Property Listing",
    client: "LoopNet",
    category: "Property Listing",
    url: "https://loopnet.com",
    image: "/project-6.webp",
    year: "2024",
    description:
      "Portal listing properti komersial dengan pencarian lokasi & harga serta formulir kontak agen.",
    tags: ["WordPress", "ACF", "Search & Filter"],
  },
]

export type Tier = {
  name: string
  price: string
  priceNumber: number
  tagline: string
  timeline: string
  renewal: string
  features: string[]
  featured?: boolean
}

export const tiers: Tier[] = [
  {
    name: "Landing Page",
    price: "2jt",
    priceNumber: 2_000_000,
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
    priceNumber: 3_500_000,
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
    priceNumber: 6_000_000,
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
]

export const faqs = [
  {
    q: "Berapa harga pembuatan website di YMS Studio?",
    a: "Mulai dari Rp 2.000.000 untuk landing page, Rp 3.500.000 untuk company profile, dan Rp 6.000.000 untuk toko online. Semua paket sudah termasuk domain, hosting 1 tahun, SSL, dan desain custom.",
  },
  {
    q: "Berapa lama proses pembuatan website?",
    a: "Landing page 5–7 hari kerja, company profile 7–14 hari kerja, dan toko online 14–21 hari kerja, tergantung kelengkapan materi dari klien.",
  },
  {
    q: "Apakah saya bisa mengubah isi website sendiri?",
    a: "Bisa. Paket Company Profile dan Toko Online menggunakan CMS, dan kami berikan panduan serta training agar Anda bisa mengelola konten sendiri.",
  },
  {
    q: "Apakah website yang dibuat mobile-friendly dan SEO-ready?",
    a: "Ya. Semua website responsif, dioptimasi kecepatan, dan sudah disiapkan struktur SEO on-page agar mudah ditemukan di Google.",
  },
  {
    q: "Apakah ada garansi?",
    a: "Ya. Setiap paket mendapat revisi desain sesuai paket, garansi perbaikan bug, dan support teknis selama masa support berlaku.",
  },
]
