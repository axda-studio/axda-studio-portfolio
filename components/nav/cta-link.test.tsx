import { expect, test, vi, beforeEach } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { CtaLink } from "./cta-link"

const captureMock = vi.fn()
vi.mock("posthog-js", () => ({
  default: {
    capture: (...args: unknown[]) => captureMock(...args),
  },
}))

beforeEach(() => {
  captureMock.mockClear()
})

test("CtaLink points to the contact anchor", () => {
  render(<CtaLink label="Get in touch" />)
  const link = screen.getByRole("link", { name: /get in touch/i })
  expect(link).toHaveAttribute("href", "#contact")
})

test("CtaLink captures posthog event with label on click", () => {
  render(<CtaLink label="Get in touch" />)
  fireEvent.click(screen.getByRole("link"))
  expect(captureMock).toHaveBeenCalledWith("cta_clicked", {
    label: "Get in touch",
    location: "header",
  })
})
