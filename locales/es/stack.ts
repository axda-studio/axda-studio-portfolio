export default {
  eyebrow: "Stack y herramientas",
  tagline: "Moderno · tipado · testeado",
  items: {
    1: {
      label: "WEB",
      title: "Next.js",
      description: {
        template: "App router, RSC, ISR en edge, streaming.{code}",
        code: " ",
      },
    },
    2: {
      label: "MÓVIL",
      title: "Expo",
      description: {
        template: "Builds EAS, actualizaciones OTA, módulos nativos.{code}",
        code: " ",
      },
    },
    3: {
      label: "BASE",
      title: "React + TypeScript",
      description: {
        template: "Modo estricto, fronteras zod, sin {code}.",
        code: "any",
      },
    },
    4: {
      label: "ANIMACIÓN",
      title: "Motion",
      description: {
        template: "Layout, gestos, scroll, respetando reduced-motion.{code}",
        code: " ",
      },
    },
    5: {
      label: "TESTING",
      title: "Vitest + Playwright",
      description: {
        template: "Unitario, integración, e2e, regresión visual en CI.{code}",
        code: " ",
      },
    },
    6: {
      label: "ANALÍTICA",
      title: "PostHog",
      description: {
        template: "Eventos, funnels, tests A/B, session replay.{code}",
        code: " ",
      },
    },
    7: {
      label: "VELOCIDAD",
      title: "Claude Code",
      description: {
        template:
          "Bucle dev agéntico — scaffolds, refactors, tests, docs.{code}",
        code: " ",
      },
    },
    8: {
      label: "ALCANCE",
      title: "SEO · A11y · i18n",
      description: {
        template: "HTML semántico, schema, WCAG AA, i18n con tipos.{code}",
        code: " ",
      },
    },
  },
} as const
