import { expect, test, describe } from "vitest"
import { render, screen } from "@testing-library/react"

import { PillarCard } from "./pillar-card"

const basePillar = {
  id: 1,
  label: "Craft",
  title: { template: "{emphasis} & modern", emphasis: "Beautiful" },
  description: "Top-notch UI, smooth transitions.",
  badges: ["Motion", "Theming", "Design systems"],
}

describe("PillarCard", () => {
  test("renders the zero-padded id and label", () => {
    render(<PillarCard {...basePillar} />)
    expect(screen.getByText(/01 — Craft/)).toBeInTheDocument()
  })

  test("zero-pads multi-digit ids up to width 2", () => {
    render(<PillarCard {...basePillar} id={10} />)
    expect(screen.getByText(/10 — Craft/)).toBeInTheDocument()
  })

  test("renders the description", () => {
    render(<PillarCard {...basePillar} />)
    expect(screen.getByText(basePillar.description)).toBeInTheDocument()
  })

  test("renders one list item per badge", () => {
    render(<PillarCard {...basePillar} />)
    const items = screen.getAllByRole("listitem")
    expect(items).toHaveLength(basePillar.badges.length)
    for (const badge of basePillar.badges) {
      expect(screen.getByText(badge)).toBeInTheDocument()
    }
  })

  test.each([
    [
      { template: "{emphasis} & modern", emphasis: "Beautiful" },
      "Beautiful & modern",
    ],
    [{ template: "Business {emphasis}", emphasis: "aware" }, "Business aware"],
    [
      { template: "Before {emphasis} after", emphasis: "middle" },
      "Before middle after",
    ],
  ])("renders title with emphasis in any position (%j)", (title, expected) => {
    const { container } = render(<PillarCard {...basePillar} title={title} />)
    const titleEl = container.querySelector('[data-slot="card-title"]')
    expect(titleEl?.textContent).toBe(expected)
  })

  test("wraps the emphasis word in a styled span", () => {
    const { container } = render(<PillarCard {...basePillar} />)
    const titleEl = container.querySelector('[data-slot="card-title"]')
    const emphasisSpan = titleEl?.querySelector("span")
    expect(emphasisSpan).not.toBeNull()
    expect(emphasisSpan?.textContent).toBe("Beautiful")
    expect(emphasisSpan?.className).toMatch(/italic/)
  })
})
