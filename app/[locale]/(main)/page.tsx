import { getScopedI18n } from "@/locales/server"
import { HeroCtas } from "@/components/hero"
import { TrackedSection } from "@/components/section-tracker"
import Link from "next/link"
import { CLAUDE_CODE_URL, WORK_URL } from "@/components/nav/nav"
import { PillarCard } from "@/components/pillar-card"
import { PILLARS } from "@/components/pillar-card/constants"
import { StackCard } from "@/components/stack-card"
import { STACK_ITEMS } from "@/components/stack-card/constants"

export default async function HomePage() {
  const t = await getScopedI18n("hero")
  const tPillars = await getScopedI18n("pillars")
  const tStack = await getScopedI18n("stack")

  return (
    <div className="mt-8 space-y-12 lg:mt-32 lg:space-y-24">
      <TrackedSection
        section="work"
        id="work"
        className="space-y-4 lg:space-y-8"
      >
        <div className="hidden w-fit items-center justify-start gap-x-2 rounded-full border px-2 py-0.5 font-mono text-xs uppercase shadow-lg lg:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-green-700" />
          {t("availability.desktop")}
        </div>
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
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 font-medium">
            <span className="size-2 rounded-full bg-primary" />{" "}
            {tPillars("eyebrow")}
          </div>
          <span className="font-mono text-tiny text-gray-600">
            {tPillars("counter")}
          </span>
        </div>
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
      <TrackedSection section="stack" id="stack" className="space-y-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 font-medium">
            <span className="size-2 rounded-full bg-primary" />{" "}
            {tStack("eyebrow")}
          </div>
          <span className="font-mono text-tiny text-gray-600">
            {tStack("tagline")}
          </span>
        </div>
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
      <TrackedSection section="about" id="about" className="h-375 bg-blue-500">
        ABOUT
      </TrackedSection>
      <TrackedSection section="faq" id="faq" className="h-375 bg-yellow-500">
        FAQ
      </TrackedSection>
      <TrackedSection
        section="contact"
        id="contact"
        className="h-375 bg-yellow-500"
      >
        CONTACT
      </TrackedSection>
    </div>
  )
}
