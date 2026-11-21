import type React from "react"
import type { Metadata } from "next"
import { keystaticReady } from "@/lib/keystatic-env"

// The CMS admin (/keystatic) has its own root layout, separate from the site.
export const metadata: Metadata = {
  title: "CMS · YMS Studio",
  robots: { index: false, follow: false },
}
// Env vars are checked per request (they live on the server, not in the image).
export const dynamic = "force-dynamic"

export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body style={{ margin: 0 }}>
        {keystaticReady() ? (
          children
        ) : (
          <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "15vh auto", padding: 24, color: "#0b1220", lineHeight: 1.6 }}>
            <h1 style={{ fontSize: 22 }}>CMS belum dikonfigurasi</h1>
            <p>
              Isi <code>KEYSTATIC_GITHUB_CLIENT_ID</code>, <code>KEYSTATIC_GITHUB_CLIENT_SECRET</code>, dan <code>KEYSTATIC_SECRET</code> sebagai
              GitHub Secrets, lalu jalankan ulang deploy. Panduan lengkap: <code>docs/CMS.md</code>.
            </p>
          </main>
        )}
      </body>
    </html>
  )
}
