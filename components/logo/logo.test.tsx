import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { Logo } from "./logo"

test("Logo renders a link to home", () => {
  render(<Logo variant="desktop" />)
  const link = screen.getByRole("link", { name: /axda studio/i })
  expect(link).toHaveAttribute("href", "/")
})

test.each([
  ["desktop", ["h-8", "w-8"]],
  ["mobile", ["h-6", "w-6"]],
] as const)("Logo applies %s sizing classes", (variant, expectedClasses) => {
  const { container } = render(<Logo variant={variant} />)
  const svg = container.querySelector("svg")
  expect(svg).toHaveClass(...expectedClasses)
})
