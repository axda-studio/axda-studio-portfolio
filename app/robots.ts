import type { MetadataRoute } from "next"
import { getBaseUrl, isProductionDeployment } from "@/lib/base-url"

export default function robots(): MetadataRoute.Robots {
  // A preview deployment is the same site on another host, so an indexed one
  // would compete with the real domain. Vercel already sends `X-Robots-Tag:
  // noindex` on previews; this states it again for crawlers that only read
  // robots.txt. No `sitemap`/`host` here either — both would advertise a
  // throwaway hostname.
  if (!isProductionDeployment()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] }
  }

  const baseUrl = getBaseUrl()

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/ingest/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
