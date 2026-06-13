export default {
  eyebrow: "About",
  tagline: "Studio of one",
  card: {
    title: "Engineer, with a designer’s eye.",
    paragraph1:
      "I am a Frontend Developer with five years+ dedicated to building digital experiences that prioritize performance, scalability, and visual excellence.",
    paragraph2: {
      template:
        "My journey has taken me across borders, working in dynamic tech hubs like {city1} and {city2}, where I’ve honed my skills and embraced diverse perspectives. I’ve collaborated on projects spanning SaaS, e-commerce, and media tech, building products that grow and drive impact.",
      city1: "Dublin",
      city2: "Amsterdam",
    },
    paragraph3: {
      template:
        "I care about the boring stuff — types, tests, accessibility, performance budgets, analytics from day one — because those are what make the beautiful stuff actually {emphasis}.",
      emphasis: "last",
    },
    facts: {
      now: {
        label: "Now",
        primary: "Senior Frontend Engineer",
        suffix: "freelance",
      },
      based: { label: "Based", primary: "EU", suffix: "Remote" },
      stack: {
        label: "Stack",
        primary: "Next.js · Expo · React · TypeScript",
        suffix: " ",
      },
      animation: { label: "Animation", primary: "Motion", suffix: " " },
      testing: {
        label: "Testing",
        primary: "Vitest · Playwright",
        suffix: " ",
      },
      analytics: { label: "Analytics", primary: "PostHog", suffix: "A/B" },
      languages: {
        label: "Languages",
        primary: "English · French",
        suffix: " ",
      },
    },
    signature: {
      firstName: "Alyx",
      lastName: "Darenne",
      role: "Frontend Developer",
      available: "Available",
    },
  },
} as const
