export default {
  eyebrow: "Ce que j’apporte",
  counter: "3 piliers",
  items: {
    1: {
      label: "Artisanat",
      title: { template: "{emphasis} & moderne", emphasis: "Belle" },
      description:
        "UI haut de gamme, transitions fluides, theming réfléchi, animations qui méritent leur place.",
    },
    2: {
      label: "Ingénierie",
      title: { template: "{emphasis} & résilient", emphasis: "Robuste" },
      description:
        "TypeScript strict, 100 % de couverture de tests (unit + e2e), état soigné, releases sans bug.",
    },
    3: {
      label: "Impact",
      title: { template: "Sens {emphasis}", emphasis: "produit" },
      description:
        "SEO, Core Web Vitals, accessibilité, i18n et analytics livrés dès le premier jour — pour que la croissance ait de la donnée à mâcher.",
    },
  },
  badges: {
    motion: "Motion",
    theming: "Theming",
    designSystems: "Design systems",
    typescript: "TypeScript",
    vitest: "Vitest",
    playwright: "Playwright",
    seo: "SEO",
    a11yI18n: "A11y · i18n",
    posthog: "PostHog",
  },
} as const
