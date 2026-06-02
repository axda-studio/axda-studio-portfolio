import { expect, test, vi, beforeEach } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { NavLink } from "./nav-link"

const captureMock = vi.fn()
vi.mock("posthog-js", () => ({
  default: {
    capture: (...args: unknown[]) => captureMock(...args),
  },
}))

beforeEach(() => {
  captureMock.mockClear()
})

test("NavLink renders the link with href and children", () => {
  render(
    <NavLink href="/#work" label="work">
      Work
    </NavLink>
  )
  const link = screen.getByRole("link", { name: /work/i })
  expect(link).toHaveAttribute("href", "/#work")
})

test("NavLink captures posthog event with label on click", () => {
  render(
    <NavLink href="/#work" label="work">
      Work
    </NavLink>
  )
  fireEvent.click(screen.getByRole("link"))
  expect(captureMock).toHaveBeenCalledWith("nav_item_clicked", {
    label: "work",
  })
})

test("NavLink renders an optional icon", () => {
  render(
    <NavLink href="/#work" label="work" icon={<svg data-testid="icon" />}>
      Work
    </NavLink>
  )
  expect(screen.getByTestId("icon")).toBeInTheDocument()
})
