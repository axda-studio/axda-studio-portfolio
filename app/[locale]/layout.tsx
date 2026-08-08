import { Suspense } from "react"
import type { Metadata } from "next"
import { LOCALES } from "@/locales/constants"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { CookieConsent } from "@/components/cookie-consent"
import { I18nProviderClient } from "@/locales/client"
import { cn } from "@/lib/utils"
import { fontClassNames } from "@/lib/fonts"
import { getBaseUrl } from "@/lib/base-url"
import { OG_LOCALE_MAP, localizedPath, siteConfig } from "@/lib/site-config"
import { buildStructuredData } from "@/lib/structured-data"
import enSeo from "@/locales/en/seo"
import frSeo from "@/locales/fr/seo"
import esSeo from "@/locales/es/seo"
import enA11y from "@/locales/en/a11y"
import frA11y from "@/locales/fr/a11y"
import esA11y from "@/locales/es/a11y"

const A11Y_BY_LOCALE = { en: enA11y, fr: frA11y, es: esA11y } as const

const SEO_BY_LOCALE = { en: enSeo, fr: frSeo, es: esSeo } as const
type Locale = (typeof LOCALES)[number]

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

function toLocale(value: string): Locale {
  return (LOCALES as readonly string[]).includes(value)
    ? (value as Locale)
    : (siteConfig.defaultLocale as Locale)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = toLocale(raw)
  const seo = SEO_BY_LOCALE[locale]
  const path = localizedPath(locale)

  return {
    // Every relative URL below (canonical, og:url, the OG image) resolves
    // against this. On a preview it has to be the preview's own host, or a
    // shared link advertises production URLs it did not actually render.
    metadataBase: new URL(getBaseUrl()),
    title: { default: seo.title, template: `%s | ${siteConfig.name}` },
    description: seo.description,
    keywords: [...seo.keywords],
    applicationName: siteConfig.name,
    authors: [
      { name: siteConfig.author.name, url: siteConfig.socials.linkedin },
    ],
    creator: siteConfig.author.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        fr: "/fr",
        // es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "profile",
      url: path,
      siteName: siteConfig.name,
      title: seo.title,
      description: seo.description,
      locale: OG_LOCALE_MAP[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE_MAP[l]
      ),
      firstName: siteConfig.author.givenName,
      lastName: siteConfig.author.familyName,
      username: "axda-studio",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
  }
}

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>
  children: React.ReactNode
}>) {
  const { locale: raw } = await params
  const locale = toLocale(raw)
  const a11y = A11Y_BY_LOCALE[locale]
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        ...fontClassNames,
        "selection:bg-primary selection:text-white"
      )}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only rounded-md bg-foreground px-4 py-2 font-medium text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:z-100 focus:-translate-x-1/2 focus:outline-2 focus:outline-offset-2 focus:outline-ring"
        >
          {a11y.skipToContent}
        </a>
        <ThemeProvider>
          <MotionProvider>
            <I18nProviderClient locale={locale}>
              {children}
              {/*
                The Suspense boundary is load-bearing, not decorative — without
                it `next build` + `next start` serves a blank page.
                `I18nProviderClient` already wraps this subtree in its own
                Suspense (it awaits `import("./<locale>")`), so the whole app
                streams as nested segments. Adding a sibling that server-renders
                to nothing — which this does, because `useConsent().hydrated` is
                false until the client takes over — made React emit 40
                `$RS("S:n","P:n")` replay instructions but only 39
                `<template id="P:n">` placeholders. `$RS` detaches its source
                node before it dereferences the missing target, so the segment
                holding the entire page was removed from the document and never
                put back: body rendered as just the skip link, no contentful
                paint, and Lighthouse failed with NO_FCP.

                Giving this child its own boundary keeps the placeholder
                accounting correct. Verified via the streamed HTML: 40
                instructions, 40 placeholders. Only affects the streaming
                production build, which is why `next dev` never showed it.
                Seen on: next 16.1.7, react 19.2.6.
              */}
              <Suspense fallback={null}>
                <CookieConsent />
              </Suspense>
            </I18nProviderClient>
          </MotionProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildStructuredData(locale)),
          }}
        />
      </body>
    </html>
  )
}

// TODO: Check FR UI
// TODO: Improve mobile hero (text size, spacing, etc.)
// TODO: Add better avatar pic
