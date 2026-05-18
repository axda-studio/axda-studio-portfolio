import { expect, test, describe, vi } from "vitest"
import { LocaleSelector } from "./locale-selector"
import { render, screen } from "@testing-library/react"

vi.mock("@/locales/client", () => ({
  useCurrentLocale: () => "en",
  useChangeLocale: () => vi.fn(),
  useScopedI18n: () => (key: string) => key,
}))

describe("LocaleSelector component", () => {
  test("Renders LocaleSelector", () => {
    render(<LocaleSelector />)
    const btn = screen.getByRole("button", { name: /EN/i })
    expect(btn).toBeInTheDocument()
  })

  //   test("Change language onClick", () => {
  //     render(<LocaleSelector />)
  //     const enBtn = screen.getByRole("button", { name: /EN/i })
  //     expect(enBtn).toBeInTheDocument()

  //     fireEvent.click(enBtn)
  //     screen.debug()
  //     const frBtn = screen.getByRole("button", { name: /FR/i })
  //     expect(frBtn).toBeInTheDocument()
  //   })
})
