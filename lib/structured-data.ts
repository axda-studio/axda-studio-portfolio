import { LOCALES } from "@/locales/constants"
import { localizedPath, siteConfig } from "@/lib/site-config"
import enSeo from "@/locales/en/seo"
import frSeo from "@/locales/fr/seo"
import esSeo from "@/locales/es/seo"
import enFaq from "@/locales/en/faq"
import frFaq from "@/locales/fr/faq"
import esFaq from "@/locales/es/faq"

type Locale = (typeof LOCALES)[number]

const SEO_BY_LOCALE = { en: enSeo, fr: frSeo, es: esSeo } as const
const FAQ_BY_LOCALE = { en: enFaq, fr: frFaq, es: esFaq } as const

const KNOWS_ABOUT = [
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "TypeScript",
  "Motion",
  "Vitest",
  "Playwright",
  "PostHog",
  "Search Engine Optimization",
  "Web Accessibility",
  "Internationalization",
  "Design Systems",
  "Frontend Architecture",
  "Claude Code",
] as const

const SERVICE_TYPES = [
  "Frontend Development",
  "Web Development",
  "Mobile App Development",
  "UI Engineering",
] as const

export function buildStructuredData(locale: Locale) {
  const seo = SEO_BY_LOCALE[locale]
  const faq = FAQ_BY_LOCALE[locale]
  const pagePath = localizedPath(locale)
  const pageUrl = `${siteConfig.url}${pagePath}`

  const personId = `${siteConfig.url}/#person`
  const orgId = `${siteConfig.url}/#organization`
  const websiteId = `${siteConfig.url}/#website`
  const profilePageId = `${pageUrl}#profile`
  const faqPageId = `${pageUrl}#faq`
  const tykloId = "https://tyklo.eu/#website"

  const faqItems = Object.values(faq.items) as Array<{
    question: string
    answer: string
  }>

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.author.name,
        givenName: siteConfig.author.givenName,
        familyName: siteConfig.author.familyName,
        jobTitle: siteConfig.author.jobTitle,
        description: seo.description,
        email: `mailto:${siteConfig.author.email}`,
        image: `${siteConfig.url}/profile-pic.png`,
        url: pageUrl,
        worksFor: { "@id": orgId },
        knowsLanguage: [...siteConfig.author.languages],
        knowsAbout: [...KNOWS_ABOUT],
        sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
        address: {
          "@type": "PostalAddress",
          addressRegion: "Europe",
        },
        hasOccupation: {
          "@type": "Occupation",
          name: siteConfig.author.jobTitle,
          occupationLocation: {
            "@type": "Place",
            name: "Europe",
          },
          skills: [...KNOWS_ABOUT].join(", "),
        },
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/axda-studio-logo.svg`,
        image: `${siteConfig.url}/axda-studio-logo.svg`,
        email: `mailto:${siteConfig.author.email}`,
        slogan: siteConfig.tagline,
        founder: { "@id": personId },
        employee: { "@id": personId },
        sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
        areaServed: {
          "@type": "Place",
          name: "Europe",
        },
        serviceType: [...SERVICE_TYPES],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: [...LOCALES],
        publisher: { "@id": orgId },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: `${siteConfig.url}/profile-pic.png`,
      },
      {
        "@type": "FAQPage",
        "@id": faqPageId,
        inLanguage: locale,
        isPartOf: { "@id": profilePageId },
        mainEntity: faqItems.map((item, idx) => ({
          "@type": "Question",
          "@id": `${faqPageId}-${idx + 1}`,
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": tykloId,
        url: "https://tyklo.eu",
        name: "Tyklo",
        description: "B2B SaaS timesheet product.",
        inLanguage: "en",
        creator: { "@id": personId },
      },
    ],
  }
}
