import AxeBuilder from "@axe-core/playwright"
import { test, expect } from "@playwright/test"

import { hideDevOverlay } from "./fixtures/dev-overlay"
import { BANNER, settleBanner } from "./fixtures/consent"

const SETTINGS = '[data-testid="cookie-settings"]'

const AXE_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
] as const

/** PostHog persists under `ph_<token>_posthog` in both cookies and localStorage. */
async function posthogStorage(page: import("@playwright/test").Page) {
  return page.evaluate(() => ({
    cookies: document.cookie
      .split("; ")
      .filter((entry) => entry.startsWith("ph_")),
    keys: Object.keys(localStorage).filter((key) => key.endsWith("_posthog")),
  }))
}

test.describe("Cookie consent", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await hideDevOverlay(page)
  })

  test("asks before storing anything for analytics", async ({ page }) => {
    await page.goto("/en")

    await expect(page.locator(BANNER)).toBeVisible()
    expect(await posthogStorage(page)).toEqual({ cookies: [], keys: [] })
  })

  // The site-wide axe sweep only catches the banner if it has mounted by the
  // time it runs, which made a real contrast failure (white on --primary at
  // 3.53:1) intermittent. Scanning the banner explicitly, in both themes and
  // in both states, keeps that deterministic.
  for (const theme of ["light", "dark"] as const) {
    for (const state of ["initial", "preferences"] as const) {
      test(`banner (${theme}, ${state}) has no WCAG A/AA violations`, async ({
        page,
      }) => {
        await page.addInitScript((t) => {
          window.localStorage.setItem("theme", t)
        }, theme)
        await page.goto("/en")
        // Scan the settled banner, not a frame of its fade-in — see settleBanner.
        await settleBanner(page)

        if (state === "preferences") {
          await page.getByRole("button", { name: "Customize" }).click()
          await expect(page.getByRole("switch")).toBeVisible()
        }

        const results = await new AxeBuilder({ page })
          .include(BANNER)
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
  }

  test("stores analytics state only after accepting", async ({ page }) => {
    await page.goto("/en")
    await page.getByRole("button", { name: "Accept" }).click()

    await expect(page.locator(BANNER)).toBeHidden()

    const stored = await posthogStorage(page)
    expect(stored.cookies).not.toHaveLength(0)
    expect(stored.keys).not.toHaveLength(0)
  })

  test("keeps analytics off after declining, across reloads", async ({
    page,
  }) => {
    await page.goto("/en")
    await page.getByRole("button", { name: "Decline" }).click()
    await page.reload()

    await expect(page.locator(BANNER)).toBeHidden()
    expect(await posthogStorage(page)).toEqual({ cookies: [], keys: [] })
  })

  test("lets a visitor withdraw consent from the footer", async ({ page }) => {
    await page.goto("/en")
    await page.getByRole("button", { name: "Accept" }).click()
    expect((await posthogStorage(page)).cookies).not.toHaveLength(0)

    await page.locator(SETTINGS).click()
    await page.getByRole("switch", { name: "Analytics" }).click()
    await page.getByRole("button", { name: "Save choices" }).click()

    await expect(page.locator(BANNER)).toBeHidden()
    expect(await posthogStorage(page)).toEqual({ cookies: [], keys: [] })
  })
})
