import { expect, test, describe, vi, beforeEach } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { LocaleSelector } from "./locale-selector"

const changeLocale = vi.fn()
const useCurrentLocale = vi.fn<() => string>(() => "en")
const captureMock = vi.fn()

vi.mock("@/locales/client", () => ({
  useCurrentLocale: () => useCurrentLocale(),
  useChangeLocale: () => changeLocale,
  useScopedI18n: () => (key: string) => key,
}))

vi.mock("posthog-js", () => ({
  default: {
    capture: (...args: unknown[]) => captureMock(...args),
  },
}))

beforeEach(() => {
  changeLocale.mockClear()
  captureMock.mockClear()
  useCurrentLocale.mockReturnValue("en")
})

describe("LocaleSelector", () => {
  test("renders the current locale label", () => {
    render(<LocaleSelector />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test.each([
    ["en", "fr"],
    ["fr", "es"],
    ["es", "en"],
  ] as const)("cycles %s -> %s on click", (from, to) => {
    useCurrentLocale.mockReturnValue(from)
    render(<LocaleSelector />)

    fireEvent.click(screen.getByRole("button"))

    expect(captureMock).toHaveBeenCalledWith("locale_changed", { from, to })
    expect(changeLocale).toHaveBeenCalledWith(to)
  })

  test("falls back to 'en' for an unknown locale", () => {
    useCurrentLocale.mockReturnValue("de")
    render(<LocaleSelector />)

    fireEvent.click(screen.getByRole("button"))

    expect(changeLocale).toHaveBeenCalledWith("en")
  })
})
