"use client"

import {
  useCurrentLocale,
  useChangeLocale,
  useScopedI18n,
} from "@/locales/client"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import posthog from "posthog-js"

export function LocaleSelector() {
  const locale = useCurrentLocale()
  const changeLocale = useChangeLocale({ preserveSearchParams: true })
  const t = useScopedI18n("common.localeSelector")

  const handleLocaleClick = () => {
    let nextLocale: string
    switch (locale) {
      case "en":
        nextLocale = "fr"
        break
      case "fr":
        nextLocale = "es"
        break
      case "es":
        nextLocale = "en"
        break
      default:
        nextLocale = "en"
    }
    posthog.capture("locale_changed", { from: locale, to: nextLocale })
    changeLocale(nextLocale as "en" | "fr" | "es")
  }

  return (
    <Button
      data-testid="locale-selector"
      className="group rounded-full border border-border bg-transparent"
      onClick={handleLocaleClick}
    >
      <Globe
        size={20}
        className="text-foreground transition-transform duration-1000 group-hover:rotate-y-180"
      />
      <span className="text-foreground">{t(`options.${locale}`)}</span>
    </Button>
  )
}
