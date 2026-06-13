import { expect, test, describe } from "vitest"
import { render, screen } from "@testing-library/react"

import { AboutCard } from "./about-card"

const baseProps = {
  title: "Engineer, with a designer’s eye.",
  paragraph1: "First paragraph copy.",
  paragraph2: "Second paragraph copy.",
  paragraph3: "Third paragraph copy.",
  facts: [
    { key: "now", label: "Now", primary: "Senior", suffix: "freelance" },
    { key: "stack", label: "Stack", primary: "Next.js", suffix: " " },
  ],
  signature: {
    firstName: "Alyx",
    lastName: "Darenne",
    role: "Frontend Developer",
    available: "Available",
  },
}

describe("AboutCard", () => {
  test("renders the title", () => {
    render(<AboutCard {...baseProps} />)
    expect(screen.getByText(baseProps.title)).toBeInTheDocument()
  })

  test("renders all three paragraphs", () => {
    render(<AboutCard {...baseProps} />)
    expect(screen.getByText("First paragraph copy.")).toBeInTheDocument()
    expect(screen.getByText("Second paragraph copy.")).toBeInTheDocument()
    expect(screen.getByText("Third paragraph copy.")).toBeInTheDocument()
  })

  test("renders fact labels and primary values", () => {
    render(<AboutCard {...baseProps} />)
    expect(screen.getByText("Now")).toBeInTheDocument()
    expect(screen.getByText("Senior")).toBeInTheDocument()
    expect(screen.getByText("Stack")).toBeInTheDocument()
    expect(screen.getByText("Next.js")).toBeInTheDocument()
  })

  test("renders the suffix only when non-whitespace", () => {
    render(<AboutCard {...baseProps} />)
    // "freelance" suffix is rendered with separator
    expect(screen.getByText(/·\s*freelance/)).toBeInTheDocument()
    // " " (space-only) suffix should not produce a visible separator
    expect(screen.queryByText(/·(?!\s*freelance)/)).toBeNull()
  })

  test("renders the signature name, role, and Available badge", () => {
    render(<AboutCard {...baseProps} />)
    expect(screen.getByText("Alyx Darenne")).toBeInTheDocument()
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument()
    expect(screen.getByText("Available")).toBeInTheDocument()
  })

  test("avatar shows initials computed from first + last name", () => {
    const { container } = render(<AboutCard {...baseProps} />)
    const avatar = container.querySelector('[aria-hidden="true"]')
    expect(avatar?.textContent).toBe("AD")
  })
})
