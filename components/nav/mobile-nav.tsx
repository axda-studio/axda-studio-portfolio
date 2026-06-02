// import { Logo } from "@/components/logo"
import { MOBILE_NAV_ITEMS } from "./nav"
import { getScopedI18n } from "@/locales/server"
import { NavLink } from "./nav-link"
// import { CtaLink } from "./cta-link"

export async function MobileNav() {
  const t = await getScopedI18n("header")

  return (
    <nav
      aria-label="mobile"
      className="fixed inset-x-0 bottom-4 mx-4 rounded-full border bg-popover/70 px-3 text-sm backdrop-blur-md lg:hidden"
    >
      <ul className="flex items-center justify-evenly gap-2">
        {MOBILE_NAV_ITEMS.map(({ icon: Icon, ...navItem }) => (
          <li
            key={navItem.id}
            className="rounded-full p-2 transition-colors hover:bg-muted"
          >
            <NavLink
              href={navItem.slug}
              label={navItem.label}
              icon={<Icon size={20} />}
            >
              {t(`nav.${navItem.label}`)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
