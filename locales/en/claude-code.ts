export default {
  eyebrow: "How I work with Claude Code",
  tagline: "Spec → ship",
  card: {
    title: {
      line1: "Faster delivery,",
      line2: "same bar.",
    },
    description:
      "I use Claude Code as a daily teammate — not a magic wand. Spec-driven and agent-orchestrated, with the same TypeScript, tests and reviews any human PR would get. Weeks become days; every line is still read, reviewed and owned by me before it merges.",
    steps: {
      1: { label: "Spec", meta: "Plan & intent, written first." },
      2: {
        label: "Build",
        meta: "Agent-orchestrated, CLAUDE.md per repo.",
      },
      3: { label: "Test", meta: "Vitest + Playwright, 100% target." },
      4: { label: "Review", meta: "Diff read line-by-line, strict TS." },
      5: { label: "Ship", meta: "Owned by me before it merges." },
    },
    foundations: {
      tooling: {
        label: "Tooling",
        primary: "Custom CLAUDE.md per repo, sub-agents & MCP context",
        suffix: "wired in.",
      },
      guardrails: {
        label: "Guardrails",
        primary: "Strict TS, 100% test target, visual regression",
        suffix: "in CI.",
      },
      lift: {
        label: "Typical lift",
        emphasis: "2–3×",
        text: "throughput on scaffold & refactor work.",
      },
    },
    never: {
      label: "Never:",
      text: "unreviewed merges, hallucinated APIs, or “AI slop” UI.",
    },
  },
} as const
