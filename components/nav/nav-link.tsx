"use client"

import { ReactNode } from "react"
import Link from "next/link"
import posthog from "posthog-js"

interface NavLinkProps {
  href: string
  label: string
  icon?: ReactNode
  children: ReactNode
}

export function NavLink({ href, label, icon, children }: NavLinkProps) {
  const handleClick = () => {
    posthog.capture("nav_item_clicked", { label })
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="flex flex-col items-center gap-1 text-xs lg:text-sm"
    >
      {icon ? icon : null}
      {children}
    </Link>
  )
}
