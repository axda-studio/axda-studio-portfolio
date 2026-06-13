export default {
  eyebrow: "Selected work",
  tagline: "2023 - 2026",
  featuredLabel: "Featured",
  liveLabel: "Live site",
  items: {
    tyklo: {
      year: "2025",
      tech: "WEB",
      imageAlt: "Tyklo timesheet app preview",
      title: { prefix: "Tyklo", emphasis: "Timesheet made easy" },
      tags: "B2B · SaaS",
      description:
        "Web-based timesheet app: submit current-month timesheets, declare leave or absences, receive automated reminders, and access a dashboard of historical entries.",
      metrics: {
        1: { value: "−65%", label: "Time to submit" },
        2: { value: "100%", label: "Test coverage" },
        3: { value: "+38%", label: "On-time submissions" },
        4: { value: "98", label: "Lighthouse perf" },
      },
    },
  },
} as const
