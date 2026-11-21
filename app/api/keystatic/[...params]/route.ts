// Keystatic API (GitHub OAuth + local-mode file access).
//
// Two production details handled here instead of using makeRouteHandler directly:
//  1. The handler is created lazily: Keystatic throws at import time when the
//     GitHub credentials are missing, which would otherwise break `next build`.
//  2. Behind nginx the app sees http://127.0.0.1:3000; GitHub's OAuth redirect
//     must use the public https origin, so the request URL is rewritten.
import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic"
import config from "@/keystatic.config"
import { keystaticReady } from "@/lib/keystatic-env"

export const dynamic = "force-dynamic"

let handler: ReturnType<typeof makeGenericAPIRouteHandler> | undefined

async function publicRequest(request: Request) {
  const url = new URL(request.url)
  if (process.env.NODE_ENV === "development") {
    // GitHub Apps only accept 127.0.0.1 (not localhost) as a local callback.
    if (url.hostname === "localhost") url.hostname = "127.0.0.1"
  } else {
    const site = new URL(process.env.SITE_URL || "https://ymsstudio.id")
    url.protocol = site.protocol
    url.hostname = site.hostname
    url.port = site.port
  }
  if (url.toString() === request.url) return request
  const hasBody = request.method !== "GET" && request.method !== "HEAD"
  return new Request(url, { method: request.method, headers: request.headers, body: hasBody ? await request.arrayBuffer() : undefined })
}

async function handle(request: Request) {
  if (!keystaticReady()) return new Response("CMS is not configured", { status: 503 })
  handler ??= makeGenericAPIRouteHandler({ config }, { slugEnvName: "NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG" })
  const { body, headers, status } = await handler(await publicRequest(request))
  return new Response(body as BodyInit | null, { status, headers })
}

export { handle as GET, handle as POST }
