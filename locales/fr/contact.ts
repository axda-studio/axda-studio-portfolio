export default {
  eyebrow: "Contact",
  tagline: "Réponse sous 48 h",
  card: {
    title: {
      template: "Construisons quelque chose {emphasis}.",
      emphasis: "d’exceptionnel",
    },
    scheduleCta: "Planifier un appel",
    quickLinks: {
      cal: "calendar/axda-studio",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      status: { label: "STATUT", value: "Ouvert aux opportunités" },
      timezone: { label: "FUSEAU", value: "CET · ±4 h flexible" },
      reply: { label: "RÉPONSE", value: "Sous 48 heures" },
      brand: "Axda Studio · Remote",
    },
  },
  form: {
    eyebrow: "Ou envoyez un brief",
    nameLabel: "Votre nom",
    namePlaceholder: "Jane Frontend",
    emailLabel: "Email",
    emailPlaceholder: "jane@entreprise.com",
    briefLabel: "Brief",
    briefPlaceholder: "Que construisez-vous ?",
    submitLabel: "Envoyer",
    mailSubject: "Brief de [name]",
  },
  elsewhere: {
    eyebrow: "Ailleurs",
    items: {
      github: { label: "GITHUB", value: "https://github.com/axda-studio" },
      linkedin: {
        label: "LINKEDIN",
        value: "https://www.linkedin.com/in/alyx-darenne",
      },
      cal: {
        label: "CAL",
        value: "https://calendar.app.google/VEmfweYv5o8gjiva6",
      },
      email: { label: "EMAIL", value: "hello@axda-studio.fr" },
    },
  },
} as const
