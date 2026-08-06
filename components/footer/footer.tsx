import Link from "next/link"

import { getCurrentLocale, getScopedI18n } from "@/locales/server"
import { CookieSettingsButton } from "@/components/cookie-consent"
import { MotionHover } from "@/components/motion-hover"
import { LEGAL_SEGMENT, localizedPath } from "@/lib/site-config"

export async function Footer() {
  const t = await getScopedI18n("footer")
  const locale = await getCurrentLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto mt-8 flex max-w-6xl flex-col items-start justify-between gap-3 px-4 pb-24 font-mono text-xs text-muted-foreground lg:flex-row lg:items-center lg:gap-6 lg:pb-12">
      <span>
        {t("copyright")} — {year}
      </span>
      <span className="flex items-center gap-3">
        <MotionHover>
          <Link
            href={localizedPath(locale, LEGAL_SEGMENT)}
            data-testid="footer-legal-link"
            className="transition-colors hover:text-foreground"
          >
            {t("legal")}
          </Link>
        </MotionHover>
        <CookieSettingsButton />
        {/* <span>{t("builtWith")}</span> */}
      </span>
    </footer>
  )
}
