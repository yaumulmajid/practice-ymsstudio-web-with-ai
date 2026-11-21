import HomePage from "@/components/home-page"
import { getSite } from "@/lib/content"
import type { Lang } from "@/lib/i18n"
import { buildStructuredData } from "@/lib/seo"

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  // FAQPage markup only here, where the FAQ is visible.
  const faq = buildStructuredData(await getSite(lang as Lang)).faq
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <HomePage />
    </>
  )
}
