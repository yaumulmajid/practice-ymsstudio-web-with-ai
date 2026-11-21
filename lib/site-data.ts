// Language-independent data. Text for each language lives in lib/i18n.ts
// (work.projects[i] holds the title/category/description for projects[i]).

export const WA_NUMBER = "6283822640883"
export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

export type Project = {
  client: string
  url: string
  image: string
  tags: string[]
}

export const projects: Project[] = [
  { client: "Sarasa", url: "https://sarasa.id", image: "/project-4.webp", tags: ["WordPress", "WooCommerce", "Payment Gateway"] },
  { client: "Haris Jaya", url: "https://harisjayaservice.com", image: "/project-2.webp", tags: ["WordPress", "Elementor", "Lead Generation"] },
  { client: "LAN RI", url: "https://ikk.lan.go.id", image: "/project-3.webp", tags: ["Spring Boot", "Vue.js", "PostgreSQL"] },
  { client: "Ibrahima Place", url: "https://ibrahimaplace.com", image: "/project-1.webp", tags: ["WordPress", "Booking System"] },
  { client: "The Donut Experiment", url: "https://thedonutexperiment.com", image: "/project-5.webp", tags: ["WordPress", "WooCommerce"] },
  { client: "LoopNet", url: "https://loopnet.com", image: "/project-6.webp", tags: ["WordPress", "ACF", "Search & Filter"] },
]

export const domain = (url: string) => url.replace(/^https?:\/\//, "")
