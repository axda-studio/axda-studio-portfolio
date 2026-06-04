import { test, expect } from "./fixtures"
import { APPOINTMENT_BOOKING_URL } from "@/components/nav/nav"
import { PILLARS } from "@/components/pillar-card/constants"
import { STACK_ITEMS } from "@/components/stack-card/constants"
import enPillars from "@/locales/en/pillars"
import enStack from "@/locales/en/stack"

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

test.describe("Home page — pillars section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders the pillars eyebrow and counter", async ({ page }) => {
    const section = page.locator("#pillars")
    await expect(section.getByText(/what i bring/i)).toBeVisible()
    await expect(section.getByText(/3 pillars/i)).toBeVisible()
  })

  test("renders one card per pillar", async ({ page }) => {
    // Each card holds a nested <li> badge list, so we target direct grid
    // children rather than every listitem in the section.
    const cards = page.locator("#pillars > ul > li")
    await expect(cards).toHaveCount(PILLARS.length)
  })

  for (const { id, badgeKeys } of PILLARS) {
    const item = enPillars.items[id]
    test(`renders the "${item.label}" card`, async ({ page }) => {
      const paddedId = String(id).padStart(2, "0")
      const card = page
        .locator("#pillars > ul > li")
        .filter({ hasText: new RegExp(`${paddedId} — ${item.label}`, "i") })

      await expect(card).toHaveCount(1)
      await expect(card.getByText(item.title.emphasis)).toBeVisible()
      await expect(card.getByText(item.description)).toBeVisible()

      for (const key of badgeKeys) {
        await expect(
          card.getByText(enPillars.badges[key], { exact: true })
        ).toBeVisible()
      }
    })
  }
})

test.describe("Home page — stack section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders the stack eyebrow and tagline", async ({ page }) => {
    const section = page.locator("#stack")
    await expect(section.getByText(enStack.eyebrow)).toBeVisible()
    await expect(section.getByText(enStack.tagline)).toBeVisible()
  })

  test("renders one card per stack item", async ({ page }) => {
    const cards = page.locator("#stack > ul > li")
    await expect(cards).toHaveCount(STACK_ITEMS.length)
  })

  for (const { id } of STACK_ITEMS) {
    const item = enStack.items[id]
    test(`renders the "${item.title}" card`, async ({ page }) => {
      const card = page
        .locator("#stack > ul > li")
        .filter({ hasText: item.label })
        .filter({ hasText: item.title })

      await expect(card).toHaveCount(1)
      await expect(card.getByText(item.label, { exact: true })).toBeVisible()
      await expect(card.getByText(item.title, { exact: true })).toBeVisible()
    })
  }

  test("renders inline <code> for the FOUNDATION card", async ({ page }) => {
    const foundation = page
      .locator("#stack > ul > li")
      .filter({ hasText: "FOUNDATION" })
    await expect(foundation.locator("code")).toHaveText("any")
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
