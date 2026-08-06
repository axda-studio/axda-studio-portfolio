"use client"

import { openConsentPreferences } from "@/lib/consent"
import { MotionHover } from "@/components/motion-hover"
import { useScopedI18n } from "@/locales/client"

interface CookieSettingsButtonProps {
  /** Overridden on /legal, where the footer renders a second instance. */
  testId?: string
}

export function CookieSettingsButton({
  testId = "cookie-settings",
}: CookieSettingsButtonProps) {
  const t = useScopedI18n("cookies")

  return (
    <MotionHover>
      <button
        type="button"
        data-testid={testId}
        onClick={openConsentPreferences}
        className="cursor-pointer transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {t("settings")}
      </button>
    </MotionHover>
  )
}
