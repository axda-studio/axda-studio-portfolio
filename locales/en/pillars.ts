export default {
  eyebrow: "What I bring",
  counter: "3 pillars",
  items: {
    1: {
      label: "Craft",
      title: { template: "{emphasis} & modern", emphasis: "Beautiful" },
      description:
        "Top-notch UI, smooth transitions, considered theming, motion that earns its place.",
    },
    2: {
      label: "Engineering",
      title: { template: "{emphasis} & resilient", emphasis: "Robust" },
      description:
        "Strict TypeScript, 100% test coverage (unit + e2e), thoughtful state, bug-proof releases.",
    },
    3: {
      label: "Impact",
      title: { template: "Business {emphasis}", emphasis: "aware" },
      description:
        "SEO, Core Web Vitals, A11y, i18n, and analytics shipped on day one — so growth has data to chew on.",
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
