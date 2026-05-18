import { vi, describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeSelector } from "./theme-selector"

vi.mock("@/locales/client", () => ({
  useCurrentLocale: () => "en",
  useChangeLocale: () => vi.fn(),
  useScopedI18n: () => (key: string) => key,
}))

describe("ThemeSelector component", () => {
  test("Should render ThemeSelector", () => {
    render(<ThemeSelector />)

    const themeBtn = screen.getByRole("button", { name: /aria/i })
    expect(themeBtn).toBeInTheDocument()
  })
})
