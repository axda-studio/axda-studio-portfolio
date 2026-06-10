import { test, expect } from "./fixtures"
import { CAL_URL } from "@/components/nav/nav"
import { PILLARS } from "@/components/pillar-card/constants"
import { STACK_ITEMS } from "@/components/stack-card/constants"
import { FAQ_ITEMS } from "@/components/faq/constants"
import enPillars from "@/locales/en/pillars"
import enStack from "@/locales/en/stack"
import enFaq from "@/locales/en/faq"
import enContact from "@/locales/en/contact"
import enWork from "@/locales/en/work"
import enClaudeCode from "@/locales/en/claude-code"
import enAbout from "@/locales/en/about"

const SECTION_IDS = [
  "hero",
  "pillars",
  "work",
  "stack",
  "claude-code",
  "about",
  "faq",
  "contact",
] as const

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
    await expect(booking).toHaveAttribute("href", CAL_URL)
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

test.describe("Home page — work section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders the eyebrow and tagline", async ({ page }) => {
    const section = page.locator("#work")
    await expect(section.getByText(enWork.eyebrow)).toBeVisible()
    await expect(section.getByText(enWork.tagline)).toBeVisible()
  })
})

test.describe("Home page — claude-code section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders the eyebrow and tagline", async ({ page }) => {
    const section = page.locator("#claude-code")
    await expect(section.getByText(enClaudeCode.eyebrow)).toBeVisible()
    await expect(section.getByText(enClaudeCode.tagline)).toBeVisible()
  })
})

test.describe("Home page — about section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders the eyebrow and tagline", async ({ page }) => {
    const section = page.locator("#about")
    await expect(section.getByText(enAbout.eyebrow)).toBeVisible()
    await expect(section.getByText(enAbout.tagline)).toBeVisible()
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

test.describe("Home page — faq section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders the faq eyebrow and tagline", async ({ page }) => {
    const section = page.locator("#faq")
    await expect(section.getByText(enFaq.eyebrow)).toBeVisible()
    await expect(section.getByText(enFaq.tagline)).toBeVisible()
  })

  test("renders one trigger per faq item", async ({ page }) => {
    const triggers = page.locator("#faq").getByRole("button")
    await expect(triggers).toHaveCount(FAQ_ITEMS.length)
  })

  test("each trigger starts collapsed", async ({ page }) => {
    for (const { id } of FAQ_ITEMS) {
      const item = enFaq.items[id]
      const trigger = page
        .locator("#faq")
        .getByRole("button", { name: item.question })
      await expect(trigger).toHaveAttribute("aria-expanded", "false")
    }
  })

  test("clicking a trigger reveals its answer", async ({ page }) => {
    const { id } = FAQ_ITEMS[0]
    const item = enFaq.items[id]
    const trigger = page
      .locator("#faq")
      .getByRole("button", { name: item.question })

    await trigger.click()
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(page.locator("#faq").getByText(item.answer)).toBeVisible()
  })
})

test.describe("Home page — contact section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders the eyebrow and tagline", async ({ page }) => {
    const section = page.locator("#contact")
    await expect(
      section.getByText(enContact.eyebrow, { exact: true })
    ).toBeVisible()
    await expect(section.getByText(enContact.tagline)).toBeVisible()
  })

  test("renders the hello@ email pill linking to mailto", async ({ page }) => {
    const section = page.locator("#contact")
    const emailLink = section
      .getByRole("link", { name: /hello@axda-studio\.fr/i })
      .first()
    await expect(emailLink).toHaveAttribute(
      "href",
      "mailto:hello@axda-studio.fr"
    )
  })
})

test.describe("Home page — contact section (mobile only)", () => {
  // The brief form and Elsewhere grid are rendered only at < lg breakpoint;
  // the desktop dark card surfaces the same info via the metadata footer
  // and the inline cal/GitHub/LinkedIn quick links.
  test.use({ viewport: { width: 375, height: 800 } })

  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders the brief form with three labelled controls", async ({
    page,
  }) => {
    const section = page.locator("#contact")
    await expect(section.getByText(enContact.form.eyebrow)).toBeVisible()
    await expect(section.getByLabel(enContact.form.nameLabel)).toBeVisible()
    await expect(section.getByLabel(enContact.form.emailLabel)).toBeVisible()
    await expect(section.getByLabel(enContact.form.briefLabel)).toBeVisible()
    await expect(
      section.getByRole("button", { name: enContact.form.submitLabel })
    ).toBeVisible()
  })

  test("renders the elsewhere grid with four external links", async ({
    page,
  }) => {
    const section = page.locator("#contact")
    await expect(section.getByText(enContact.elsewhere.eyebrow)).toBeVisible()

    const expected = [
      {
        label: enContact.elsewhere.items.github.label,
        value: enContact.elsewhere.items.github.value,
        href: "https://github.com/axda-studio",
      },
      {
        label: enContact.elsewhere.items.linkedin.label,
        value: enContact.elsewhere.items.linkedin.value,
        href: "https://www.linkedin.com/in/alyx-darenne",
      },
      {
        label: enContact.elsewhere.items.cal.label,
        value: enContact.elsewhere.items.cal.value,
        href: "https://calendar.app.google/VEmfweYv5o8gjiva6",
      },
      {
        label: enContact.elsewhere.items.email.label,
        value: enContact.elsewhere.items.email.value,
        href: "mailto:hello@axda-studio.fr",
      },
    ]

    for (const { label, value, href } of expected) {
      // Match by combined label + value so the elsewhere card link
      // (accessible name "LABEL value") doesn't collide with the dark
      // card's email pill (accessible name is just the email).
      const link = section.getByRole("link", {
        name: new RegExp(`${label}.*${value.replace(/\./g, "\\.")}`),
      })
      await expect(link).toHaveAttribute("href", href)
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
