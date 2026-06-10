import { expect, test, describe, vi, beforeEach } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { ContactForm } from "./contact-form"

const captureMock = vi.fn()
vi.mock("posthog-js", () => ({
  default: {
    capture: (...args: unknown[]) => captureMock(...args),
  },
}))

const labels = {
  nameLabel: "Your name",
  namePlaceholder: "Jane Frontend",
  emailLabel: "Email",
  emailPlaceholder: "jane@company.com",
  briefLabel: "Brief",
  briefPlaceholder: "What are you building?",
  submitLabel: "Send",
  mailSubject: "Brief from [name]",
}

let assignedHref = ""
beforeEach(() => {
  captureMock.mockClear()
  assignedHref = ""
  Object.defineProperty(window, "location", {
    configurable: true,
    value: {
      get href() {
        return assignedHref
      },
      set href(value: string) {
        assignedHref = value
      },
    },
  })
})

describe("ContactForm", () => {
  test("renders the three labels and the submit button", () => {
    render(<ContactForm labels={labels} />)
    expect(screen.getByText("Your name")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("Brief")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument()
  })

  test("composes a mailto URL with the brief and captures the event", () => {
    render(<ContactForm labels={labels} />)

    fireEvent.change(screen.getByPlaceholderText("Jane Frontend"), {
      target: { value: "Alyx" },
    })
    fireEvent.change(screen.getByPlaceholderText("jane@company.com"), {
      target: { value: "alyx@example.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("What are you building?"), {
      target: { value: "A landing page" },
    })

    fireEvent.submit(
      screen.getByRole("button", { name: /send/i }).closest("form")!
    )

    expect(assignedHref).toMatch(/^mailto:hello@axda-studio\.fr\?/)
    expect(decodeURIComponent(assignedHref)).toContain(
      "subject=Brief from Alyx"
    )
    expect(decodeURIComponent(assignedHref)).toContain(
      "Alyx <alyx@example.com>"
    )
    expect(decodeURIComponent(assignedHref)).toContain("A landing page")

    expect(captureMock).toHaveBeenCalledWith("contact_brief_submitted", {
      hasName: true,
      hasEmail: true,
      briefLength: "A landing page".length,
    })
  })

  test("falls back to 'Anonymous' in the subject when name is empty", () => {
    render(<ContactForm labels={labels} />)

    fireEvent.change(screen.getByPlaceholderText("jane@company.com"), {
      target: { value: "alyx@example.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("What are you building?"), {
      target: { value: "hi" },
    })
    fireEvent.submit(
      screen.getByRole("button", { name: /send/i }).closest("form")!
    )

    expect(decodeURIComponent(assignedHref)).toContain(
      "subject=Brief from Anonymous"
    )
  })
})
