// URL scheme: "/" + "/blog/..." are Indonesian, "/en/..." is English.
// Internally every public page lives under app/(frontend)/[lang], so Indonesian
// requests are rewritten to /id/... (the address bar keeps the clean URL).
import { NextResponse, type NextRequest } from "next/server"

const hasLangPrefix = (path: string) => /^\/(id|en)(\/|$)/.test(path)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  // One canonical host: www.ymsstudio.id → ymsstudio.id (301). Needs nginx to pass the Host header.
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? ""
  if (host.startsWith("www.")) {
    return NextResponse.redirect(`https://${host.slice(4)}${pathname}${request.nextUrl.search}`, 301)
  }
  // Already language-prefixed: /en/... (public) or /id/... (our own rewrite — the proxy can
  // run again for it, so it must not redirect; canonical tags point to the clean URL).
  if (hasLangPrefix(pathname)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/id${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip the CMS (/admin, /api), Next internals and files (sitemap.xml, robots.txt, images...).
  matcher: ["/((?!admin|api|_next|.*\\..*).*)"],
}
