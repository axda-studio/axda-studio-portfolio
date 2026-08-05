import { expect, type Locator, type Page } from "@playwright/test"

import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from "@/lib/consent"

export const BANNER = '[data-testid="cookie-consent"]'

/**
 * Waits for the banner's entry animation to finish.
 *
 * `toBeVisible()` is not enough: Playwright counts an element with
 * `opacity: 0` as visible, so axe can scan the banner mid-fade. It then
 * composites the text against the page and reports the *faded* colour — that is
 * where a phantom "contrast 4.41" comes from, when the settled value is 12.13.
 * Motion zeroes the duration under reduced motion but the first frame still
 * paints at the `hidden` variant, so the wait is on opacity reaching 1.
 */
export async function settleBanner(page: Page): Promise<Locator> {
  const banner = page.locator(BANNER)
  await expect(banner).toBeVisible()
  await page.waitForFunction((sel) => {
    const el = document.querySelector(sel)
    return !!el && getComputedStyle(el).opacity === "1"
  }, BANNER)

  return banner
}

/**
 * Arrive as a visitor who already answered the banner, so it never mounts.
 *
 * Two reasons a test wants this: the banner is `fixed` to the bottom and spans
 * the full width below `lg`, so on the phone projects it covers the footer and
 * swallows clicks aimed at it; and a page-wide axe sweep otherwise scans the
 * banner as a side effect, which `consent.spec.ts` already covers directly.
 *
 * Declines by default — nothing should reach PostHog because a test ran.
 * Must be called before the `goto()` it should apply to.
 */
export async function preAnswerConsent(
  page: Page,
  analytics = false
): Promise<void> {
  await page.addInitScript(
    ([key, version, allow]) => {
      window.localStorage.setItem(
        key as string,
        JSON.stringify({
          version,
          updatedAt: new Date().toISOString(),
          categories: { analytics: allow },
        })
      )
    },
    [CONSENT_STORAGE_KEY, CONSENT_VERSION, analytics] as const
  )
}
