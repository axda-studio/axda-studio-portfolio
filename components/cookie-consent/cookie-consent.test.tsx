import { beforeEach, describe, expect, test, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { CookieConsent } from "./cookie-consent"
import { CookieSettingsButton } from "./cookie-settings-button"
import { CONSENT_STORAGE_KEY, readConsent, writeConsent } from "@/lib/consent"

const posthogMock = vi.hoisted(() => ({
  capture: vi.fn(),
  opt_in_capturing: vi.fn(),
  opt_out_capturing: vi.fn(),
  set_config: vi.fn(),
  reset: vi.fn(),
}))

vi.mock("posthog-js", () => ({
  default: posthogMock,
}))

vi.mock("@/locales/client", () => ({
  useScopedI18n: () => (key: string) => key,
  useCurrentLocale: () => "en",
}))

beforeEach(() => {
  window.localStorage.clear()
  Object.values(posthogMock).forEach((fn) => fn.mockClear())
})

describe("CookieConsent", () => {
  test("asks for a decision when none was stored", async () => {
    render(<CookieConsent />)

    expect(await screen.findByTestId("cookie-consent")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "acceptAll" })
    ).toBeInTheDocument()
  })

  test("stays hidden once a decision exists", async () => {
    writeConsent({ analytics: false })
    render(
      <>
        <CookieConsent />
        <CookieSettingsButton />
      </>
    )
    // The footer link renders synchronously; the banner would only appear after
    // the post-mount consent read, so its absence here is meaningful.
    await screen.findByTestId("cookie-settings")

    expect(screen.queryByTestId("cookie-consent")).not.toBeInTheDocument()
  })

  test("opts into analytics on accept", async () => {
    render(<CookieConsent />)
    fireEvent.click(await screen.findByRole("button", { name: "acceptAll" }))

    expect(posthogMock.set_config).toHaveBeenCalledWith({
      persistence: "localStorage+cookie",
    })
    expect(posthogMock.opt_in_capturing).toHaveBeenCalled()
    expect(posthogMock.capture).toHaveBeenCalledWith("cookie_consent_updated", {
      analytics: true,
    })
    expect(readConsent()?.categories.analytics).toBe(true)
  })

  test("opts out and clears prior state on decline", async () => {
    render(<CookieConsent />)
    fireEvent.click(await screen.findByRole("button", { name: "rejectAll" }))

    expect(posthogMock.reset).toHaveBeenCalledWith(true)
    expect(posthogMock.set_config).toHaveBeenCalledWith({
      persistence: "memory",
    })
    expect(posthogMock.opt_out_capturing).toHaveBeenCalled()
    expect(readConsent()?.categories.analytics).toBe(false)
  })

  test("saves a granular choice from the preferences panel", async () => {
    render(<CookieConsent />)
    fireEvent.click(await screen.findByRole("button", { name: "customize" }))

    const analyticsSwitch = screen.getByRole("switch", {
      name: "categories.analytics.label",
    })
    expect(analyticsSwitch).toHaveAttribute("aria-checked", "false")

    fireEvent.click(analyticsSwitch)
    fireEvent.click(screen.getByRole("button", { name: "save" }))

    expect(readConsent()?.categories.analytics).toBe(true)
    expect(posthogMock.opt_in_capturing).toHaveBeenCalled()
  })

  test("re-opens in preferences mode from the footer link", async () => {
    writeConsent({ analytics: true })
    render(
      <>
        <CookieConsent />
        <CookieSettingsButton />
      </>
    )
    await screen.findByTestId("cookie-settings")

    fireEvent.click(screen.getByTestId("cookie-settings"))

    expect(await screen.findByTestId("cookie-consent")).toBeInTheDocument()
    expect(
      screen.getByRole("switch", { name: "categories.analytics.label" })
    ).toHaveAttribute("aria-checked", "true")
  })

  test("closes without changing anything when dismissed", async () => {
    writeConsent({ analytics: true })
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    render(
      <>
        <CookieConsent />
        <CookieSettingsButton />
      </>
    )
    fireEvent.click(await screen.findByTestId("cookie-settings"))
    fireEvent.click(await screen.findByRole("button", { name: "close" }))

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe(stored)
    expect(posthogMock.capture).not.toHaveBeenCalled()
  })
})
