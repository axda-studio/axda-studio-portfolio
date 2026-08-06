import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { cookies, headers } from "next/headers"
import { ArrowLeft } from "lucide-react"

import "./globals.css"
import { LOCALES } from "@/locales/constants"
import { LEGAL_SEGMENT, localizedPath, siteConfig } from "@/lib/site-config"
import { fontClassNames } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import enErrors from "@/locales/en/errors"
import frErrors from "@/locales/fr/errors"
import esErrors from "@/locales/es/errors"
import enFooter from "@/locales/en/footer"
import frFooter from "@/locales/fr/footer"
import esFooter from "@/locales/es/footer"

const ERRORS_BY_LOCALE = { en: enErrors, fr: frErrors, es: esErrors } as const
const FOOTER_BY_LOCALE = { en: enFooter, fr: frFooter, es: esFooter } as const
type Locale = (typeof LOCALES)[number]

/**
 * Next serves this from its own `/_not-found` route for every unmatched URL,
 * which is what makes the response a real 404 rather than a soft 200. The cost
 * is that it renders *outside* `[locale]/layout.tsx`, so it owns its <html>,
 * its fonts, its theme and its copy — none of the providers that layout sets up
 * are available here, including the i18n one. Hence the direct locale imports,
 * mirroring the pattern in `[locale]/layout.tsx` and `legal/page.tsx`.
 */
async function resolveLocale(): Promise<Locale> {
  // The i18n proxy sets the header on every request it matches and the cookie
  // once a visitor has picked a language; the header is the more reliable of
  // the two on a first visit.
  const [requestHeaders, requestCookies] = await Promise.all([
    headers(),
    cookies(),
  ])
  const raw =
    requestHeaders.get("X-Next-Locale") ??
    requestCookies.get("Next-Locale")?.value ??
    ""

  return (LOCALES as readonly string[]).includes(raw)
    ? (raw as Locale)
    : (siteConfig.defaultLocale as Locale)
}

/**
 * Static, and in the default locale: a `generateMetadata` that read the request
 * would make this route's metadata dynamic while its shell stays static, which
 * `cacheComponents` rejects outright. `noindex` is belt-and-braces — the route
 * already answers 404 — and matters because the copy is not localized here.
 */
export const metadata: Metadata = {
  title: enErrors.notFound.meta.title,
  description: enErrors.notFound.meta.description,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <html
      // Static, because `cacheComponents` forbids the document shell from
      // blocking on request data — the visitor's actual language is only
      // knowable inside the Suspense boundary below, and is declared there on
      // the content wrapper (WCAG 3.1.2) rather than here.
      lang={siteConfig.defaultLocale}
      suppressHydrationWarning
      className={cn(
        ...fontClassNames,
        "selection:bg-primary selection:text-white"
      )}
    >
      <body>
        <ThemeProvider>
          {/* No skeleton: resolving the locale is a header lookup with no I/O,
              so a fallback would flash rather than inform. */}
          <Suspense fallback={null}>
            <LocalizedNotFound />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}

async function LocalizedNotFound() {
  const locale = await resolveLocale()
  const { notFound: t } = ERRORS_BY_LOCALE[locale]
  const footer = FOOTER_BY_LOCALE[locale]
  const year = new Date().getFullYear()

  return (
    <div lang={locale} className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Logo variant="mobile" />
      </header>

      <main
        id="main-content"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16"
      >
        <p className="text-mono-up text-primary">{t.eyebrow}</p>
        <h1 className="mt-4 text-hero">
          {t.title}{" "}
          <span className="font-serif font-normal text-primary italic">
            {t.emphasis}
          </span>
        </h1>
        <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {t.body}
        </p>

        <div className="mt-10">
          <Button
            asChild
            size="lg"
            // Matches the hero and banner CTAs: the `default` variant's
            // white on --primary only reaches 3.53:1, failing WCAG AA at
            // this text size.
            className="rounded-full bg-foreground px-4 text-background hover:bg-foreground/90"
          >
            <Link
              href={localizedPath(locale)}
              data-testid="not-found-home-link"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {t.backToHome}
            </Link>
          </Button>
        </div>
      </main>

      {/* `<Footer />` resolves the locale through next-international, which
          calls notFound() when it finds none — recursing inside a not-found
          boundary. This inlines the one link French law wants on every page. */}
      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-xs text-muted-foreground">
        <span>
          {footer.copyright} — {year}
        </span>
        <Link
          href={localizedPath(locale, LEGAL_SEGMENT)}
          data-testid="not-found-legal-link"
          className="transition-colors hover:text-foreground"
        >
          {footer.legal}
        </Link>
      </footer>
    </div>
  )
}
