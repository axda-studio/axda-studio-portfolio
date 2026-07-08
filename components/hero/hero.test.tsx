import { expect, test, describe, vi, beforeEach } from "vitest"
import { act, fireEvent, render, screen } from "@testing-library/react"
import posthog from "posthog-js"

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
  vi.mocked(posthog.capture).mockClear()
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
    vi.useFakeTimers()
    try {
      render(<Hero {...baseProps} />)
      // Typewriter reveals one character per tick after an initial delay.
      // Advance well past the full sequence so the heading is fully typed.
      act(() => {
        vi.advanceTimersByTime(5000)
      })
      const heading = screen.getByRole("heading", { level: 1 })
      expect(heading).toHaveTextContent("Beautiful")
      expect(heading).toHaveTextContent("UI")
      expect(heading).toHaveTextContent("built to last.")
    } finally {
      vi.useRealTimers()
    }
  })

  test("renders a caret next to the emphasis while it is being typed", () => {
    vi.useFakeTimers()
    try {
      render(<Hero {...baseProps} />)
      // prefix "Beautiful" (9 chars) is fully revealed after 200ms delay +
      // 9 * 60ms = 740ms. Advancing to ~800ms puts us mid-emphasis so the
      // in-emphasis caret is on-screen.
      act(() => {
        vi.advanceTimersByTime(800)
      })
      const heading = screen.getByRole("heading", { level: 1 })
      expect(heading).toHaveTextContent("Beautiful")
      expect(heading).not.toHaveTextContent("built to last.")
    } finally {
      vi.useRealTimers()
    }
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

  test("primary CTA click captures cta_clicked with work target", () => {
    render(<Hero {...baseProps} />)
    fireEvent.click(screen.getByRole("link", { name: /see selected work/i }))
    expect(posthog.capture).toHaveBeenCalledWith("cta_clicked", {
      label: "See selected work",
      location: "hero",
      target: "work",
    })
  })

  test("secondary CTA click captures cta_clicked with booking target and send_instantly", () => {
    render(<Hero {...baseProps} />)
    fireEvent.click(screen.getByRole("link", { name: /schedule a call/i }))
    expect(posthog.capture).toHaveBeenCalledWith(
      "cta_clicked",
      { label: "Schedule a call", location: "hero", target: "booking" },
      { send_instantly: true }
    )
  })
})
