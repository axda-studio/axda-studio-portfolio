import { DesktopNav } from "@/components/nav"
import { MobileNav } from "@/components/nav"
import { ReactNode } from "react"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"
import { AvailabilityBadge } from "@/components/availability-badge"
import { getScopedI18n } from "@/locales/server"
import { WovenLightHero } from "@/components/hero/hero-animation"

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
      <WovenLightHero />
      {children}
      <Footer />
      <MobileNav />
    </div>
  )
}
