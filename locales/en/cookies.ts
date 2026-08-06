export default {
  title: "Cookies, briefly",
  description:
    "One EU-hosted analytics tool, used to count visits and catch broken pages. Nothing loads until you agree.",
  acceptAll: "Accept",
  rejectAll: "Decline",
  customize: "Customize",
  save: "Save choices",
  close: "Close",
  settings: "Cookies",
  policyLink: "Read the privacy notice.",
  categories: {
    essential: {
      label: "Essential",
      description: "Language, theme and this very choice.",
      alwaysOn: "Always on",
    },
    analytics: {
      label: "Analytics",
      description:
        "Anonymous page views, session recordings and error reports (PostHog, EU).",
    },
  },
} as const
