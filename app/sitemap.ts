import type { MetadataRoute } from "next"
import { LOCALES } from "@/locales/constants"
import { localizedPath, siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {
    "x-default": `${siteConfig.url}${localizedPath(siteConfig.defaultLocale)}`,
  }
  for (const locale of LOCALES) {
    languages[locale] = `${siteConfig.url}${localizedPath(locale)}`
  }

  return LOCALES.map((locale) => ({
    url: `${siteConfig.url}${localizedPath(locale)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === siteConfig.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }))
}
