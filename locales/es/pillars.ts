export default {
  eyebrow: "Lo que aporto",
  counter: "3 pilares",
  items: {
    1: {
      label: "Oficio",
      title: { template: "{emphasis} & moderno", emphasis: "Bella" },
      description:
        "UI de primera, transiciones suaves, theming meditado, animaciones que se ganan su lugar.",
    },
    2: {
      label: "Ingeniería",
      title: { template: "{emphasis} & resiliente", emphasis: "Robusto" },
      description:
        "TypeScript estricto, 100 % de cobertura de tests (unit + e2e), estado cuidado, releases sin bugs.",
    },
    3: {
      label: "Impacto",
      title: { template: "{emphasis} de negocio", emphasis: "Visión" },
      description:
        "SEO, Core Web Vitals, accesibilidad, i18n y analytics desde el primer día — para que el crecimiento tenga datos que masticar.",
    },
  },
  badges: {
    motion: "Motion",
    theming: "Theming",
    designSystems: "Sistemas de diseño",
    typescript: "TypeScript",
    vitest: "Vitest",
    playwright: "Playwright",
    seo: "SEO",
    a11yI18n: "A11y · i18n",
    posthog: "PostHog",
  },
} as const
