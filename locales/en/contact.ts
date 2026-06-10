export default {
  eyebrow: "Contact",
  tagline: "Reply within 48h",
  card: {
    title: {
      template: "Let’s build something {emphasis}.",
      emphasis: "exceptional",
    },
    scheduleCta: "Schedule a call",
    quickLinks: {
      cal: "calendar/axda-studio",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      status: { label: "STATUS", value: "Open to opportunities" },
      timezone: { label: "TIMEZONE", value: "CET · ±4h flexible" },
      reply: { label: "REPLY", value: "Within 48 hours" },
      brand: "Axda Studio · Remote",
    },
  },
  form: {
    eyebrow: "Or send a brief",
    nameLabel: "Your name",
    namePlaceholder: "Jane Frontend",
    emailLabel: "Email",
    emailPlaceholder: "jane@company.com",
    briefLabel: "Brief",
    briefPlaceholder: "What are you building?",
    submitLabel: "Send",
    mailSubject: "Brief from [name]",
  },
  elsewhere: {
    eyebrow: "Elsewhere",
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
