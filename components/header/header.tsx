import { Logo } from "@/components/logo"
import { LocaleSelector } from "@/components/locale-selector"
import { ThemeSelector } from "@/components/theme-selector"
import { NAV_ITEMS } from "./nav"
import { getScopedI18n } from "@/locales/server"
import { NavLink } from "./nav-link"
import { CtaLink } from "./cta-link"

export async function Header() {
  const t = await getScopedI18n("header")

  return (
    <header
      data-testid="header"
      className="fixed top-6 z-10 flex w-full max-w-6xl items-center justify-between rounded-full border bg-popover/70 px-3 py-2 text-sm backdrop-blur-md"
    >
      <Logo />
      <nav aria-label="primary">
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
