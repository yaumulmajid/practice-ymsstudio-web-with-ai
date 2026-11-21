// 404 for URLs that match no route at all (e.g. a missing file). Rendered without any
// layout, so it brings its own <html> and styles.
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 — Halaman tidak ditemukan | YMS Studio",
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <html lang="id">
      <body className="antialiased">
        <main className="grid min-h-screen place-items-center px-5 text-center" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
          <div>
            <p className="text-7xl italic text-brand" style={{ fontFamily: "Georgia, serif" }}>
              404
            </p>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink">Halaman tidak ditemukan</h1>
            <p className="mt-2 text-ink/55">Page not found.</p>
            <a href="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-white">
              YMS Studio
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
