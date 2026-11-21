"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { ArrowUpRight, X } from "lucide-react"
import { Eyebrow, Reveal, waLink } from "@/components/motion"

const projects = [
  {
    id: 1,
    title: "Catering Online Platform",
    category: "E-Commerce",
    tags: ["WordPress", "WooCommerce", "Elementor"],
    type: "Pribadi",
    description: "Website catering online dengan fitur pemesanan dan pembayaran.",
    detailDescription:
      "Website catering yang memudahkan pelanggan memesan makanan untuk berbagai kebutuhan. Menyediakan katalog menu, sistem pemesanan otomatis, perhitungan harga langsung, pilihan paket, dan pembayaran online.",
    image: "/project-4.webp",
  },
  {
    id: 2,
    title: "Donut Shop Website",
    category: "E-Commerce",
    tags: ["WordPress", "WooCommerce", "CSS"],
    type: "Pribadi",
    description: "Website toko donut dengan tampilan simple dan menarik.",
    detailDescription:
      "Website toko donut yang menampilkan berbagai varian rasa, dilengkapi keranjang belanja, fitur pre-order, dan pemantauan pesanan. Dibuat dengan tampilan yang ringan dan mudah digunakan.",
    image: "/project-5.webp",
  },
  {
    id: 3,
    title: "Custom Web APP IKK LAN RI",
    category: "Web App",
    tags: ["Java", "Spring Boot", "Vue.js"],
    type: "Tim",
    description: "Aplikasi web instansi pemerintah dengan pengelolaan data lengkap.",
    detailDescription:
      "Aplikasi untuk IKK LAN RI dengan fitur registrasi pengguna, upload/download data, optimalisasi query, serta pembaruan tampilan agar lebih modern. Backend menggunakan Spring Boot dan frontend menggunakan Vue.js.",
    image: "/project-3.webp",
  },
  {
    id: 4,
    title: "Platform Reservasi Place",
    category: "Landing Page",
    tags: ["WordPress"],
    type: "Pribadi",
    description: "Website reservasi tempat dengan sistem booking online.",
    detailDescription:
      "Platform pemesanan tempat yang dilengkapi kalender ketersediaan, notifikasi otomatis, dan manajemen reservasi. Memudahkan pengguna dalam mem-booking lokasi secara online.",
    image: "/project-1.webp",
  },
  {
    id: 5,
    title: "AC Service Company Profile",
    category: "Company Profile",
    tags: ["WordPress", "Elementor", "CSS"],
    type: "Pribadi",
    description: "Website company profile layanan AC dengan tampilan modern.",
    detailDescription:
      "Company profile untuk jasa service AC dengan desain bersih dan informatif. Tersedia fitur booking online, daftar paket layanan, rating pelanggan, dan kontak via WhatsApp/telepon.",
    image: "/project-2.webp",
  },
  {
    id: 6,
    title: "Real Estate Property Listing",
    category: "Property Listing",
    tags: ["WordPress", "Elementor", "Advanced Custom Fields"],
    type: "Pribadi",
    description: "Website listing properti dengan fitur pencarian lengkap.",
    detailDescription:
      "Portal properti yang menampilkan berbagai listing rumah dan apartemen. Dilengkapi pencarian berdasarkan lokasi, harga, serta formulir untuk menghubungi agen secara langsung.",
    image: "/project-6.webp",
  },
]

type Project = (typeof projects)[number]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return createPortal(
    <div
      className="animate-in fade-in fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-md duration-300 sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="animate-in slide-in-from-bottom-8 fade-in relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl duration-500 sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink backdrop-blur transition-transform duration-500 hover:rotate-90"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        <div className="relative aspect-[16/10] bg-brand-soft">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover object-top"
            quality={85}
          />
        </div>

        <div className="p-6 sm:p-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand">
            {project.category} · {project.type}
          </p>
          <h2 id="modal-title" className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {project.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">{project.detailDescription}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/70">
                {tag}
              </span>
            ))}
          </div>

          <a
            href={waLink(`Halo, saya tertarik dengan project "${project.title}". Bisa dibuatkan yang serupa?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors duration-500 hover:bg-brand-deep"
          >
            Buat website seperti ini
            <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="portfolio" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Reveal>
              <Eyebrow index="02">Portfolio</Eyebrow>
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink md:text-5xl">
              Proyek <em className="font-serif font-normal italic text-brand">unggulan</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={160} className="max-w-md text-base leading-relaxed text-ink/55 md:justify-self-end">
            Beberapa website pilihan yang sudah dikerjakan untuk berbagai bisnis.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 110}>
              <button
                type="button"
                onClick={() => setSelected(project)}
                className="group block w-full text-left"
                aria-label={`Lihat detail ${project.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-soft">
                  <div className="absolute inset-x-6 bottom-0 top-8 overflow-hidden rounded-t-xl shadow-[0_20px_50px_-20px_rgba(14,17,19,0.35)] transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.03]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 360px"
                      className="object-cover object-top"
                      quality={75}
                    />
                  </div>
                  <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-ink/70 backdrop-blur">
                    {project.category}
                  </span>
                  <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-ink text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-ink">{project.title}</h3>
                    <p className="mt-1 text-sm text-ink/50">{project.description}</p>
                  </div>
                  <span className="shrink-0 text-xs text-ink/40">{project.type}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
