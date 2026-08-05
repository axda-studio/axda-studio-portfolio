import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getScopedI18n } from "@/locales/server"
import { LOCALES } from "@/locales/constants"
import { LEGAL_SEGMENT, localizedPath, siteConfig } from "@/lib/site-config"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"
import { ThemeSelector } from "@/components/theme-selector"
import { LocaleSelector } from "@/components/locale-selector"
import { CookieSettingsButton } from "@/components/cookie-consent"
import enLegal from "@/locales/en/legal"
import frLegal from "@/locales/fr/legal"
import esLegal from "@/locales/es/legal"

import { PROCESSOR_IDS, PURPOSE_IDS, STORAGE_ITEMS } from "./constants"

const LEGAL_BY_LOCALE = { en: enLegal, fr: frLegal, es: esLegal } as const
type Locale = (typeof LOCALES)[number]

const { legal } = siteConfig

function toLocale(value: string): Locale {
  return (LOCALES as readonly string[]).includes(value)
    ? (value as Locale)
    : (siteConfig.defaultLocale as Locale)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = toLocale(raw)
  const { meta } = LEGAL_BY_LOCALE[locale]

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localizedPath(locale, LEGAL_SEGMENT),
      languages: {
        en: localizedPath("en", LEGAL_SEGMENT),
        fr: localizedPath("fr", LEGAL_SEGMENT),
        "x-default": localizedPath("en", LEGAL_SEGMENT),
      },
    },
    // Nothing to gain from indexing this beyond making it findable.
    robots: { index: true, follow: true },
  }
}

