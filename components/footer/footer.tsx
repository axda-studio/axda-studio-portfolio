import { getScopedI18n } from "@/locales/server"

export async function Footer() {
  const t = await getScopedI18n("footer")
  const year = new Date().getFullYear()

  return (
    <footer className="mt-8 flex flex-col items-start justify-between gap-3 pb-24 font-mono text-xs text-gray-600 lg:flex-row lg:items-center lg:gap-6 lg:pb-12">
      <span>
        {t("copyright")} — {year}
      </span>
      <span>{t("builtWith")}</span>
    </footer>
  )
}
