export default {
  eyebrow: "Comment je travaille avec Claude Code",
  tagline: "Spec → livraison",
  card: {
    eyebrow: "Augmenté par l’IA, pas remplacé",
    title: {
      line1: "Livraison plus rapide,",
      line2: "même exigence.",
    },
    description: {
      template:
        "Claude Code, c’est un coéquipier quotidien — jamais un raccourci. Je le pilote spec-first et orchestré par agents, puis je tiens chaque change au {emphasis} qu’aurait toute PR humaine. Les semaines s’écrasent en jours ; la barre de qualité ne bouge pas.",
      emphasis: "même TypeScript, mêmes tests et même review",
    },
    stepsLabel: "La boucle",
    steps: {
      1: { label: "Spec", meta: "Plan & intention, écrits d’abord." },
      2: {
        label: "Build",
        meta: "Orchestré par agents, CLAUDE.md.",
      },
      3: { label: "Test", meta: "Vitest + Playwright, cible 100 %." },
      4: { label: "Review", meta: "Diff lu ligne par ligne, TS strict." },
      5: { label: "Ship", meta: "Endossé par moi avant le merge." },
    },
    foundations: {
      tooling: {
        label: "Outils",
        primary: "CLAUDE.md, sous-agents & contexte MCP",
        suffix: "intégrés.",
      },
      guardrails: {
        label: "Garde-fous",
        primary: "TS strict · 100 % de tests · régression visuelle",
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
