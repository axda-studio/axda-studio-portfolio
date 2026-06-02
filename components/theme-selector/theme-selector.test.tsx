import { vi, describe, test, expect, beforeEach } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { ThemeSelector } from "./theme-selector"

const setTheme = vi.fn()
const useThemeMock = vi.fn<
  () => { theme: string | undefined; setTheme: typeof setTheme }
>(() => ({ theme: "light", setTheme }))
const captureMock = vi.fn()

vi.mock("next-themes", () => ({
  useTheme: () => useThemeMock(),
}))

vi.mock("@/locales/client", () => ({
  useScopedI18n: () => (key: string) => key,
}))

vi.mock("posthog-js", () => ({
  default: {
    capture: (...args: unknown[]) => captureMock(...args),
  },
}))

beforeEach(() => {
  setTheme.mockClear()
  captureMock.mockClear()
  useThemeMock.mockReturnValue({ theme: "light", setTheme })
})

describe("ThemeSelector", () => {
  test("renders an accessible toggle button", () => {
    render(<ThemeSelector />)
    expect(screen.getByRole("button", { name: /aria/i })).toBeInTheDocument()
  })

  test.each([
    ["light", "dark"],
    ["dark", "light"],
  ] as const)("toggles %s -> %s on click", (from, to) => {
    useThemeMock.mockReturnValue({ theme: from, setTheme })
    render(<ThemeSelector />)

    fireEvent.click(screen.getByRole("button"))

    expect(captureMock).toHaveBeenCalledWith("theme_changed", { from, to })
    expect(setTheme).toHaveBeenCalledWith(to)
  })

  test("defaults to 'light' when theme is undefined", () => {
    useThemeMock.mockReturnValue({ theme: undefined, setTheme })
    render(<ThemeSelector />)

    fireEvent.click(screen.getByRole("button"))

    expect(setTheme).toHaveBeenCalledWith("light")
  })
})
