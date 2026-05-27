import AxeBuilder from "@axe-core/playwright"
import { test, expect } from "./fixtures"

const ROUTES = ["/"] as const

test.describe("Accessibility (axe)", () => {
  for (const route of ROUTES) {
    test(`${route} has no WCAG A/AA violations`, async ({ page }) => {
      await page.goto(route)
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
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
