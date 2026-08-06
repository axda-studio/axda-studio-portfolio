import AxeBuilder from "@axe-core/playwright"
import { test, expect } from "@playwright/test"

import { hideDevOverlay } from "./fixtures/dev-overlay"
import { BANNER, preAnswerConsent, settleBanner } from "./fixtures/consent"
import { clickAndExpectUrl } from "./fixtures/navigation"

const AXE_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
] as const

const HEADINGS = {
  en: "Legal & privacy",
  fr: "Mentions légales & confidentialité",
} as const

test.describe("Legal page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await hideDevOverlay(page)
  })

  for (const [locale, heading] of Object.entries(HEADINGS)) {
    test(`/${locale}/legal renders the localized notice`, async ({ page }) => {
      await page.goto(`/${locale}/legal`)

      await expect(
        page.getByRole("heading", { level: 1, name: heading })
      ).toBeVisible()
      // The storage table must list every key the site writes.
      for (const name of [
        "Next-Locale",
        "theme",
        "axda-consent",
        "ph_…_posthog",
      ]) {
        await expect(
          page.getByRole("rowheader", { name, exact: true })
        ).toBeVisible()
      }
    })
  }

  for (const theme of ["light", "dark"] as const) {
    test(`/en/legal (${theme}) has no WCAG A/AA violations`, async ({
      page,
    }) => {
      await page.addInitScript((t) => {
        window.localStorage.setItem("theme", t)
      }, theme)
      // Keep the banner out of this sweep: consent.spec.ts scans it directly,
      // and mid-fade it reports the faded text colour rather than the settled
      // one. This test is about the page.
      await preAnswerConsent(page)
      await page.goto("/en/legal")
      await page.waitForLoadState("networkidle")
      await page.waitForFunction(
        (t) =>
          t === "dark"
            ? document.documentElement.classList.contains("dark")
            : !document.documentElement.classList.contains("dark"),
        theme
      )

      const results = await new AxeBuilder({ page })
        .withTags([...AXE_TAGS])
        .analyze()

      expect(
        results.violations,
        results.violations
          .map((v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`)
          .join("\n")
      ).toEqual([])
    })
  }

  test("is reachable from the footer and from the banner", async ({ page }) => {
    await page.goto("/en")

    // Settle the banner before reaching for its link: mid-fade the click can
    // land before the link is interactive.
    const banner = await settleBanner(page)
    await clickAndExpectUrl(page, banner.getByRole("link"), /\/en\/legal$/)

    // The banner is fixed across the full width below `lg`, so on the phone
    // projects it sits over the footer and intercepts the click. Arrive as a
    // visitor who already answered — which is when the footer link matters.
    await preAnswerConsent(page)
    await page.goto("/fr")
    await expect(page.locator(BANNER)).toBeHidden()

    await clickAndExpectUrl(
      page,
      page.getByTestId("footer-legal-link"),
      /\/fr\/legal$/
    )
  })

  test("exposes the withdrawal control", async ({ page }) => {
    await page.goto("/en")
    await page.getByRole("button", { name: "Accept" }).click()
    await page.goto("/en/legal")

    await page.locator('[data-testid="legal-cookie-settings"]').click()

    const banner = page.locator('[data-testid="cookie-consent"]')
    await expect(banner).toBeVisible()
    await expect(
      banner.getByRole("switch", { name: "Analytics" })
    ).toHaveAttribute("aria-checked", "true")
  })

  test("is listed in the sitemap for every locale", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text()

    expect(body).toContain("/en/legal")
    expect(body).toContain("/fr/legal")
  })
})
