"use client"

import { useEffect } from "react"
import type { CSSProperties } from "react"
import posthog from "posthog-js"

import "./globals.css"

/**
 * Last resort: catches errors thrown by `[locale]/layout.tsx` itself, which is
 * this app's root layout. Next replaces that layout wholesale here, so this
 * file must render <html>/<body> — and it inherits none of what the layout
 * provides:
 *
 *   - no next/font, hence FONT_FALLBACKS filling the CSS variables the
 *     Tailwind theme reads (an undefined var() would drop to Times);
 *   - no next-themes, hence the inline theme-restore script, so a dark-mode
 *     visitor doesn't get a full-white page that reads as broken;
 *   - no i18n provider, hence the hardcoded English copy. The locale lives in
 *     a layout that, by definition, just failed.
 */

const FONT_FALLBACKS = {
  "--font-sans": "ui-sans-serif, system-ui, sans-serif",
  "--font-serif": "ui-serif, Georgia, serif",
  "--font-mono": "ui-monospace, SFMono-Regular, Menlo, monospace",
} as CSSProperties

// Mirrors next-themes' own pre-paint class toggle. Static literal — nothing
// interpolated into it.
const RESTORE_THEME = `try{var t=localStorage.getItem("theme");if(t==="dark"||((!t||t==="system")&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    posthog.captureException(error)
  }, [error])

  return (
    <html lang="en" suppressHydrationWarning style={FONT_FALLBACKS}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESTORE_THEME }} />
      </head>
      <body className="font-sans antialiased">
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-16">
          <p className="text-mono-up text-primary">Error 500</p>
          <h1 className="mt-4 text-hero">
            Something{" "}
            <span className="font-serif font-normal text-primary italic">
              gave way.
            </span>
          </h1>
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground">
            The site failed to load at its outermost layer. It has been
            reported. Reloading clears most of them.
          </p>

          {error.digest && (
            <p className="mt-4 font-mono text-tiny tracking-wider text-muted-foreground uppercase">
              {error.digest}
            </p>
          )}

          <div className="mt-10">
            {/* Deliberately a plain <a>, not next/link: this boundary is only
                reached when the root layout itself threw, so a client-side
                navigation would re-render the same broken tree and rethrow. A
                full document request is the only thing that can recover. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Reload the site
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
