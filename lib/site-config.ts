import { LOCALES } from "@/locales/constants"

export const siteConfig = {
  // `www` because that is what Vercel actually serves: the apex 308-redirects
  // here. Canonicals, the sitemap and robots must name the host that answers
  // with a 200, or every URL we declare canonical points at a redirect.
  url: "https://www.axda-studio.fr",
  name: "Axda Studio",
  legalName: "Axda Studio®",
  tagline: "Pixels with a backbone.",
  author: {
    name: "Alyx Darenne",
    givenName: "Alyx",
    familyName: "Darenne",
    jobTitle: "Frontend Developer",
    email: "hello@axda-studio.fr",
    location: "EU · Remote",
    languages: ["en", "fr"],
  },
  socials: {
    github: "https://github.com/axda-studio",
    linkedin: "https://www.linkedin.com/in/alyx-darenne",
    calendar: "https://calendar.app.google/VEmfweYv5o8gjiva6",
  },
  themeColor: "#a1553a",
  locales: LOCALES,
  defaultLocale: "en",
  legal: {
    publisher: {
      entity: "Axda Studio",
      form: "Entreprise individuelle (EI)",
      registration: "100 278 738",
      address: "862 Route du Villard - 74410 Saint-Jorioz, France",
      director: "Alyx Darenne",
      email: "hello@axda-studio.fr",
    },
    host: {
      entity: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, United States",
      url: "https://vercel.com",
    },
    analytics: {
      processor: "PostHog, Inc.",
      region: "EU Cloud",
      // Not a PostHog setting — event retention is fixed by the plan: 1 year on
      // free, 7 years on any paid plan. 12 is only true while we stay on free, so
      // revisit this and legal.retention.body if the plan changes.
      // Session replay retention is separate and *is* configurable, at
      // eu.posthog.com/settings/project-replay#replay-retention (30d max on free).
      retentionMonths: 12,
      cookieMonths: 12,
      // This one *is* a project setting, and the free plan caps it at 30 days:
      // eu.posthog.com/settings/project-replay#replay-retention
      replayRetentionDays: 30,
    },
    consentValidityMonths: 6,
    updatedAt: "2026-08-05",
    authority: {
      name: "CNIL",
      address: "3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, France",
      url: "https://www.cnil.fr",
    },
  },
} as const

export const OG_LOCALE_MAP = {
  en: "en_US",
  fr: "fr_FR",
  // es: "es_ES",
} as const satisfies Record<(typeof LOCALES)[number], string>

/**
 * `www.` is a serving detail, not part of the brand. Strip it whenever the
 * hostname is being matched or shown, so the apex and the www form are treated
 * as the same site and neither leaks into copy.
 */
export function bareHostname(hostname: string): string {
  return hostname.replace(/^www\./, "")
}

/** The domain as it should be *read* — OG images, prose — never as it is served. */
export const DISPLAY_HOSTNAME = bareHostname(new URL(siteConfig.url).hostname)

export function localizedPath(locale: string, segment?: string): string {
  return segment ? `/${locale}/${segment}` : `/${locale}`
}

export const LEGAL_SEGMENT = "legal" as const
