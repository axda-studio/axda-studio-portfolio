export default {
  eyebrow: "Cómo trabajo con Claude Code",
  tagline: "Spec → entrega",
  card: {
    eyebrow: "Aumentado por IA, no reemplazado",
    title: {
      line1: "Entrega más rápida,",
      line2: "mismo nivel.",
    },
    description: {
      template:
        "Claude Code es un compañero diario — nunca un atajo. Lo conduzco spec-first y orquestado por agentes, y luego someto cada cambio al {emphasis} que tendría cualquier PR humana. Las semanas se reducen a días; la barra de calidad no se mueve.",
      emphasis: "mismo TypeScript, mismos tests y misma revisión",
    },
    stepsLabel: "El bucle",
    steps: {
      1: { label: "Spec", meta: "Plan e intención, escritos primero." },
      2: {
        label: "Build",
        meta: "Orquestado por agentes, CLAUDE.md.",
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
        primary: "CLAUDE.md, sub-agentes y contexto MCP",
        suffix: "integrados.",
      },
      guardrails: {
        label: "Guardarraíles",
        primary: "TS estricto · 100 % de tests · regresión visual",
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
