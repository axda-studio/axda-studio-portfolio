export default {
  title: "Cookies, en bref",
  description:
    "Un seul outil de mesure, hébergé en UE, pour compter les visites et repérer les pages cassées. Rien ne se charge sans votre accord.",
  acceptAll: "Accepter",
  rejectAll: "Refuser",
  customize: "Personnaliser",
  save: "Enregistrer",
  close: "Fermer",
  settings: "Cookies",
  policyLink: "Lire la politique de confidentialité.",
  categories: {
    essential: {
      label: "Essentiels",
      description: "Langue, thème et ce choix précis.",
      alwaysOn: "Toujours actifs",
    },
    analytics: {
      label: "Mesure d’audience",
      description:
        "Pages vues anonymes, enregistrements de navigation et rapports d’erreurs (PostHog, UE).",
    },
  },
} as const
