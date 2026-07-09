import { Logo } from "@/components/logo"
import { LocaleSelector } from "@/components/locale-selector"
import { ThemeSelector } from "@/components/theme-selector"
import { NAV_ITEMS } from "./nav"
import { getScopedI18n } from "@/locales/server"
import { NavLink } from "./nav-link"
import { CtaLink } from "./cta-link"

export async function DesktopNav() {
  const t = await getScopedI18n("header")
  const ta = await getScopedI18n("a11y")

  return (
    <header
      data-testid="header"
      className="fixed top-6 left-1/2 z-50 hidden w-full max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border bg-popover/70 px-3 py-2 text-sm backdrop-blur-md lg:flex"
    >
      <Logo variant="desktop" />
      <nav aria-label={ta("navLabel")}>
        <ul className="flex items-center gap-2">
          {NAV_ITEMS.map((navItem) => (
            <li
              key={navItem.id}
              className="rounded-full px-4 py-2 transition-colors hover:bg-muted"
            >
              <NavLink href={navItem.slug} label={navItem.label}>
                {t(`nav.${navItem.label}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <ThemeSelector />
        <LocaleSelector />
        <CtaLink label={t("cta")} />
      </div>
    </header>
  )
}
