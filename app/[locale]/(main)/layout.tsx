import { DesktopNav } from "@/components/nav"
import { MobileNav } from "@/components/nav"
import { ReactNode } from "react"
import { Logo } from "@/components/logo"
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
        <div className="flex items-center gap-x-2 rounded-full border px-2 py-0.5 font-mono text-tiny uppercase shadow-md">
          <span className="size-1.5 animate-pulse rounded-full bg-green-700" />
          {t("availability.mobile")}
        </div>
      </header>
      {children}
      <MobileNav />
    </div>
  )
}
