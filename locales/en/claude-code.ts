export default {
  eyebrow: "How I work with Claude Code",
  tagline: "Spec → ship",
  card: {
    eyebrow: "AI-augmented, not AI-replaced",
    title: {
      line1: "Faster delivery,",
      line2: "same bar.",
    },
    description: {
      template:
        "Claude Code is a daily teammate — never a shortcut. I drive it spec-first and agent-orchestrated, then hold every change to the {emphasis} any human PR would face. Weeks collapse into days; the quality bar doesn’t move.",
      emphasis: "same TypeScript, tests and review",
    },
    stepsLabel: "The loop",
    steps: {
      1: { label: "Spec", meta: "Plan & intent, written first." },
      2: {
        label: "Build",
        meta: "Agent-orchestrated, CLAUDE.md.",
      },
      3: { label: "Test", meta: "Vitest + Playwright, 100% target." },
      4: { label: "Review", meta: "Diff read line-by-line, strict TS." },
      5: { label: "Ship", meta: "Owned by me before it merges." },
    },
    foundations: {
      tooling: {
        label: "Tooling",
        primary: "CLAUDE.md, sub-agents & MCP context",
        suffix: "wired in.",
      },
      guardrails: {
        label: "Guardrails",
        primary: "Strict TS · 100% tests · visual regression",
        suffix: "in CI.",
      },
      lift: {
        label: "Typical lift",
        emphasis: "2–3×",
        text: "throughput on scaffold & refactor.",
      },
    },
    never: {
      label: "Never:",
      text: "unreviewed merges, hallucinated APIs, or “AI slop” UI.",
    },
  },
} as const
