import { getScopedI18n } from "@/locales/server"

export async function Footer() {
  const t = await getScopedI18n("footer")
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto mt-8 flex max-w-6xl flex-col items-start justify-between gap-3 px-4 pb-24 font-mono text-xs text-muted-foreground lg:flex-row lg:items-center lg:gap-6 lg:pb-12">
      <span>
        {t("copyright")} — {year}
      </span>
      <span>{t("builtWith")}</span>
    </footer>
  )
}
