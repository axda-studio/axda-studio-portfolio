"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { X } from "lucide-react"
import posthog from "posthog-js"

import { useConsent } from "@/hooks/use-consent"
import { LEGAL_SEGMENT, localizedPath } from "@/lib/site-config"
import {
  ACCEPT_ALL,
  CONSENT_OPEN_EVENT,
  REJECT_ALL,
  type ConsentCategories,
} from "@/lib/consent"
import { useCurrentLocale, useScopedI18n } from "@/locales/client"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const slideIn = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
} as const

/**
 * Same treatment as the hero and header CTAs. The `default` variant's white on
 * --primary only reaches 3.53:1, which fails WCAG AA at this text size, so no
 * CTA on the site uses it as-is.
 */
const ACCEPT_BUTTON =
  "rounded-full bg-foreground px-4 text-background hover:bg-foreground/90"

export function CookieConsent() {
  const t = useScopedI18n("cookies")
  const locale = useCurrentLocale()
  const { record, hydrated, save } = useConsent()
  const [reopened, setReopened] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const isOpen = hydrated && (record === null || reopened)
  const isDismissable = record !== null

  // The footer link re-opens the banner straight into preferences mode.
  useEffect(() => {
    const handleOpen = () => {
      setAnalytics(record?.categories.analytics ?? false)
      setShowDetails(true)
      setReopened(true)
    }

    window.addEventListener(CONSENT_OPEN_EVENT, handleOpen)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handleOpen)
  }, [record])

  // Only steal focus when the visitor asked for the panel; doing it on first
  // page load would yank them out of the page they came to read.
  useEffect(() => {
    if (reopened) panelRef.current?.focus()
  }, [reopened])

  const close = useCallback(() => {
    setReopened(false)
    setShowDetails(false)
  }, [])

  useEffect(() => {
    if (!isOpen || !isDismissable) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, isDismissable, close])

  const decide = (categories: ConsentCategories) => {
    save(categories)
    // Dropped by PostHog when analytics is refused, which is the point.
    posthog.capture("cookie_consent_updated", {
      analytics: categories.analytics,
    })
    close()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cookie-consent"
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          data-testid="cookie-consent"
          variants={slideIn}
          initial="hidden"
          animate="show"
          exit="exit"
          // Sits above the fixed mobile nav pill (also bottom-4) until it is
          // hidden at lg, where the banner takes the bottom-left corner.
          className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-md rounded-2xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:inset-x-auto lg:bottom-4 lg:left-4 lg:mx-0"
        >
          <div className="flex items-start justify-between gap-4">
            <p
              id="cookie-consent-title"
              className="font-mono text-xs tracking-wide text-muted-foreground uppercase"
            >
              {t("title")}
            </p>
            {isDismissable && (
              <Button
                size="icon-xs"
                variant="ghost"
                aria-label={t("close")}
                className="-mt-1 -mr-1 text-muted-foreground"
                onClick={close}
              >
                <X aria-hidden="true" />
              </Button>
            )}
          </div>
          <p
            id="cookie-consent-description"
            className="mt-2 text-sm text-foreground"
          >
            {t("description")}{" "}
            <Link
              href={localizedPath(locale, LEGAL_SEGMENT)}
              className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {t("policyLink")}
            </Link>
          </p>

          {showDetails && (
            <ul className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <li className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t("categories.essential.label")}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t("categories.essential.description")}
                  </p>
                </div>
                <span className="mt-0.5 shrink-0 font-mono text-xs text-muted-foreground">
                  {t("categories.essential.alwaysOn")}
                </span>
              </li>
              <li className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t("categories.analytics.label")}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t("categories.analytics.description")}
                  </p>
                </div>
                <Switch
                  checked={analytics}
                  onCheckedChange={setAnalytics}
                  aria-label={t("categories.analytics.label")}
                  className="mt-0.5"
                />
              </li>
            </ul>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {showDetails ? (
              <Button
                size="lg"
                className={ACCEPT_BUTTON}
                onClick={() => decide({ analytics })}
              >
                {t("save")}
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  className={ACCEPT_BUTTON}
                  onClick={() => decide(ACCEPT_ALL)}
                >
                  {t("acceptAll")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-4"
                  onClick={() => decide(REJECT_ALL)}
                >
                  {t("rejectAll")}
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="ml-auto text-muted-foreground"
                  onClick={() => setShowDetails(true)}
                >
                  {t("customize")}
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
