"use client"

import { ArrowRight, Check } from "lucide-react"
import { Eyebrow, Reveal, waLink } from "@/components/motion"

const pricingTiers = [
  {
    name: "Basic",
    price: "799rb",
    description: "Cocok untuk personal brand, portofolio, dan usaha kecil",
    features: [
      "1 Halaman (Landing Page)",
      "Desain Standar (Template Premium Disesuaikan Brand)",
      "Custom Domain (.web.id / .my.id - opsional)",
      "Akses WordPress Admin",
      "Mobile Friendly",
      "WhatsApp Chat Integration",
      "Optimasi Dasar SEO (Yoast SEO Setup)",
      "Keamanan Dasar (SSL + Anti Spam)",
    ],
    note: "Tahun berikutnya 500rb",
  },
  {
    name: "Premium",
    price: "1,25jt",
    description: "Pilihan populer untuk bisnis yang ingin tampil profesional",
    features: [
      "3 - 5 Halaman (Home, Tentang, Layanan, Galeri, Kontak)",
      "Desain Kustom Premium (Sesuai Identitas Bisnis)",
      "Custom Domain (.com)",
      "Akses WordPress Admin",
      "Mobile Friendly & Cepat Diakses",
      "Email Bisnis (1 Akun)",
      "WhatsApp Chat Integration",
      "Optimasi SEO Lengkap (Yoast Pro Setup + Metadata)",
      "Google Analytics & Search Console Setup",
      "Backup Otomatis Mingguan",
      "2x Revisi Desain",
    ],
    note: "Tahun berikutnya 700rb",
    featured: true,
  },
  {
    name: "Toko Online",
    price: "2,55jt",
    description: "Solusi lengkap untuk bisnis e-commerce dan UMKM",
    features: [
      "10+ Halaman (Home, Produk, Detail, Checkout, Kontak, dll.)",
      "Desain Responsif & User-Friendly (Custom UI/UX)",
      "WooCommerce Setup",
      "Fitur Add to Cart / Order via WhatsApp",
      "Integrasi Payment Gateway (Midtrans, Xendit, Doku, dll.)",
      "Custom Domain (.com)",
      "Hosting Pribadi 25GB",
      "Full Admin Access",
      "Email Bisnis (1 Akun)",
      "Optimasi SEO Produk",
      "Google Analytics + Meta Pixel Integration",
      "Backup Otomatis Harian",
      "Panduan & Tutorial Kelola Website",
      "3x Revisi Desain",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" tabIndex={-1} className="relative py-24 outline-none md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow index="03">Harga</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={80} className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink md:text-5xl">
            Paket jasa <em className="font-serif font-normal italic text-brand">website</em>
          </Reveal>
          <Reveal as="p" delay={160} className="mt-5 text-base leading-relaxed text-ink/55">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Semua paket dapat disesuaikan dengan kebutuhan
            spesifik.
          </Reveal>
        </div>

        <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => {
            const dark = tier.featured
            return (
              <Reveal key={tier.name} delay={i * 120} className="h-full">
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] p-8 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 ${
                    dark
                      ? "bg-ink text-white shadow-[0_40px_80px_-30px_rgba(14,17,19,0.6)]"
                      : "border border-ink/[0.07] bg-white text-ink hover:shadow-[0_30px_60px_-30px_rgba(14,17,19,0.18)]"
                  }`}
                >
                  {dark && (
                    <div
                      className="animate-drift pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl"
                      aria-hidden="true"
                    />
                  )}

                  <div className="relative flex items-center justify-between">
                    <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
                    {dark && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
                        Paling Populer
                      </span>
                    )}
                  </div>
                  <p className={`relative mt-2 text-sm ${dark ? "text-white/60" : "text-ink/55"}`}>{tier.description}</p>

                  <div className="relative mt-8 flex items-baseline gap-1.5">
                    <span className={`text-sm ${dark ? "text-white/50" : "text-ink/40"}`}>Rp</span>
                    <span className="text-5xl font-semibold tracking-[-0.04em]">{tier.price}</span>
                  </div>
                  <p className={`relative mt-2 h-4 text-xs ${dark ? "text-white/40" : "text-ink/40"}`}>{tier.note}</p>

                  <a
                    href={waLink(`Halo, saya tertarik dengan paket website ${tier.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn relative mt-8 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all duration-500 ${
                      dark ? "bg-white text-ink hover:bg-brand-soft" : "bg-ink text-white hover:bg-brand-deep"
                    }`}
                  >
                    Pilih Paket
                    <ArrowRight size={15} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
                  </a>

                  <div className={`relative my-8 h-px ${dark ? "bg-white/10" : "bg-ink/[0.07]"}`} />

                  <ul className="relative space-y-3.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                            dark ? "bg-brand text-white" : "bg-brand-soft text-brand"
                          }`}
                        >
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span className={`text-sm leading-snug ${dark ? "text-white/75" : "text-ink/65"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
