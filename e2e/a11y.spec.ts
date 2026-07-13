import AxeBuilder from "@axe-core/playwright"
import { test, expect } from "@playwright/test"

const LOCALES = ["en", "fr", "es"] as const
const THEMES = ["light", "dark"] as const

const AXE_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
] as const

test.describe("Accessibility (axe)", () => {
  // Emulate prefers-reduced-motion: reduce so the hero's fade-in transitions
  // (MotionConfig reducedMotion="user") collapse to duration 0. Otherwise axe
  // races the ~1.5s subtitle/CTA fade and reports false-positive contrast
  // failures from text rendered at partial opacity. Using page.emulateMedia
  // rather than test.use because the current Playwright typings don't accept
  // reducedMotion as a top-level PlaywrightTestOption in .use().
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
  })

  for (const locale of LOCALES) {
    for (const theme of THEMES) {
      test(`/${locale} (${theme}) has no WCAG A/AA violations`, async ({
        page,
      }) => {
        await page.addInitScript((t) => {
          window.localStorage.setItem("theme", t)
        }, theme)
        await page.goto(`/${locale}`)
        await page.waitForLoadState("networkidle")
        await page.waitForFunction(
          (t) =>
            t === "dark"
              ? document.documentElement.classList.contains("dark")
              : !document.documentElement.classList.contains("dark"),
          theme
        )
        // Wait for the hero fade-in to settle so axe doesn't score elements
        // rendered at partial opacity (Motion's reducedMotion zeros duration
        // but not delay — the parent motion.div can sit at opacity 0 for up
        // to 1.5s). The <p> itself has opacity 1 natively; the animation is
        // on an ancestor, so we walk up and check every level.
        await page.waitForFunction(() => {
          let el: HTMLElement | null = document.querySelector(".max-w-3xs")
          if (!el) return true
          while (el && el !== document.body) {
            if (window.getComputedStyle(el).opacity !== "1") return false
            el = el.parentElement
          }
          return true
        })

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
  }

  test("/en with FAQ open has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/en")
    await page.waitForLoadState("networkidle")

    const triggers = page.locator(
      '[data-slot="accordion-trigger"], button[aria-expanded]'
    )
    const count = await triggers.count()
    for (let i = 0; i < count; i++) {
      const trigger = triggers.nth(i)
      const expanded = await trigger.getAttribute("aria-expanded")
      if (expanded === "false") await trigger.click()
    }

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
})
