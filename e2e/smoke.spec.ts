import { test, expect } from "./fixtures"

// Routes that don't have a dedicated *-page.spec.ts get header presence
// coverage here. Home (/) is covered by home-page.spec.ts.
const ROUTES: readonly string[] = []

test.describe("Global layout smoke tests", () => {
  for (const route of ROUTES) {
    test(`header is present on ${route}`, async ({ page, header }) => {
      await page.goto(route)
      await expect(header.root).toBeVisible()
    })
  }
})
