import { getScopedI18n } from "@/locales/server"
import { HeroCtas } from "@/components/hero"
import { TrackedSection } from "@/components/section-tracker"

export default async function HomePage() {
  const t = await getScopedI18n("hero")

  return (
    <div className="mt-8 space-y-10 lg:mt-32">
      <TrackedSection
        section="work"
        id="work"
        className="space-y-4 lg:space-y-8"
      >
        <div className="hidden w-fit items-center justify-start gap-x-2 rounded-full border px-2 py-0.5 font-mono text-xs uppercase shadow-md lg:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-green-700" />
          {t("availability")}
        </div>
        <h1 className="text-3xl font-bold lg:text-8xl">
          {t("title.template", {
            first: (
              <span className="font-serif font-medium">{t("title.first")}</span>
            ),
            second: (
              <span className="font-serif font-medium">
                {t("title.second")}
              </span>
            ),
          })}
        </h1>
        <p className="max-w-120 text-sm lg:text-lg">{t("intro")}</p>
        <HeroCtas
          primaryLabel={t("ctaPrimary")}
          secondaryLabel={t("ctaSecondary")}
        />
      </TrackedSection>
      <TrackedSection section="stack" id="stack" className="h-375 bg-green-500">
        STACK
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
