import { DesktopNav } from "@/components/nav"
import { MobileNav } from "@/components/nav"
import { ReactNode } from "react"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"
import { AvailabilityBadge } from "@/components/availability-badge"
import { getScopedI18n } from "@/locales/server"
import { Hero } from "@/components/hero"

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const t = await getScopedI18n("hero")

  return (
    <div className="">
      <header className="flex items-center justify-between px-4 py-4 lg:hidden">
        <Logo variant="mobile" />
        <AvailabilityBadge>{t("availability.mobile")}</AvailabilityBadge>
      </header>
      <DesktopNav />
      <Hero
        tagline={{
          role: t("tagline.role"),
          skills: t("tagline.skills"),
        }}
        title={{
          headline: {
            prefix: t("title.headline.prefix"),
            emphasis: t("title.headline.emphasis"),
          },
          tail: t("title.tail"),
        }}
        subtitle={{
          prefix: t("subtitle.prefix"),
          emphasis: t("subtitle.emphasis"),
        }}
        ctaPrimary={t("ctaPrimary")}
        ctaSecondary={t("ctaSecondary")}
      />
      {children}
      <Footer />
      <MobileNav />
    </div>
  )
}
