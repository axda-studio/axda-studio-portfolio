import { createI18nMiddleware } from "next-international/middleware"
import { NextRequest } from "next/server"

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr", "es"],
  defaultLocale: "en",
})

export function proxy(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: [
    "/((?!api|ingest|static|.*\\..*|_next|favicon.ico|robots.txt|sitemap.xml|opengraph-image|twitter-image|icon|apple-icon|manifest.webmanifest).*)",
  ],
}
