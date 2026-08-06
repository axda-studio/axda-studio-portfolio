import { test as base } from "@playwright/test"
import { HeaderFixture } from "./header"

type Fixtures = {
  header: HeaderFixture
}

export const test = base.extend<Fixtures>({
  header: async ({ page }, use) => {
    await use(new HeaderFixture(page))
  },
})

export { expect } from "@playwright/test"
export { hideDevOverlay } from "./dev-overlay"
export { BANNER, settleBanner, preAnswerConsent } from "./consent"
export { clickAndExpectUrl } from "./navigation"
