import { expect, test, describe } from "vitest"
import { render, screen } from "@testing-library/react"

import { SectionHeader } from "./section-header"

describe("SectionHeader", () => {
  test("renders the label children", () => {
    render(<SectionHeader>What I bring</SectionHeader>)
    expect(screen.getByText("What I bring")).toBeInTheDocument()
  })

  test("renders meta when provided", () => {
    render(<SectionHeader meta="3 pillars">What I bring</SectionHeader>)
    expect(screen.getByText("3 pillars")).toBeInTheDocument()
  })

  test("omits meta element when not provided", () => {
    const { container } = render(<SectionHeader>Elsewhere</SectionHeader>)
    // Only one direct child wrapper for the label/dot — no meta sibling.
    expect(container.querySelector(".text-gray-600")).toBeNull()
  })
})
