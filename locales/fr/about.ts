export default {
  eyebrow: "À propos",
  tagline: "Studio solo",
  card: {
    title: "Ingénieur, avec un œil de designer.",
    paragraph1:
      "Je suis Frontend Developer avec cinq ans+ dédiés à construire des expériences numériques qui privilégient la performance, la scalabilité et l’excellence visuelle.",
    paragraph2: {
      template:
        "Mon parcours m’a emmené à travers les frontières, à travailler dans des hubs tech dynamiques comme {city1} et {city2}, où j’ai affûté mes compétences et embrassé des perspectives diverses. J’ai collaboré sur des projets touchant le SaaS, l’e-commerce et la media tech, en construisant des produits qui grandissent et créent de l’impact.",
      city1: "Dublin",
      city2: "Amsterdam",
    },
    paragraph3: {
      template:
        "Je m’intéresse aux choses ennuyeuses — types, tests, accessibilité, budgets de performance, analytics dès le premier jour — parce que c’est ce qui fait que le beau {emphasis} vraiment.",
      emphasis: "dure",
    },
    facts: {
      now: {
        label: "Actuel",
        primary: "Senior Frontend Engineer",
        suffix: "freelance",
      },
      based: { label: "Basé", primary: "UE", suffix: "Remote" },
      stack: {
        label: "Stack",
        primary: "Next.js · Expo · React · TypeScript",
        suffix: " ",
      },
      animation: { label: "Animation", primary: "Motion", suffix: " " },
      testing: {
        label: "Tests",
        primary: "Vitest · Playwright",
        suffix: " ",
      },
      analytics: { label: "Analytics", primary: "PostHog", suffix: "A/B" },
      languages: {
        label: "Langues",
        primary: "Anglais · Français",
        suffix: " ",
      },
    },
    signature: {
      firstName: "Alyx",
      lastName: "Darenne",
      role: "Frontend Developer",
      available: "Disponible",
    },
  },
} as const
