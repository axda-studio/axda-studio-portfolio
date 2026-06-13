export default {
  eyebrow: "Comment je travaille avec Claude Code",
  tagline: "Spec → livraison",
  card: {
    title: {
      line1: "Livraison plus rapide,",
      line2: "même exigence.",
    },
    description:
      "Claude Code, c’est un coéquipier quotidien — pas une baguette magique. Spec-driven et orchestré par agents, avec les mêmes TypeScript, tests et review qu’aurait n’importe quelle PR humaine. Les semaines deviennent des jours ; chaque ligne reste lue, relue et endossée par moi avant le merge.",
    steps: {
      1: { label: "Spec", meta: "Plan & intention, écrits d’abord." },
      2: {
        label: "Build",
        meta: "Orchestré par agents, CLAUDE.md par repo.",
      },
      3: { label: "Test", meta: "Vitest + Playwright, cible 100 %." },
      4: { label: "Review", meta: "Diff lu ligne par ligne, TS strict." },
      5: { label: "Ship", meta: "Endossé par moi avant le merge." },
    },
    foundations: {
      tooling: {
        label: "Outils",
        primary: "CLAUDE.md custom par repo, sous-agents & contexte MCP",
        suffix: "intégrés.",
      },
      guardrails: {
        label: "Garde-fous",
        primary: "TS strict, cible 100 % de tests, régression visuelle",
        suffix: "en CI.",
      },
      lift: {
        label: "Gain typique",
        emphasis: "2–3×",
        text: "de débit sur le scaffold & le refactor.",
      },
    },
    never: {
      label: "Jamais :",
      text: "merges sans review, APIs hallucinées, ou UI « AI slop ».",
    },
  },
} as const
