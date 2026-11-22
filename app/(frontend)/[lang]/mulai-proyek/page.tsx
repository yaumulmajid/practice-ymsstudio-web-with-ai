// Old URL of the contact/brief page: permanently redirects to /kontak (keeps ?service=…).
import { notFound, permanentRedirect } from "next/navigation"
import { isLang, localePath, PATHS } from "@/lib/i18n"

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function Page({ params, searchParams }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const service = (await searchParams).service
  const query = typeof service === "string" && service ? `?service=${encodeURIComponent(service)}` : ""
  permanentRedirect(`${localePath(lang, PATHS.brief)}${query}`)
}
