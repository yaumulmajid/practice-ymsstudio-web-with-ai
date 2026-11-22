// /robots.txt — one rule set for every crawler (a separate Googlebot group would make
// Google ignore the "*" rules, which is what the old static file did).
import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/media/"],
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
