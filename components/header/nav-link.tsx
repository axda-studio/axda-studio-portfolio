"use client"

import { ReactNode } from "react"
import Link from "next/link"
import posthog from "posthog-js"

interface NavLinkProps {
  href: string
  label: string
  children: ReactNode
}

export function NavLink({ href, label, children }: NavLinkProps) {
  const handleClick = () => {
    posthog.capture("nav_item_clicked", { label })
  }

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  )
}
