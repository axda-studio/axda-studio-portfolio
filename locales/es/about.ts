export default {
  eyebrow: "Sobre mí",
  tagline: "Estudio en solitario",
  card: {
    title: {
      template: "{engineer}, con ojo de {designer}.",
      engineer: "Ingeniero",
      designer: "diseñador",
    },
    paragraph1:
      "Soy Frontend Developer con cinco años+ dedicados a construir experiencias digitales que priorizan rendimiento, escalabilidad y excelencia visual.",
    paragraph2: {
      template:
        "Mi recorrido me ha llevado más allá de fronteras, trabajando en hubs tech dinámicos como {city1} y {city2}, donde he afinado mis habilidades y abrazado perspectivas diversas. He colaborado en proyectos que abarcan SaaS, e-commerce y media tech, construyendo productos que crecen y generan impacto.",
      city1: "Dublin",
      city2: "Amsterdam",
    },
    paragraph3: {
      template:
        "Me importan las cosas aburridas — tipos, tests, accesibilidad, presupuestos de rendimiento, analytics desde el día uno — porque son las que hacen que lo bello {emphasis} de verdad.",
      emphasis: "perdure",
    },
    paragraph4:
      "Más allá del desarrollo, me apoyo en una valiosa experiencia en Psicología, Marketing y Diseño, lo que me permite abordar los proyectos de manera holística y entregar soluciones que verdaderamente resuenan.",
    facts: {
      now: {
        label: "Ahora",
        primary: "Senior Frontend Engineer",
        suffix: "freelance",
      },
      based: { label: "Base", primary: "UE", suffix: "Remoto" },
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
        label: "Idiomas",
        primary: "Inglés · Francés",
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
