export default {
  eyebrow: "Cómo trabajo con Claude Code",
  tagline: "Spec → entrega",
  card: {
    title: {
      line1: "Entrega más rápida,",
      line2: "mismo nivel.",
    },
    description:
      "Uso Claude Code como un compañero diario — no una varita mágica. Spec-driven y orquestado por agentes, con el mismo TypeScript, tests y revisión que tendría cualquier PR humana. Semanas se vuelven días; cada línea se sigue leyendo, revisando y asumiendo por mí antes del merge.",
    steps: {
      1: { label: "Spec", meta: "Plan e intención, escritos primero." },
      2: {
        label: "Build",
        meta: "Orquestado por agentes, CLAUDE.md por repo.",
      },
      3: { label: "Test", meta: "Vitest + Playwright, objetivo 100 %." },
      4: {
        label: "Review",
        meta: "Diff leído línea a línea, TS estricto.",
      },
      5: { label: "Ship", meta: "Asumido por mí antes del merge." },
    },
    foundations: {
      tooling: {
        label: "Herramientas",
        primary: "CLAUDE.md propio por repo, sub-agentes y contexto MCP",
        suffix: "integrados.",
      },
      guardrails: {
        label: "Guardarraíles",
        primary: "TS estricto, objetivo 100 % de tests, regresión visual",
        suffix: "en CI.",
      },
      lift: {
        label: "Ganancia típica",
        emphasis: "2–3×",
        text: "de rendimiento en scaffold y refactor.",
      },
    },
    never: {
      label: "Nunca:",
      text: "merges sin revisar, APIs alucinadas o UI «AI slop».",
    },
  },
} as const
