import { test, expect } from "./fixtures"
import { NAV_ITEMS } from "@/components/nav/nav"

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders all landmarks and controls", async ({ header }) => {
    await header.validateEntireHeader()
  })

  test("nav items point to the expected anchors", async ({ header }) => {
    for (const item of NAV_ITEMS) {
      await expect(header.navItem(item.label)).toHaveAttribute(
        "href",
        item.slug
      )
    }
  })

  test("clicking a nav item scrolls to its section", async ({
    header,
    page,
  }) => {
    await header.navItem("work").click()
    await expect(page).toHaveURL(/#work$/)
  })
})
