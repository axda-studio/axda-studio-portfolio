import { DesktopNav } from "@/components/nav"
import { MobileNav } from "@/components/nav"
import { ReactNode } from "react"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"
import { AvailabilityBadge } from "@/components/availability-badge"
import { getScopedI18n } from "@/locales/server"

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const t = await getScopedI18n("hero")

  return (
    <div className="mx-auto max-w-6xl p-4 lg:px-0 lg:py-8">
      <DesktopNav />
      <header className="flex items-center justify-between lg:hidden">
        <Logo variant="mobile" />
        <AvailabilityBadge>{t("availability.mobile")}</AvailabilityBadge>
      </header>
      {children}
      <Footer />
      <MobileNav />
    </div>
  )
}
