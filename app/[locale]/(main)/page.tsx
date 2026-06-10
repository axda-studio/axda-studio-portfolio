import { getScopedI18n } from "@/locales/server"
import { Hero3D, HeroCtas } from "@/components/hero"
import { TrackedSection } from "@/components/section-tracker"
import Link from "next/link"
import { CLAUDE_CODE_URL, WORK_URL } from "@/components/nav/nav"
import { PillarCard } from "@/components/pillar-card"
import { PILLARS } from "@/components/pillar-card/constants"
import { StackCard } from "@/components/stack-card"
import { STACK_ITEMS } from "@/components/stack-card/constants"
import { FaqList } from "@/components/faq"
import { FAQ_ITEMS } from "@/components/faq/constants"
import { AvailabilityBadge } from "@/components/availability-badge"
import { SectionHeader } from "@/components/section-header"
import {
  ContactCard,
  ContactElsewhere,
  ContactForm,
} from "@/components/contact"

export default async function HomePage() {
  const t = await getScopedI18n("hero")
  const tPillars = await getScopedI18n("pillars")
  const tStack = await getScopedI18n("stack")
  const tFaq = await getScopedI18n("faq")
  const tContact = await getScopedI18n("contact")
  const tWork = await getScopedI18n("work")
  const tClaudeCode = await getScopedI18n("claudeCode")
  const tAbout = await getScopedI18n("about")

  return (
    <div className="mt-8 space-y-12 lg:mt-32 lg:space-y-24">
      <TrackedSection
        section="hero"
        id="hero"
        className="relative isolate space-y-4 overflow-hidden lg:space-y-8"
      >
        <Hero3D />
        <AvailabilityBadge className="hidden text-xs shadow-lg lg:flex">
          {t("availability.desktop")}
        </AvailabilityBadge>
        <h1 className="text-3xl font-bold lg:text-8xl">
          {t("title.template", {
            first: (
              <span className="font-serif font-medium text-primary">
                {t("title.first")}
              </span>
            ),
            second: (
              <span className="font-serif font-medium text-primary">
                {t("title.second")}
              </span>
            ),
          })}
        </h1>
        <p className="max-w-160 text-sm lg:text-lg">
          {t("intro.template", {
            first: (
              <Link
                href={WORK_URL}
                className="underline decoration-gray-300 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                {t("intro.first")}
              </Link>
            ),
            second: (
              <Link
                href={WORK_URL}
                className="underline decoration-gray-300 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                {t("intro.second")}
              </Link>
            ),
            third: (
              <Link
                href={CLAUDE_CODE_URL}
                className="underline decoration-gray-300 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                {t("intro.third")}
              </Link>
            ),
          })}
        </p>
        <HeroCtas
          primaryLabel={t("ctaPrimary")}
          secondaryLabel={t("ctaSecondary")}
        />
      </TrackedSection>
      <TrackedSection section="pillars" id="pillars" className="space-y-6">
        <SectionHeader meta={tPillars("counter")}>
          {tPillars("eyebrow")}
        </SectionHeader>
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PILLARS.map(({ id, badgeKeys }) => (
            <li key={id} className="block">
              <PillarCard
                id={id}
                label={tPillars(`items.${id}.label`)}
                title={{
                  template: tPillars(`items.${id}.title.template`),
                  emphasis: tPillars(`items.${id}.title.emphasis`),
                }}
                description={tPillars(`items.${id}.description`)}
                badges={badgeKeys.map((key) => tPillars(`badges.${key}`))}
              />
            </li>
          ))}
        </ul>
      </TrackedSection>
      <TrackedSection section="work" id="work" className="">
        <SectionHeader meta={tWork("tagline")}>
          {tWork("eyebrow")}
        </SectionHeader>
      </TrackedSection>
      <TrackedSection section="stack" id="stack" className="space-y-6">
        <SectionHeader meta={tStack("tagline")}>
          {tStack("eyebrow")}
        </SectionHeader>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STACK_ITEMS.map(({ id }) => (
            <li key={id} className="block">
              <StackCard
                label={tStack(`items.${id}.label`)}
                title={tStack(`items.${id}.title`)}
                description={{
                  template: tStack(`items.${id}.description.template`),
                  code: tStack(`items.${id}.description.code`),
                }}
              />
            </li>
          ))}
        </ul>
      </TrackedSection>
      <TrackedSection section="claude-code" id="claude-code" className="">
        <SectionHeader meta={tClaudeCode("tagline")}>
          {tClaudeCode("eyebrow")}
        </SectionHeader>
      </TrackedSection>
      <TrackedSection section="about" id="about" className="">
        <SectionHeader meta={tAbout("tagline")}>
          {tAbout("eyebrow")}
        </SectionHeader>
      </TrackedSection>
      <TrackedSection section="faq" id="faq" className="space-y-6">
        <SectionHeader meta={tFaq("tagline")}>{tFaq("eyebrow")}</SectionHeader>
        <FaqList
          items={FAQ_ITEMS.map(({ id }) => ({
            id,
            question: tFaq(`items.${id}.question`),
            answer: tFaq(`items.${id}.answer`),
          }))}
        />
      </TrackedSection>
      <TrackedSection section="contact" id="contact" className="space-y-8">
        <SectionHeader meta={tContact("tagline")}>
          {tContact("eyebrow")}
        </SectionHeader>

        <ContactCard
          title={tContact("card.title.template", {
            emphasis: (
              <span className="font-serif font-medium italic">
                {tContact("card.title.emphasis")}
              </span>
            ),
          })}
          scheduleCta={tContact("card.scheduleCta")}
          quickLinks={{
            cal: tContact("card.quickLinks.cal"),
            github: tContact("card.quickLinks.github"),
            linkedin: tContact("card.quickLinks.linkedin"),
          }}
          footer={{
            status: {
              label: tContact("card.footer.status.label"),
              value: tContact("card.footer.status.value"),
            },
            timezone: {
              label: tContact("card.footer.timezone.label"),
              value: tContact("card.footer.timezone.value"),
            },
            reply: {
              label: tContact("card.footer.reply.label"),
              value: tContact("card.footer.reply.value"),
            },
            brand: tContact("card.footer.brand"),
          }}
        />

        <div className="space-y-4 lg:hidden">
          <SectionHeader>{tContact("form.eyebrow")}</SectionHeader>
          <ContactForm
            labels={{
              nameLabel: tContact("form.nameLabel"),
              namePlaceholder: tContact("form.namePlaceholder"),
              emailLabel: tContact("form.emailLabel"),
              emailPlaceholder: tContact("form.emailPlaceholder"),
              briefLabel: tContact("form.briefLabel"),
              briefPlaceholder: tContact("form.briefPlaceholder"),
              submitLabel: tContact("form.submitLabel"),
              mailSubject: tContact("form.mailSubject"),
            }}
          />
        </div>

        <div className="space-y-4 lg:hidden">
          <SectionHeader>{tContact("elsewhere.eyebrow")}</SectionHeader>
          <ContactElsewhere
            items={{
              github: {
                label: tContact("elsewhere.items.github.label"),
                value: tContact("elsewhere.items.github.value"),
              },
              linkedin: {
                label: tContact("elsewhere.items.linkedin.label"),
                value: tContact("elsewhere.items.linkedin.value"),
              },
              cal: {
                label: tContact("elsewhere.items.cal.label"),
                value: tContact("elsewhere.items.cal.value"),
              },
              email: {
                label: tContact("elsewhere.items.email.label"),
                value: tContact("elsewhere.items.email.value"),
              },
            }}
          />
        </div>
      </TrackedSection>
    </div>
  )
}
