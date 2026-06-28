import { expect, test, describe } from "vitest"
import { render, screen } from "@testing-library/react"

import { ClaudeCodeCard } from "./claude-code-card"

const baseProps = {
  eyebrow: "AI-augmented, not AI-replaced",
  title: { line1: "Faster delivery,", line2: "same bar." },
  description: "Lorem ipsum description of the workflow.",
  stepsLabel: "The loop",
  steps: [
    { id: 1, label: "Spec", meta: "Plan & intent." },
    { id: 2, label: "Build", meta: "Agent-orchestrated." },
    { id: 3, label: "Test", meta: "Vitest + Playwright." },
    { id: 4, label: "Review", meta: "Line-by-line." },
    { id: 5, label: "Ship", meta: "Before merge." },
  ],
  foundations: {
    tooling: { label: "Tooling", primary: "Stuff", suffix: "wired in." },
    guardrails: { label: "Guardrails", primary: "Strict TS", suffix: "in CI." },
    lift: {
      label: "Typical lift",
      emphasis: "2–3×",
      text: "throughput on refactor.",
    },
  },
  never: { label: "Never:", text: "unreviewed merges." },
}

describe("ClaudeCodeCard", () => {
  test("renders both title lines", () => {
    render(<ClaudeCodeCard {...baseProps} />)
    expect(screen.getByText("Faster delivery,")).toBeInTheDocument()
    expect(screen.getByText("same bar.")).toBeInTheDocument()
  })

  test("renders the description paragraph", () => {
    render(<ClaudeCodeCard {...baseProps} />)
    expect(
      screen.getByText("Lorem ipsum description of the workflow.")
    ).toBeInTheDocument()
  })

  test("renders all five steps once (mobile list only)", () => {
    // The desktop <ol> is currently commented out; steps only render in the
    // mobile <ul>. JSDOM doesn't apply `lg:hidden`, so the <ul> is in the
    // document at all viewports.
    render(<ClaudeCodeCard {...baseProps} />)
    for (const { label } of baseProps.steps) {
      expect(screen.getAllByText(label)).toHaveLength(1)
    }
  })

  test("renders step meta in the mobile list", () => {
    render(<ClaudeCodeCard {...baseProps} />)
    for (const { meta } of baseProps.steps) {
      expect(screen.getAllByText(meta)).toHaveLength(1)
    }
  })

  test("renders all three foundation blocks", () => {
    render(<ClaudeCodeCard {...baseProps} />)
    expect(screen.getByText("Tooling")).toBeInTheDocument()
    expect(screen.getByText("Guardrails")).toBeInTheDocument()
    expect(screen.getByText("Typical lift")).toBeInTheDocument()
    expect(screen.getByText("2–3×")).toBeInTheDocument()
  })

  test("renders the desktop terminal mock with the prompt label", () => {
    render(<ClaudeCodeCard {...baseProps} />)
    // TerminalMock has aria-hidden on the wrapper; we assert by looking for
    // any text fragment that the mock renders. The terminal's title bar reads
    // "~/axda — claude code".
    expect(
      screen.getByText(/~\/axda studio\s*—\s*claude code/i)
    ).toBeInTheDocument()
  })
})
