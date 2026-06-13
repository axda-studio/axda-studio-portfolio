export default {
  eyebrow: "Projets sélectionnés",
  tagline: "2023 - 2026",
  featuredLabel: "Vedette",
  liveLabel: "Site en ligne",
  items: {
    tyklo: {
      year: "2025",
      tech: "WEB",
      imageAlt: "Aperçu de l’app Tyklo",
      title: {
        prefix: "Tyklo",
        emphasis: "Le pointage en toute simplicité",
      },
      tags: "B2B · SaaS",
      description:
        "App web de feuilles de temps : soumettre la feuille du mois en cours, déclarer congés et absences, recevoir des rappels automatiques et accéder à l’historique via un tableau de bord.",
      metrics: {
        1: { value: "−65%", label: "Temps de soumission" },
        2: { value: "100%", label: "Couverture de tests" },
        3: { value: "+38%", label: "Soumissions à temps" },
        4: { value: "98", label: "Perf Lighthouse" },
      },
    },
  },
} as const
