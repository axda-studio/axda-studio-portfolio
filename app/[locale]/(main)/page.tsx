import { getScopedI18n } from "@/locales/server"
import { TrackedSection } from "@/components/section-tracker"
import { SectionReveal } from "@/components/section-reveal"
import { PillarList, PillarListItem, PillarCard } from "@/components/pillar"
import { PILLARS } from "@/components/pillar/constants"
import { WorkCard } from "@/components/work-card"
import { SELECTED_WORK_ITEMS } from "@/components/work-card/constants"
import { StackList, StackListItem, StackCard } from "@/components/stack-card"
import { STACK_ITEMS } from "@/components/stack-card/constants"
import { FaqList } from "@/components/faq"
import { FAQ_ITEMS } from "@/components/faq/constants"
import { SectionHeader } from "@/components/section-header"
import { ClaudeCodeCard } from "@/components/claude-code"
import { CLAUDE_CODE_STEPS } from "@/components/claude-code/constants"
import { AboutCard } from "@/components/about"
import { ABOUT_FACT_KEYS } from "@/components/about/constants"
import {
  ContactCard,
  ContactElsewhere,
  // ContactForm,
} from "@/components/contact"

export default async function HomePage() {
  const tPillars = await getScopedI18n("pillars")
  const tStack = await getScopedI18n("stack")
  const tFaq = await getScopedI18n("faq")
  const tContact = await getScopedI18n("contact")
  const tWork = await getScopedI18n("work")
  const tClaudeCode = await getScopedI18n("claudeCode")
  const tAbout = await getScopedI18n("about")

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 lg:space-y-24">
      <TrackedSection section="pillars" id="pillars">
        <SectionReveal className="space-y-6">
          <SectionHeader meta={tPillars("counter")}>
            {tPillars("eyebrow")}
          </SectionHeader>
          <PillarList className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {PILLARS.map(({ id, badgeKeys }) => (
              <PillarListItem key={id}>
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
              </PillarListItem>
            ))}
          </PillarList>
        </SectionReveal>
      </TrackedSection>
      <TrackedSection section="work" id="work">
        <SectionReveal className="space-y-6">
          <SectionHeader meta={tWork("tagline")}>
            {tWork("eyebrow")}
          </SectionHeader>
          <ul className="space-y-6">
            {SELECTED_WORK_ITEMS.map(({ id, image, liveUrl, metricIds }) => (
              <li key={id}>
                <WorkCard
                  image={{ src: image.src, alt: tWork(`items.${id}.imageAlt`) }}
                  title={{
                    prefix: tWork(`items.${id}.title.prefix`),
                    emphasis: tWork(`items.${id}.title.emphasis`),
                  }}
                  tags={tWork(`items.${id}.tags`)}
                  description={tWork(`items.${id}.description`)}
                  liveUrl={liveUrl}
                  liveLabel={tWork("liveLabel")}
                  metrics={metricIds.map((mid) => ({
                    value: tWork(`items.${id}.metrics.${mid}.value`),
                    label: tWork(`items.${id}.metrics.${mid}.label`),
                  }))}
                />
              </li>
            ))}
          </ul>
        </SectionReveal>
      </TrackedSection>
      <TrackedSection section="stack" id="stack">
        <SectionReveal className="space-y-6">
          <SectionHeader meta={tStack("tagline")}>
            {tStack("eyebrow")}
          </SectionHeader>
          <StackList className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STACK_ITEMS.map(({ id }) => (
              <StackListItem key={id}>
                <StackCard
                  label={tStack(`items.${id}.label`)}
                  title={tStack(`items.${id}.title`)}
                  description={{
                    template: tStack(`items.${id}.description.template`),
                    code: tStack(`items.${id}.description.code`),
                  }}
                />
              </StackListItem>
            ))}
          </StackList>
        </SectionReveal>
      </TrackedSection>
      <TrackedSection section="claude-code" id="claude-code">
        <SectionReveal className="space-y-6">
          <SectionHeader meta={tClaudeCode("tagline")}>
            {tClaudeCode("eyebrow")}
          </SectionHeader>
          <ClaudeCodeCard
            eyebrow={tClaudeCode("card.eyebrow")}
            title={{
              line1: tClaudeCode("card.title.line1"),
              line2: tClaudeCode("card.title.line2"),
            }}
            description={tClaudeCode("card.description.template", {
              emphasis: (
                <strong className="font-semibold text-foreground">
                  {tClaudeCode("card.description.emphasis")}
                </strong>
              ),
            })}
            stepsLabel={tClaudeCode("card.stepsLabel")}
            steps={CLAUDE_CODE_STEPS.map(({ id }) => ({
              id,
              label: tClaudeCode(`card.steps.${id}.label`),
              meta: tClaudeCode(`card.steps.${id}.meta`),
            }))}
            foundations={{
              tooling: {
                label: tClaudeCode("card.foundations.tooling.label"),
                primary: tClaudeCode("card.foundations.tooling.primary"),
                suffix: tClaudeCode("card.foundations.tooling.suffix"),
              },
              guardrails: {
                label: tClaudeCode("card.foundations.guardrails.label"),
                primary: tClaudeCode("card.foundations.guardrails.primary"),
                suffix: tClaudeCode("card.foundations.guardrails.suffix"),
              },
              lift: {
                label: tClaudeCode("card.foundations.lift.label"),
                emphasis: tClaudeCode("card.foundations.lift.emphasis"),
                text: tClaudeCode("card.foundations.lift.text"),
              },
            }}
            never={{
              label: tClaudeCode("card.never.label"),
              text: tClaudeCode("card.never.text"),
            }}
          />
        </SectionReveal>
      </TrackedSection>
      <TrackedSection section="about" id="about">
        <SectionReveal className="space-y-6">
          <SectionHeader meta={tAbout("tagline")}>
            {tAbout("eyebrow")}
          </SectionHeader>
          <AboutCard
            title={tAbout("card.title.template", {
              engineer: (
                <span className="text-primary">
                  {tAbout("card.title.engineer")}
                </span>
              ),
            })}
            paragraph1={tAbout("card.paragraph1")}
            paragraph2={tAbout("card.paragraph2.template", {
              city1: (
                <span className="font-serif italic">
                  {tAbout("card.paragraph2.city1")}
                </span>
              ),
              city2: (
                <span className="font-serif italic">
                  {tAbout("card.paragraph2.city2")}
                </span>
              ),
            })}
            paragraph3={tAbout("card.paragraph3.template", {
              emphasis: (
                <span className="font-serif italic">
                  {tAbout("card.paragraph3.emphasis")}
                </span>
              ),
            })}
            paragraph4={tAbout("card.paragraph4")}
            facts={ABOUT_FACT_KEYS.map((key) => ({
              key,
              label: tAbout(`card.facts.${key}.label`),
              primary: tAbout(`card.facts.${key}.primary`),
              suffix: tAbout(`card.facts.${key}.suffix`),
            }))}
            signature={{
              firstName: tAbout("card.signature.firstName"),
              lastName: tAbout("card.signature.lastName"),
              role: tAbout("card.signature.role"),
              available: tAbout("card.signature.available"),
            }}
          />
        </SectionReveal>
      </TrackedSection>
      <TrackedSection section="faq" id="faq">
        <SectionReveal className="space-y-6">
          <SectionHeader meta={tFaq("tagline")}>
            {tFaq("eyebrow")}
          </SectionHeader>
          <FaqList
            items={FAQ_ITEMS.map(({ id }) => ({
              id,
              question: tFaq(`items.${id}.question`),
              answer: tFaq(`items.${id}.answer`),
            }))}
          />
        </SectionReveal>
      </TrackedSection>
      <TrackedSection section="contact" id="contact">
        <SectionReveal className="space-y-8">
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

          {/* <div className="space-y-4 lg:hidden">
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
          </div> */}

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
        </SectionReveal>
      </TrackedSection>
    </div>
  )
}
