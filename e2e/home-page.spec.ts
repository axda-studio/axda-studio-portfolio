import { test, expect } from "./fixtures"
import { APPOINTMENT_BOOKING_URL } from "@/components/nav/nav"

const SECTION_IDS = ["work", "stack", "about", "faq", "contact"] as const

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

  test("renders the hero heading and intro copy", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: /frontend engineer/i })
    ).toBeVisible()
    await expect(page.getByText(/one-person frontend practice/i)).toBeVisible()
  })

  test("primary CTA links to the work section", async ({ page }) => {
    const cta = page.getByRole("link", { name: /see selected work/i })
    await expect(cta).toHaveAttribute("href", "#work")

    await cta.click()
    await expect(page).toHaveURL(/#work$/)
    await expect(page.locator("#work")).toBeInViewport()
  })

  test("secondary CTA opens the booking link in a new tab", async ({
    page,
  }) => {
    const booking = page.getByRole("link", { name: /schedule a call/i })
    await expect(booking).toHaveAttribute("href", APPOINTMENT_BOOKING_URL)
    await expect(booking).toHaveAttribute("target", "_blank")
    await expect(booking).toHaveAttribute("rel", /noopener/)
    await expect(booking).toHaveAttribute("rel", /noreferrer/)
  })

  test.describe("sections", () => {
    for (const id of SECTION_IDS) {
      test(`renders the #${id} section`, async ({ page }) => {
        await expect(page.locator(`#${id}`)).toBeAttached()
      })
    }
  })
})

test.describe("Home page — localized routes", () => {
  test("renders the French route with a localized nav label", async ({
    page,
  }) => {
    await page.goto("/fr")
    await expect(page).toHaveURL(/\/fr\/?$/)
    await expect(
      page.getByRole("link", { name: /projets/i }).first()
    ).toBeVisible()
  })

  test("renders the Spanish route with a localized nav label", async ({
    page,
  }) => {
    await page.goto("/es")
    await expect(page).toHaveURL(/\/es\/?$/)
    await expect(
      page.getByRole("link", { name: /proyectos/i }).first()
    ).toBeVisible()
  })
})

test.describe("Home page — mobile viewport", () => {
  test.use({ viewport: { width: 375, height: 800 } })

  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("hides the desktop header and shows the mobile nav", async ({
    page,
    header,
  }) => {
    await expect(header.root).toBeHidden()
    await expect(page.getByRole("navigation", { name: "mobile" })).toBeVisible()
  })

  test("mobile nav links to the home and section anchors", async ({ page }) => {
    const mobileNav = page.getByRole("navigation", { name: "mobile" })
    await expect(
      mobileNav.getByRole("link", { name: /home/i })
    ).toHaveAttribute("href", "/")
    await expect(
      mobileNav.getByRole("link", { name: /contact/i })
    ).toHaveAttribute("href", "#contact")
  })
})
