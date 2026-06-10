export default {
  eyebrow: "Questions fréquentes",
  tagline: "Réponses courtes",
  items: {
    1: {
      question: "Quels types de postes vous intéressent ?",
      answer:
        "Senior frontend / staff frontend, en remote (fuseaux EU), ou missions freelance ciblées (4–12 semaines). Je ne cherche pas de poste full-stack ou orienté backend en ce moment.",
    },
    2: {
      question: "Vous faites aussi du mobile ?",
      answer:
        "Oui — avec Expo (React Native). Même boîte à outils, mêmes standards d’ingénierie : TypeScript, testé, instrumenté pour l’analytics, gestes et motion soignés.",
    },
    3: {
      question: "Pourquoi 100 % de couverture de tests ?",
      answer:
        "C’est une fonction de forçage — pas le but. Viser 100 % avec Vitest + Playwright fait remonter les décisions de design tôt, attrape les régressions en CI, et garde les refactors peu coûteux. Le chiffre lui-même est moins intéressant que la discipline derrière.",
    },
    4: {
      question: "Comment gérez-vous l’analytics et le SEO ?",
      answer:
        "PostHog dès le premier jour — page views, événements custom, funnels, A/B tests quand c’est pertinent. Le SEO est intégré : HTML sémantique, données structurées, sitemap/robots, OG/Twitter cards, rendu edge pour les routes sensibles à Lighthouse.",
    },
    5: {
      question: "Votre position sur le coding assisté par IA ?",
      answer:
        "J’utilise Claude Code au quotidien et sérieusement — spec-driven, orchestré par agents, avec TS strict et tests comme garde-fous. Ça compresse le scaffolding, les refactors et la couverture de tests de semaines en jours. Ça ne remplace pas la review, le goût, ou la responsabilité : chaque ligne est lue et approuvée avant le merge.",
    },
    6: {
      question: "Pouvez-vous intégrer une codebase existante ?",
      answer:
        "Oui — c’est l’essentiel de mon travail. Je lis attentivement, je m’aligne sur vos conventions, et je gagne le droit de proposer des améliorations avant de les pousser.",
    },
  },
} as const
