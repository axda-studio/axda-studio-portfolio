import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import type { Metadata } from "next"
import { LOCALES } from "@/locales/constants"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { I18nProviderClient } from "@/locales/client"
import { cn } from "@/lib/utils"
import { OG_LOCALE_MAP, localizedPath, siteConfig } from "@/lib/site-config"
import { buildStructuredData } from "@/lib/structured-data"
import enSeo from "@/locales/en/seo"
import frSeo from "@/locales/fr/seo"
import esSeo from "@/locales/es/seo"
import enA11y from "@/locales/en/a11y"
import frA11y from "@/locales/fr/a11y"
import esA11y from "@/locales/es/a11y"

const A11Y_BY_LOCALE = { en: enA11y, fr: frA11y, es: esA11y } as const

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500"],
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: "400",
  style: "italic",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: "400",
})

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
    metadataBase: new URL(siteConfig.url),
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
        es: "/es",
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
        "antialiased",
        geist.variable,
        "font-sans",
        instrumentSerif.variable,
        jetBrainsMono.variable,
        "selection:bg-primary selection:text-white"
      )}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only rounded-md bg-foreground px-4 py-2 font-medium text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:z-[100] focus:-translate-x-1/2 focus:outline-2 focus:outline-offset-2 focus:outline-ring"
        >
          {a11y.skipToContent}
        </a>
        <ThemeProvider>
          <MotionProvider>
            <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
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
