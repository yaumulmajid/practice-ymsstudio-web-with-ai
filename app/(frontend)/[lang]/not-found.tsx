import Link from "next/link"

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="font-serif text-7xl italic text-brand">404</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-ink/55">Page not found.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-white">
          YMS Studio
        </Link>
      </div>
    </main>
  )
}
