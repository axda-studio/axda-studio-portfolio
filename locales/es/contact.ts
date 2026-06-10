export default {
  eyebrow: "Contacto",
  tagline: "Respuesta en 48 h",
  card: {
    title: {
      template: "Construyamos algo {emphasis}.",
      emphasis: "excepcional",
    },
    scheduleCta: "Agendar una llamada",
    quickLinks: {
      cal: "calendar/axda-studio",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      status: { label: "ESTADO", value: "Abierto a oportunidades" },
      timezone: { label: "ZONA", value: "CET · ±4 h flexible" },
      reply: { label: "RESPUESTA", value: "En 48 horas" },
      brand: "Axda Studio · Remote",
    },
  },
  form: {
    eyebrow: "O envía un brief",
    nameLabel: "Tu nombre",
    namePlaceholder: "Jane Frontend",
    emailLabel: "Email",
    emailPlaceholder: "jane@empresa.com",
    briefLabel: "Brief",
    briefPlaceholder: "¿Qué estás construyendo?",
    submitLabel: "Enviar",
    mailSubject: "Brief de [name]",
  },
  elsewhere: {
    eyebrow: "En otros lugares",
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
