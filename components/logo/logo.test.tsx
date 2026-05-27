import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"

import { Logo } from "./logo"

test("Logo renders a link to home", () => {
  render(<Logo />)
  const link = screen.getByRole("link", { name: /axda studio/i })
  expect(link).toHaveAttribute("href", "/")
})
