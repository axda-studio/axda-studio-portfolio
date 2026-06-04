import { expect, test, describe } from "vitest"
import { render, screen } from "@testing-library/react"

import { StackCard } from "./stack-card"

const baseItem = {
  label: "WEB",
  title: "Next.js",
  description: {
    template: "App router, RSC, edge ISR, streaming.{code}",
    code: " ",
  },
}

describe("StackCard", () => {
  test("renders the uppercase label in the eyebrow", () => {
    render(<StackCard {...baseItem} />)
    expect(screen.getByText("WEB")).toBeInTheDocument()
  })

  test("renders the title", () => {
    const { container } = render(<StackCard {...baseItem} />)
    const titleEl = container.querySelector('[data-slot="card-title"]')
    expect(titleEl?.textContent).toBe("Next.js")
  })

  test("strips the trailing {code} placeholder when code is empty", () => {
    const { container } = render(<StackCard {...baseItem} />)
    const descEl = container.querySelector('[data-slot="card-description"]')
    expect(descEl?.textContent).toBe("App router, RSC, edge ISR, streaming.")
    expect(descEl?.querySelector("code")).toBeNull()
  })

  test("renders inline <code> when code is non-empty", () => {
    const { container } = render(
      <StackCard
        label="FOUNDATION"
        title="React + TypeScript"
        description={{
          template: "Strict mode, zod boundaries, no {code}.",
          code: "any",
        }}
      />
    )
    const descEl = container.querySelector('[data-slot="card-description"]')
    const codeEl = descEl?.querySelector("code")
    expect(codeEl?.textContent).toBe("any")
    expect(descEl?.textContent).toBe("Strict mode, zod boundaries, no any.")
  })
})
