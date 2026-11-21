import HomePage from "@/components/home-page"
import { getSite } from "@/lib/content"
import { buildStructuredData } from "@/lib/seo"

export default async function Home() {
  const faq = buildStructuredData(await getSite("en")).faq
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <HomePage />
    </>
  )
}
