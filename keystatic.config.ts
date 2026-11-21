// CMS schema (Keystatic). Admin UI: /keystatic
//
// Content lives as files in /content and is committed to the repo:
//   - local dev (`npm run dev`): edits are written straight to /content.
//   - production: edits are committed to GitHub (main), which triggers the
//     Deploy workflow — the site updates ~2–3 minutes after "Save".
// See docs/CMS.md for the one-time GitHub App setup.
import { collection, config, fields, singleton, type ComponentSchema } from "@keystatic/core"

const REPO = "yaumulmajid/practice-ymsstudio-web-with-ai"

const useGithub = process.env.NODE_ENV !== "development" || process.env.NEXT_PUBLIC_KEYSTATIC_MODE === "github"

// ── Field helpers ────────────────────────────────────────────
const text = (label: string, description?: string) => fields.text({ label, description })
const area = (label: string, description?: string) => fields.text({ label, description, multiline: true })
const list = (label: string, itemLabel = "Item") =>
  fields.array(fields.text({ label: itemLabel }), { label, itemLabel: (p) => p.value || itemLabel })
const heading = () => ({
  label: text("Label kecil", "Teks kecil di atas judul, mis. 'Layanan'"),
  titleA: text("Judul"),
  titleEm: text("Judul (miring, berwarna)", "Bagian judul yang tampil miring berwarna"),
})

/** The same fields twice: Bahasa Indonesia and English. */
function bilingual<T extends Record<string, ComponentSchema>>(make: () => T) {
  return {
    id: fields.object(make(), { label: "🇮🇩 Bahasa Indonesia" }),
    en: fields.object(make(), { label: "🇬🇧 English" }),
  }
}

const page = (label: string, file: string, make: () => Record<string, ComponentSchema>) =>
  singleton({ label, path: `content/home/${file}`, format: { data: "yaml" }, schema: bilingual(make) })

// ── Blog ─────────────────────────────────────────────────────
const posts = (label: string, lang: "id" | "en") =>
  collection({
    label,
    slugField: "title",
    path: `content/blog/${lang}/*`,
    format: { contentField: "content" },
    entryLayout: "content",
    columns: ["title", "date"],
    schema: {
      title: fields.slug({
        name: { label: "Judul" },
        slug: { label: "URL (slug)", description: "Pakai slug yang sama di versi ID & EN agar tombol bahasa saling terhubung." },
      }),
      excerpt: area("Ringkasan", "1–2 kalimat. Tampil di daftar blog dan hasil Google."),
      date: fields.date({ label: "Tanggal terbit", validation: { isRequired: true } }),
      category: text("Kategori", "mis. Tips, Harga, SEO"),
      cover: fields.image({
        label: "Gambar cover (opsional)",
        directory: "public/images/blog",
        publicPath: "/images/blog/",
      }),
      draft: fields.checkbox({ label: "Draft (sembunyikan dari website)", defaultValue: false }),
      content: fields.markdoc({
        label: "Isi artikel",
        options: { image: { directory: "public/images/blog", publicPath: "/images/blog/" } },
      }),
    },
  })

