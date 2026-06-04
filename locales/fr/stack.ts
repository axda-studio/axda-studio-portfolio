export default {
  eyebrow: "Stack & outils",
  tagline: "Moderne · typé · testé",
  items: {
    1: {
      label: "WEB",
      title: "Next.js",
      description: {
        template: "App router, RSC, ISR edge, streaming.{code}",
        code: " ",
      },
    },
    2: {
      label: "MOBILE",
      title: "Expo",
      description: {
        template: "Builds EAS, mises à jour OTA, modules natifs.{code}",
        code: " ",
      },
    },
    3: {
      label: "SOCLE",
      title: "React + TypeScript",
      description: {
        template: "Mode strict, frontières zod, pas de {code}.",
        code: "any",
      },
    },
    4: {
      label: "ANIMATION",
      title: "Motion",
      description: {
        template:
          "Layout, gestes, défilement, respect du reduced-motion.{code}",
        code: " ",
      },
    },
    5: {
      label: "TESTS",
      title: "Vitest + Playwright",
      description: {
        template:
          "Unitaire, intégration, e2e, régression visuelle en CI.{code}",
        code: " ",
      },
    },
    6: {
      label: "ANALYTICS",
      title: "PostHog",
      description: {
        template: "Événements, funnels, A/B tests, session replay.{code}",
        code: " ",
      },
    },
    7: {
      label: "VITESSE",
      title: "Claude Code",
      description: {
        template:
          "Boucle dev agentique — scaffolds, refactors, tests, docs.{code}",
        code: " ",
      },
    },
    8: {
      label: "PORTÉE",
      title: "SEO · A11y · i18n",
      description: {
        template: "HTML sémantique, schema, WCAG AA, i18n typée.{code}",
        code: " ",
      },
    },
  },
} as const
