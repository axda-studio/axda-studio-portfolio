"use client"

import { Eclipse, SunDim } from "lucide-react"
import { useTheme } from "next-themes"
import { useScopedI18n } from "@/locales/client"
import posthog from "posthog-js"

import { Button } from "@/components/ui/button"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const t = useScopedI18n("header.themeBtn")

  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    posthog.capture("theme_changed", { from: theme, to: nextTheme })
    setTheme(nextTheme)
  }

  return (
    <Button
      data-testid="theme-selector"
      className="group rounded-full border-border"
      variant="ghost"
      size="icon"
      onClick={handleToggleTheme}
    >
      <SunDim
        data-testid="sun-icon"
        size={20}
        className="scale-100 rotate-0 transition-all group-hover:scale-105 group-hover:rotate-90 dark:scale-0 dark:-rotate-90"
      />
      <Eclipse
        data-testid="moon-icon"
        size={20}
        className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:group-hover:scale-105 dark:group-hover:rotate-90"
      />
      <span className="sr-only">{t("aria")}</span>
    </Button>
  )
}
