import type { MetadataRoute } from "next"
import { LOCALES } from "@/locales/constants"
import { LEGAL_SEGMENT, localizedPath, siteConfig } from "@/lib/site-config"

function alternatesFor(segment?: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${siteConfig.url}${localizedPath(siteConfig.defaultLocale, segment)}`,
  }
  for (const locale of LOCALES) {
    languages[locale] = `${siteConfig.url}${localizedPath(locale, segment)}`
  }
  return languages
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homeLanguages = alternatesFor()
  const legalLanguages = alternatesFor(LEGAL_SEGMENT)
  const lastModified = new Date()

  return [
    ...LOCALES.map((locale) => ({
      url: `${siteConfig.url}${localizedPath(locale)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: locale === siteConfig.defaultLocale ? 1 : 0.9,
      alternates: { languages: homeLanguages },
    })),
    ...LOCALES.map((locale) => ({
      url: `${siteConfig.url}${localizedPath(locale, LEGAL_SEGMENT)}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: legalLanguages },
    })),
  ]
}