export default config({
  storage: useGithub ? { kind: "github", repo: REPO } : { kind: "local" },
  ui: {
    brand: { name: "YMS Studio" },
    navigation: {
      Konten: ["projects", "reviews", "postsId", "postsEn"],
      "Halaman Utama": ["hero", "work", "services", "reviewsSection", "pricing", "faq", "cta", "footer"],
      Pengaturan: ["settings", "seo", "whatsapp"],
    },
  },

  collections: {
    projects: collection({
      label: "Portfolio / Project",
      slugField: "client",
      path: "content/projects/*",
      format: { data: "yaml" },
      columns: ["client", "order"],
      schema: {
        client: fields.slug({ name: { label: "Nama klien" } }),
        url: fields.url({ label: "URL website live", validation: { isRequired: true } }),
        image: fields.image({
          label: "Screenshot",
          description: "Rasio ±16:10, minimal lebar 1600px. Format .webp disarankan.",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
          validation: { isRequired: true },
        }),
        tags: list("Teknologi / tag", "Tag"),
        order: fields.integer({ label: "Urutan", description: "Angka kecil tampil lebih dulu", defaultValue: 10 }),
        showInHero: fields.checkbox({ label: "Tampilkan di Hero", description: "Rotasi showcase di bagian paling atas", defaultValue: false }),
        ...bilingual(() => ({
          title: text("Judul project"),
          category: text("Kategori", "mis. E-Commerce, Company Profile"),
          description: area("Deskripsi singkat"),
        })),
      },
    }),

    reviews: collection({
      label: "Review Klien",
      slugField: "name",
      path: "content/reviews/*",
      format: { data: "yaml" },
      columns: ["name", "rating"],
      schema: {
        name: fields.slug({ name: { label: "Nama klien", description: "Hanya review asli, dengan izin klien." } }),
        rating: fields.integer({ label: "Rating (1–5)", defaultValue: 5, validation: { min: 1, max: 5 } }),
        project: fields.url({ label: "Website klien (opsional)" }),
        order: fields.integer({ label: "Urutan", description: "Urutan 1 tampil sebagai review utama (kartu besar)", defaultValue: 10 }),
        ...bilingual(() => ({
          role: text("Jabatan / bisnis", "mis. Owner, Sarasa Catering"),
          quote: area("Isi review"),
        })),
      },
    }),

    postsId: posts("Blog — Indonesia", "id"),
    postsEn: posts("Blog — English", "en"),
  },

  singletons: {
    hero: page("Hero", "hero", () => ({
      badge: text("Badge", "mis. 'Menerima proyek baru'"),
      kicker: text("Teks kecil di atas judul"),
      line1: text("Judul baris 1"),
      line2: text("Judul baris 2"),
      words: list("Kata berganti (animasi)", "Kata"),
      sub: area("Sub-judul"),
      ctaPrimary: text("Tombol utama"),
      ctaSecondary: text("Tombol kedua"),
      ctaSecondaryNote: text("Catatan tombol kedua", "mis. '· mulai Rp 2jt'"),
      guaranteeTitle: text("Kartu melayang 1 — judul"),
      guaranteeText: text("Kartu melayang 1 — teks"),
      ratingTitle: text("Kartu melayang 2 — judul"),
      ratingText: text("Kartu melayang 2 — teks"),
      marquee: list("Teks berjalan", "Teks"),
    })),
    work: page("Section: Karya", "work", () => ({
      ...heading(),
      titleB: text("Judul (lanjutan)"),
      text: area("Deskripsi"),
    })),
    services: page("Section: Layanan", "services", () => ({
      ...heading(),
      text: area("Deskripsi"),
      items: fields.array(fields.object({ title: text("Judul"), text: area("Deskripsi") }), {
        label: "Daftar layanan",
        itemLabel: (p) => p.fields.title.value || "Layanan",
      }),
      processLabel: text("Proses — label kecil"),
      processTitleA: text("Proses — judul"),
      processTitleEm: text("Proses — judul (miring)"),
      steps: fields.array(fields.object({ title: text("Judul"), text: area("Deskripsi") }), {
        label: "Langkah proses",
        itemLabel: (p) => p.fields.title.value || "Langkah",
      }),
    })),
    reviewsSection: page("Section: Review", "reviews", () => ({
      ...heading(),
      text: area("Deskripsi"),
    })),
    pricing: page("Section: Harga", "pricing", () => ({
      ...heading(),
      text: area("Deskripsi"),
      included: list("Termasuk di semua paket", "Fitur"),
      tiers: fields.array(
        fields.object({
          name: text("Nama paket"),
          price: text("Harga", "mis. 2jt / 3,5jt (ID) atau 2M / 3.5M (EN)"),
          tagline: area("Tagline"),
          timeline: text("Lama pengerjaan"),
          renewal: text("Biaya perpanjangan"),
          featured: fields.checkbox({ label: "Paling populer (kartu gelap)", defaultValue: false }),
          features: list("Fitur", "Fitur"),
        }),
        { label: "Paket", itemLabel: (p) => `${p.fields.name.value} — ${p.fields.price.value}` },
      ),
      customTitle: text("Strip custom — judul"),
      customText: area("Strip custom — teks"),
      customCta: text("Strip custom — tombol"),
    })),
    faq: page("Section: FAQ", "faq", () => ({
      ...heading(),
      items: fields.array(fields.object({ q: text("Pertanyaan"), a: area("Jawaban") }), {
        label: "Pertanyaan",
        itemLabel: (p) => p.fields.q.value || "Pertanyaan",
      }),
    })),
    cta: page("Section: Ajakan (CTA)", "cta", () => ({
      kicker: text("Label kecil"),
      line1: text("Judul baris 1"),
      line2A: text("Judul baris 2"),
      line2Em: text("Judul baris 2 (miring)"),
      text: area("Deskripsi"),
      button: text("Tombol"),
    })),
    footer: page("Footer", "footer", () => ({
      about: area("Tentang YMS Studio"),
      services: list("Daftar layanan", "Layanan"),
      available: text("Status", "mis. 'Siap untuk proyek baru'"),
    })),
    seo: page("SEO (Google)", "seo", () => ({
      title: text("Judul halaman", "Tampil di tab browser & hasil Google (±60 karakter)"),
      description: area("Deskripsi", "Tampil di hasil Google (±155 karakter)"),
    })),
    whatsapp: page("Pesan WhatsApp", "whatsapp", () => ({
      general: area("Tombol 'Mulai Proyek' (header)"),
      hero: area("Tombol hero"),
      float: area("Tombol WhatsApp melayang"),
      custom: area("Strip web app custom"),
      cta: area("Section CTA"),
      tier: area("Tombol paket harga", "Gunakan {paket} dan {harga}, mis. 'Saya tertarik paket {paket} (mulai Rp {harga})'"),
    })),
    settings: singleton({
      label: "Kontak & Sosial Media",
      path: "content/settings",
      format: { data: "yaml" },
      schema: {
        waNumber: text("Nomor WhatsApp", "Format internasional tanpa + atau spasi, mis. 6283822640883"),
        phoneDisplay: text("Nomor tampil", "mis. +62 838-2264-0883"),
        email: text("Email"),
        instagram: fields.url({ label: "Instagram URL" }),
        facebook: fields.url({ label: "Facebook URL" }),
      },
    }),
  },
})
