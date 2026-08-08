import { afterEach, describe, expect, test, vi } from "vitest"

import { getBaseUrl, isProductionDeployment } from "./base-url"
import { siteConfig } from "./site-config"

afterEach(() => {
  vi.unstubAllEnvs()
})

describe("getBaseUrl", () => {
  test("uses the canonical domain in production, not the Vercel host", () => {
    vi.stubEnv("VERCEL_ENV", "production")
    vi.stubEnv("VERCEL_BRANCH_URL", "axda-studio-portfolio-main.vercel.app")

    expect(getBaseUrl()).toBe(siteConfig.url)
  })

  test("uses the branch host on a preview deployment", () => {
    vi.stubEnv("VERCEL_ENV", "preview")
    vi.stubEnv("VERCEL_BRANCH_URL", "portfolio-git-feature.vercel.app")

    expect(getBaseUrl()).toBe("https://portfolio-git-feature.vercel.app")
  })

  test("falls back to the per-deployment host when there is no branch host", () => {
    vi.stubEnv("VERCEL_ENV", "preview")
    vi.stubEnv("VERCEL_BRANCH_URL", undefined)
    vi.stubEnv("VERCEL_URL", "portfolio-abc123.vercel.app")

    expect(getBaseUrl()).toBe("https://portfolio-abc123.vercel.app")
  })

  test("falls back to localhost off Vercel, as in CI builds", () => {
    vi.stubEnv("VERCEL_ENV", undefined)
    vi.stubEnv("VERCEL_BRANCH_URL", undefined)
    vi.stubEnv("VERCEL_URL", undefined)
    vi.stubEnv("PORT", undefined)

    expect(getBaseUrl()).toBe("http://localhost:3000")
  })

  test("honours PORT when the dev server is not on 3000", () => {
    vi.stubEnv("VERCEL_ENV", undefined)
    vi.stubEnv("VERCEL_BRANCH_URL", undefined)
    vi.stubEnv("VERCEL_URL", undefined)
    vi.stubEnv("PORT", "3100")

    expect(getBaseUrl()).toBe("http://localhost:3100")
  })
})

describe("isProductionDeployment", () => {
  test("is true only for VERCEL_ENV=production", () => {
    vi.stubEnv("VERCEL_ENV", "production")
    expect(isProductionDeployment()).toBe(true)
  })

  test.each(["preview", "development", undefined])(
    "is false for VERCEL_ENV=%s",
    (value) => {
      vi.stubEnv("VERCEL_ENV", value)
      expect(isProductionDeployment()).toBe(false)
    }
  )
})
