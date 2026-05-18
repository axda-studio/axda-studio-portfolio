import { test, expect } from "./fixtures"

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("has the expected title", async ({ page }) => {
    await expect(page).toHaveTitle(/Axda Studio/i)
  })

  test("resolves to the root URL", async ({ page }) => {
    await expect(page).toHaveURL(/\/(en|fr|es)?\/?$/)
  })

  test("renders the header", async ({ header }) => {
    await expect(header.root).toBeVisible()
  })
})