export default async function LegalPage() {
  const t = await getScopedI18n("legal")

  const publisherRows = [
    { key: "entity", value: legal.publisher.entity },
    // The register wording stays as-is in every locale so it can be checked
    // against SIRENE; non-French locales gloss it.
    {
      key: "form",
      value: t("publisher.formValue", { form: legal.publisher.form }),
    },
    { key: "registration", value: legal.publisher.registration },
    { key: "address", value: legal.publisher.address },
    { key: "director", value: legal.publisher.director },
    { key: "email", value: legal.publisher.email },
  ] as const

  const hostRows = [
    { key: "entity", value: legal.host.entity },
    { key: "address", value: legal.host.address },
    { key: "url", value: legal.host.url },
  ] as const

  return (
    <div>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo variant="mobile" />
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <LocaleSelector />
        </div>
      </header>

      {/* max-w-6xl matches the header above, the shared <Footer /> below, and the
          main page — the running copy keeps its own narrower measure so the
          wider shell does not stretch legal text to an unreadable line length. */}
      <main id="main-content" className="mx-auto max-w-6xl px-4 pt-8 pb-16">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight lg:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t("intro")}
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {t("lastUpdated")} — {legal.updatedAt}
        </p>

        <div className="mt-12 max-w-3xl space-y-12">
          <section aria-labelledby="publisher">
            <h2 id="publisher" className="text-lg font-medium">
              {t("publisher.title")}
            </h2>
            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[12rem_1fr]">
              {publisherRows.map(({ key, value }) => (
                <div key={key} className="contents">
                  <dt className="text-muted-foreground">
                    {t(`publisher.labels.${key}`)}
                  </dt>
                  <dd className="mb-2 sm:mb-0">
                    {key === "email" ? (
                      <a
                        href={`mailto:${value}`}
                        className="underline underline-offset-4 hover:text-primary"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="host">
            <h2 id="host" className="text-lg font-medium">
              {t("host.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("host.body")}
            </p>
            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[12rem_1fr]">
              {hostRows.map(({ key, value }) => (
                <div key={key} className="contents">
                  <dt className="text-muted-foreground">
                    {t(`host.labels.${key}`)}
                  </dt>
                  <dd className="mb-2 sm:mb-0">
                    {key === "url" ? (
                      <a
                        href={value}
                        rel="noreferrer"
                        target="_blank"
                        className="underline underline-offset-4 hover:text-primary"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="controller">
            <h2 id="controller" className="text-lg font-medium">
              {t("controller.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("controller.body")}
            </p>
          </section>

          <section aria-labelledby="purposes">
            <h2 id="purposes" className="text-lg font-medium">
              {t("purposes.title")}
            </h2>
            <dl className="mt-4 space-y-4">
              {PURPOSE_IDS.map((id) => (
                <div key={id}>
                  <dt className="text-sm font-medium">
                    {t(`purposes.items.${id}.term`)}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`purposes.items.${id}.description`)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="data">
            <h2 id="data" className="text-lg font-medium">
              {t("data.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("data.body")}
            </p>
          </section>

          <section aria-labelledby="no-server">
            <h2 id="no-server" className="text-lg font-medium">
              {t("noServer.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("noServer.body")}
            </p>
          </section>

          <section aria-labelledby="basis">
            <h2 id="basis" className="text-lg font-medium">
              {t("basis.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("basis.body")}
            </p>
          </section>

          <section aria-labelledby="processors">
            <h2 id="processors" className="text-lg font-medium">
              {t("processors.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("processors.body")}
            </p>
            <dl className="mt-4 space-y-4">
              {PROCESSOR_IDS.map((id) => (
                <div key={id}>
                  <dt className="text-sm font-medium">
                    {t(`processors.items.${id}.term`)}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {id === "analytics"
                      ? t("processors.items.analytics.description", {
                          processor: legal.analytics.processor,
                          region: legal.analytics.region,
                        })
                      : t("processors.items.host.description", {
                          host: legal.host.entity,
                        })}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="retention">
            <h2 id="retention" className="text-lg font-medium">
              {t("retention.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("retention.body", {
                analyticsMonths: legal.analytics.retentionMonths,
                replayDays: legal.analytics.replayRetentionDays,
                consentMonths: legal.consentValidityMonths,
              })}
            </p>
          </section>

          <section aria-labelledby="storage">
            <h2 id="storage" className="text-lg font-medium">
              {t("storage.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("storage.body")}
            </p>
            {/* Focusable and labelled because this scrolls horizontally at
                phone widths: a scroll container that only responds to a mouse
                or a swipe is unreachable by keyboard (WCAG 2.1.1). */}
            <div
              className="mt-4 overflow-x-auto focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              tabIndex={0}
              role="region"
              aria-label={t("storage.title")}
            >
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="py-2 pr-4 font-medium">
                      {t("storage.columns.name")}
                    </th>
                    <th scope="col" className="py-2 pr-4 font-medium">
                      {t("storage.columns.kind")}
                    </th>
                    <th scope="col" className="py-2 pr-4 font-medium">
                      {t("storage.columns.purpose")}
                    </th>
                    <th scope="col" className="py-2 pr-4 font-medium">
                      {t("storage.columns.duration")}
                    </th>
                    <th scope="col" className="py-2 font-medium">
                      {t("storage.columns.consent")}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {STORAGE_ITEMS.map(({ id, name, consentRequired }) => (
                    <tr
                      key={id}
                      className="border-b border-border last:border-0"
                    >
                      <th
                        scope="row"
                        className="py-3 pr-4 align-top font-mono text-xs font-normal whitespace-nowrap text-foreground"
                      >
                        {name}
                      </th>
                      <td className="py-3 pr-4 align-top">
                        {t(`storage.items.${id}.kind`)}
                      </td>
                      <td className="min-w-56 py-3 pr-4 align-top">
                        {t(`storage.items.${id}.purpose`)}
                      </td>
                      <td className="py-3 pr-4 align-top whitespace-nowrap">
                        {t(`storage.items.${id}.duration`)}
                      </td>
                      <td className="py-3 align-top whitespace-nowrap">
                        {consentRequired
                          ? t("storage.consentRequired")
                          : t("storage.consentExempt")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights" className="text-lg font-medium">
              {t("rights.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("rights.body")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("rights.withdraw")}{" "}
              <CookieSettingsButton testId="legal-cookie-settings" />
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("rights.complaint")}
              <br />
              <span className="text-foreground">
                {legal.authority.name}
              </span> — {legal.authority.address} —{" "}
              <a
                href={legal.authority.url}
                rel="noreferrer"
                target="_blank"
                className="underline underline-offset-4 hover:text-primary"
              >
                {legal.authority.url.replace("https://", "")}
              </a>
            </p>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes" className="text-lg font-medium">
              {t("changes.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("changes.body")}
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t("backToHome")}
        </Link>
      </main>

      <Footer />
    </div>
  )
}
