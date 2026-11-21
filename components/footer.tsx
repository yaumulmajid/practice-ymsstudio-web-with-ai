import { ArrowUpRight, Facebook, Instagram, Mail, MessageCircle } from "lucide-react"
import { Logo } from "@/components/header"

const socials = [
  { label: "WhatsApp", href: "https://wa.me/6283822640883", icon: MessageCircle },
  { label: "Instagram", href: "https://www.instagram.com/ymsstudios/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/ymsstudio.web/", icon: Facebook },
  { label: "Email", href: "mailto:info@ymsstudio.id", icon: Mail },
]

const serviceLinks = ["Website WordPress", "Toko Online / E-Commerce", "Company Profile", "Custom Development"]

const navLinks = [
  { name: "Beranda", href: "#home" },
  { name: "Layanan", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Harga", href: "#pricing" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative overflow-hidden pt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/55">
              Jasa pembuatan website profesional untuk UMKM dan bisnis. Spesialis WordPress & Custom Development dengan
              harga terjangkau dan hasil maksimal.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/[0.08] text-ink/60 transition-all duration-500 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">Layanan</h4>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a href="#services" className="text-sm text-ink/70 transition-colors duration-300 hover:text-brand">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">Navigasi</h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-ink/70 transition-colors duration-300 hover:text-brand">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">Hubungi</h4>
            <a
              href="https://wa.me/6283822640883"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              +62 838-2264-0883
              <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink/55">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-soft absolute h-2 w-2 rounded-full bg-emerald-500" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Siap untuk proyek baru
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-ink/[0.07] py-8 text-xs text-ink/45 md:flex-row">
          <p>© {year} YMS Web Studio. Semua hak dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-ink">
              Kebijakan Privasi
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Syarat Layanan
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-center font-semibold leading-[0.75] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(14,17,19,0.08)] [font-size:clamp(5rem,22vw,20rem)]"
      >
        YMS<span className="font-serif font-normal italic">studio</span>
      </div>
    </footer>
  )
}
