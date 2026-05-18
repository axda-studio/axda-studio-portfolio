import { Header } from "@/components/header"
import { ReactNode } from "react"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl p-4 lg:px-0 lg:py-8">
      <Header />
      {children}
    </div>
  )
}
