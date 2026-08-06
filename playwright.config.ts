import { defineConfig, devices } from "@playwright/test"

/**
 * Specs that make no assumption about viewport width, so they can also run on
 * the phone projects below. Everything here exercises a surface that is
 * responsive by construction: the consent banner, /legal, and the 404.
 */
const MOBILE_SPECS = /(consent|legal|not-found)\.spec\.ts$/

/**
 * Deliberately not 3000. On 3000 the suite collided with `pnpm dev`: Playwright
 * cannot tell a dev server from the `next start` it means to launch, so its own
 * server lost the bind and every spec silently ran against dev output instead.
 * Dev renders the tree in a single pass, so an entire class of production-only
 * streaming bug passed these tests while the built site served a blank page.
 */
const PORT = 3100
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: "./e2e",
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html"]] : "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // Real phone devices — touch, device scale factor and mobile Safari, which
    // the desktop projects' `viewport` overrides cannot emulate. Scoped to
    // MOBILE_SPECS: header.spec.ts and most of home-page.spec.ts assert against
    // DesktopNav, which does not exist below `lg`, so the full suite cannot run
    // at a phone width. Those files already cover mobile via their own
    // `test.use({ viewport })` blocks.
    {
      name: "mobile-safari",
      testMatch: MOBILE_SPECS,
      use: { ...devices["iPhone 15"] },
    },
    {
      name: "mobile-chrome",
      testMatch: MOBILE_SPECS,
      use: { ...devices["Pixel 7"] },
    },
  ],

  webServer: {
    command: `pnpm exec next start --port ${PORT}`,
    url: BASE_URL,
    // Never reuse. `next start` boots in well under a second, so the only thing
    // reuse bought was the risk of testing a server left over from an earlier
    // build — which is how a stale bundle can pass a suite that should fail.
    // Local runs now behave exactly like CI.
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
