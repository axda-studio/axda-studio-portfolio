import { expect, test, describe } from "vitest"
import { render, screen } from "@testing-library/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

describe("AccordionTrigger", () => {
  test("falls back to the default chevron icons when no icon prop is passed", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="only">
          <AccordionTrigger>Question</AccordionTrigger>
          <AccordionContent>Answer</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole("button", { name: "Question" })
    // Both default chevrons are rendered — CSS handles which is visible.
    expect(
      trigger.querySelectorAll('[data-slot="accordion-trigger-icon"]')
    ).toHaveLength(2)
  })

  test("uses the custom icon when the icon prop is provided", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="only">
          <AccordionTrigger icon={<span data-testid="custom-icon" />}>
            Question
          </AccordionTrigger>
          <AccordionContent>Answer</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
    expect(
      document.querySelectorAll('[data-slot="accordion-trigger-icon"]')
    ).toHaveLength(0)
  })
})
