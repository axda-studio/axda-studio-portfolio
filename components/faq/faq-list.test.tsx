import { expect, test, describe } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { FaqList } from "./faq-list"

const items = [
  { id: 1, question: "First question?", answer: "First answer." },
  { id: 2, question: "Second question?", answer: "Second answer." },
  { id: 3, question: "Third question?", answer: "Third answer." },
]

describe("FaqList", () => {
  test("renders one trigger per item", () => {
    render(<FaqList items={items} />)
    const triggers = screen.getAllByRole("button")
    expect(triggers).toHaveLength(items.length)
    for (const { question } of items) {
      expect(screen.getByRole("button", { name: question })).toBeInTheDocument()
    }
  })

  test("answers start hidden", () => {
    render(<FaqList items={items} />)
    for (const { question } of items) {
      expect(screen.getByRole("button", { name: question })).toHaveAttribute(
        "aria-expanded",
        "false"
      )
    }
  })

  test("clicking a trigger expands it and reveals the answer", () => {
    render(<FaqList items={items} />)
    const trigger = screen.getByRole("button", { name: items[0].question })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText(items[0].answer)).toBeInTheDocument()
  })

  test("multiple items can be open simultaneously", () => {
    render(<FaqList items={items} />)
    fireEvent.click(screen.getByRole("button", { name: items[0].question }))
    fireEvent.click(screen.getByRole("button", { name: items[1].question }))
    expect(
      screen.getByRole("button", { name: items[0].question })
    ).toHaveAttribute("aria-expanded", "true")
    expect(
      screen.getByRole("button", { name: items[1].question })
    ).toHaveAttribute("aria-expanded", "true")
  })
})
