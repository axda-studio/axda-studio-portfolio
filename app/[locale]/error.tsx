"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCw } from "lucide-react"
import posthog from "posthog-js"

import { useScopedI18n } from "@/locales/client"
import { Logo } from "@/components/logo"
import { ThemeSelector } from "@/components/theme-selector"
import { Button } from "@/components/ui/button"

/**
 * Catches anything thrown while rendering a page under `[locale]`. It replaces
 * `children` inside `[locale]/layout.tsx`, so the fonts, theme and i18n
 * provider are still in place — but `<Footer />` is not usable here, because a
 * client boundary cannot render an async server component.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useScopedI18n("errors")

  useEffect(() => {
    // `capture_exceptions` in instrumentation-client only sees errors that
    // reach window.onerror, and React swallows anything a boundary catches —
    // so report it explicitly. Dropped client-side when analytics is refused,
    // since PostHog is opted out until then.
    posthog.captureException(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Logo variant="mobile" />
        <ThemeSelector />
      </header>

      <main
        id="main-content"
        className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center overflow-hidden px-4 py-16"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-[-2vw] hidden -translate-y-1/2 font-serif text-[16rem] leading-none text-primary/10 italic select-none lg:block xl:text-[20rem]"
        >
          500
        </span>

        <p className="relative z-10 text-mono-up text-primary">
          {t("boundary.eyebrow")}
        </p>
        <h1 className="relative z-10 mt-4 text-hero">
          {t("boundary.title")}{" "}
          <span className="font-serif font-normal text-primary italic">
            {t("boundary.emphasis")}
          </span>
        </h1>
        <p className="relative z-10 mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {t("boundary.body")}
        </p>

        {/* The digest is the only handle that ties this screen to the reported
            exception, so it is worth surfacing even though it means nothing to
            most visitors. */}
        {error.digest && (
          <p className="relative z-10 mt-4 font-mono text-tiny tracking-wider text-muted-foreground uppercase">
            {error.digest}
          </p>
        )}

        <div className="relative z-10 mt-10 flex flex-wrap items-center gap-2">
          <Button
            size="lg"
            onClick={reset}
            data-testid="error-retry"
            className="rounded-full bg-foreground px-4 text-background hover:bg-foreground/90"
          >
            <RotateCw size={16} aria-hidden="true" />
            {t("boundary.retry")}
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-4"
          >
            <Link href="/">
              <ArrowLeft size={16} aria-hidden="true" />
              {t("boundary.backToHome")}
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
