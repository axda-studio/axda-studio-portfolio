import { expect, type Locator, type Page } from "@playwright/test"
import { NAV_ITEMS } from "@/components/header/nav"

export class HeaderFixture {
  readonly root: Locator
  readonly nav: Locator
  readonly logo: Locator
  readonly cta: Locator
  readonly themeSelector: Locator
  readonly localeSelector: Locator

  constructor(private readonly page: Page) {
    this.root = page.getByTestId("header")
    this.nav = this.root.getByRole("navigation", { name: "primary" })
    this.logo = this.root.getByRole("link").first()
    this.cta = this.root.getByRole("link").last()
    this.themeSelector = this.root.getByRole("button", {
      name: /toggle theme/i,
    })
    this.localeSelector = this.root.getByRole("combobox")
  }

  navItem(label: (typeof NAV_ITEMS)[number]["label"]): Locator {
    return this.nav.getByRole("link", { name: new RegExp(label, "i") })
  }

  async validateEntireHeader(): Promise<void> {
    await expect(this.root).toBeVisible()
    await expect(this.nav).toBeVisible()
    await expect(this.logo).toBeVisible()
    await expect(this.cta).toBeVisible()
    await expect(this.themeSelector).toBeVisible()
    await expect(this.localeSelector).toBeVisible()

    for (const item of NAV_ITEMS) {
      await expect(this.navItem(item.label)).toBeVisible()
    }
  }
}
