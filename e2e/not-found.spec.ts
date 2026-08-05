import AxeBuilder from "@axe-core/playwright"
import { test, expect } from "@playwright/test"

import { hideDevOverlay } from "./fixtures/dev-overlay"

const AXE_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
] as const

const HEADINGS = {
  en: /this page\s+slipped away\./i,
  fr: /cette page\s+s'est envolée\./i,
} as const

test.describe("Not found", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await hideDevOverlay(page)
  })

  for (const [locale, heading] of Object.entries(HEADINGS)) {
    test(`/${locale}/<unknown> renders the localized 404`, async ({ page }) => {
      const response = await page.goto(`/${locale}/this-does-not-exist`)

      // The status matters as much as the page: a 404 rendered under a 200
      // would keep the URL indexable.
      expect(response?.status()).toBe(404)
      await expect(
        page.getByRole("heading", { level: 1, name: heading })
      ).toBeVisible()
    })
  }

  test("answers 404 for a deeply nested unknown path", async ({ page }) => {
    const response = await page.goto("/en/a/b/c")

    expect(response?.status()).toBe(404)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  })

  test("does not shadow the real routes", async ({ page }) => {
    for (const path of ["/en", "/fr", "/en/legal", "/fr/legal"]) {
      const response = await page.goto(path)
      expect(response?.status(), `${path} should still resolve`).toBe(200)
    }
  })

  test("offers a way back home that works", async ({ page }) => {
    await page.goto("/en/this-does-not-exist")

    await page.getByTestId("not-found-home-link").click()
    await expect(page).toHaveURL(/\/en\/?$/)
  })

  test("keeps the legal notice reachable from the 404", async ({ page }) => {
    await page.goto("/en/this-does-not-exist")

    await page.getByTestId("not-found-legal-link").click()
    await expect(page).toHaveURL(/\/en\/legal$/)
  })

  test("carries the visitor's locale into the links", async ({ page }) => {
    await page.goto("/fr/this-does-not-exist")

    await expect(page.getByTestId("not-found-home-link")).toHaveAttribute(
      "href",
      "/fr"
    )
    await expect(page.getByTestId("not-found-legal-link")).toHaveAttribute(
      "href",
      "/fr/legal"
    )
  })

  for (const theme of ["light", "dark"] as const) {
    test(`404 (${theme}) has no WCAG A/AA violations`, async ({ page }) => {
      await page.addInitScript((t) => {
        window.localStorage.setItem("theme", t)
      }, theme)
      await page.goto("/en/this-does-not-exist")
      await page.waitForLoadState("networkidle")
      // next-themes applies the class after hydration. Firefox and WebKit lose
      // the race often enough that axe scores the light palette and reports
      // phantom contrast failures — same guard as a11y.spec.ts.
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
})
