import { expect, test, describe, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"

import { Hero } from "./hero"

vi.mock("posthog-js", () => ({
  default: {
    capture: vi.fn(),
  },
}))

// TrackedSection wires up an IntersectionObserver on mount; jsdom doesn't
// ship one. Stub a no-op so the hero can mount without throwing.
class NoopIntersectionObserver {
  disconnect = vi.fn()
  observe = vi.fn()
  unobserve = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ""
  thresholds: ReadonlyArray<number> = []
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", NoopIntersectionObserver)
})

const baseProps = {
  tagline: {
    role: "Frontend Developer",
    skills: "Web & Mobile",
  },
  title: {
    headline: {
      prefix: "Beautiful",
      emphasis: "UI",
    },
    tail: "built to last.",
  },
  subtitle: {
    prefix: "Interfaces engineered for resilience and optimized for",
    emphasis: "growth.",
  },
  ctaPrimary: "See selected work",
  ctaSecondary: "Schedule a call",
}

describe("Hero", () => {
  test("renders the heading with the headline prefix, emphasis, and tail", () => {
    render(<Hero {...baseProps} />)
    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toHaveTextContent("Beautiful")
    expect(heading).toHaveTextContent("UI")
    expect(heading).toHaveTextContent("built to last.")
  })

  test("renders the tagline role and skills", () => {
    render(<Hero {...baseProps} />)
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument()
    expect(screen.getByText("Web & Mobile")).toBeInTheDocument()
  })

  test("renders the subtitle prefix and the underlined emphasis", () => {
    render(<Hero {...baseProps} />)
    expect(
      screen.getByText(/interfaces engineered for resilience/i)
    ).toBeInTheDocument()
    expect(screen.getByText("growth.")).toBeInTheDocument()
  })

  test("primary CTA links to the work anchor", () => {
    render(<Hero {...baseProps} />)
    const cta = screen.getByRole("link", { name: /see selected work/i })
    expect(cta).toHaveAttribute("href", "#work")
  })

  test("secondary CTA opens the booking link in a new tab with safe rel", () => {
    render(<Hero {...baseProps} />)
    const booking = screen.getByRole("link", { name: /schedule a call/i })
    expect(booking).toHaveAttribute("target", "_blank")
    const rel = booking.getAttribute("rel") ?? ""
    expect(rel).toContain("noopener")
    expect(rel).toContain("noreferrer")
  })
})
