export default {
  eyebrow: "Preguntas frecuentes",
  tagline: "Respuestas breves",
  items: {
    1: {
      question: "¿Qué tipo de roles te interesan?",
      answer:
        "Senior frontend / staff frontend, en remoto (zonas EU), o encargos freelance enfocados (4–12 semanas). Ahora mismo no busco roles full-stack ni con peso de backend.",
    },
    2: {
      question: "¿También haces apps móviles?",
      answer:
        "Sí — con Expo (React Native). Mismo toolkit, mismos estándares de ingeniería: TypeScript, con tests, instrumentado para analytics, gestos y motion bien hechos.",
    },
    3: {
      question: "¿Por qué 100 % de cobertura de tests?",
      answer:
        "Es una función forzante — no la meta. Apuntar al 100 % con Vitest + Playwright hace que las decisiones de diseño salgan a la luz pronto, que las regresiones se atrapen en CI y que los refactors sigan siendo baratos. El número en sí importa menos que la disciplina detrás.",
    },
    4: {
      question: "¿Cómo manejas analytics y SEO?",
      answer:
        "PostHog desde el día uno — page views, eventos custom, funnels, tests A/B donde importan. El SEO está integrado: HTML semántico, datos estructurados, sitemap/robots, OG/Twitter cards, renderizado edge para las rutas sensibles a Lighthouse.",
    },
    5: {
      question: "¿Cuál es tu postura sobre el coding asistido por IA?",
      answer:
        "Uso Claude Code a diario y en serio — spec-driven, orquestado por agentes, con TS estricto y tests como guardarraíles. Comprime scaffolding, refactors y cobertura de tests de semanas a días. No reemplaza la revisión, el criterio ni la propiedad: cada línea se lee y aprueba antes de hacer merge.",
    },
    6: {
      question: "¿Puedes incorporarte a una codebase existente?",
      answer:
        "Sí — es la mayor parte de mi trabajo. Leo con cuidado, me alineo con vuestras convenciones, y me gano el derecho de proponer mejoras antes de empujarlas.",
    },
  },
} as const
