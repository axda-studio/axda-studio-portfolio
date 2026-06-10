import { expect, test, describe } from "vitest"
import { render, screen } from "@testing-library/react"

import { AvailabilityBadge } from "./availability-badge"

describe("AvailabilityBadge", () => {
  test("renders the children text", () => {
    render(<AvailabilityBadge>Open to roles</AvailabilityBadge>)
    expect(screen.getByText("Open to roles")).toBeInTheDocument()
  })

  test("merges custom className with the base styles", () => {
    const { container } = render(
      <AvailabilityBadge className="hidden lg:flex">Hi</AvailabilityBadge>
    )
    const badge = container.firstElementChild
    expect(badge).toHaveClass("rounded-full", "border", "hidden", "lg:flex")
  })
})
