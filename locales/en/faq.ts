export default {
  eyebrow: "Frequent questions",
  tagline: "Short answers",
  items: {
    1: {
      question: "What kind of roles are you open to?",
      answer:
        "Senior frontend / staff frontend, remote (EU timezones), or focused freelance engagements (4–12 weeks). I’m not currently looking for full-stack or backend-heavy roles.",
    },
    2: {
      question: "Do you build mobile apps too?",
      answer:
        "Yes — with Expo (React Native). Same toolkit, same engineering standards: TypeScript, tested, analytics-instrumented, gesture and motion done well.",
    },
    3: {
      question: "Why 100% test coverage?",
      answer:
        "It’s a forcing function — not the goal. Aiming for 100% with Vitest + Playwright means design decisions surface early, regressions get caught in CI, and refactors stay cheap. The actual number is less interesting than the discipline behind it.",
    },
    4: {
      question: "How do you handle analytics & SEO?",
      answer:
        "PostHog from day one — page views, custom events, funnels, A/B tests where it matters. SEO is built in: semantic HTML, structured data, sitemap/robots, OG/Twitter cards, edge rendering for the Lighthouse-sensitive routes.",
    },
    5: {
      question: "What’s your take on AI-assisted coding?",
      answer:
        "I use Claude Code daily and seriously — spec-driven, agent-orchestrated, with strict TS and tests as guardrails. It compresses scaffolding, refactors and test coverage from weeks to days. It does not replace review, taste, or ownership: every line still gets read and approved before it merges.",
    },
    6: {
      question: "Can you join an existing codebase?",
      answer:
        "Yes — that’s most of my work. I read carefully, match your conventions, and earn the right to suggest improvements before pushing them.",
    },
  },
} as const
