import { LOCALES } from "@/locales/constants"

export const siteConfig = {
  url: "https://axda-studio.fr",
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
} as const

export const OG_LOCALE_MAP = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
} as const satisfies Record<(typeof LOCALES)[number], string>

export function localizedPath(locale: string): string {
  return `/${locale}`
}
