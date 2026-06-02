"use client"

import Link from "next/link"
import posthog from "posthog-js"
import { Button } from "@/components/ui/button"
import { MoveUpRight } from "lucide-react"
import { CONTACT_URL } from "./nav"

interface CtaLinkProps {
  label: string
}

export function CtaLink({ label }: CtaLinkProps) {
  const handleClick = () => {
    posthog.capture("cta_clicked", { label, location: "header" })
  }

  return (
    <Button asChild className="rounded-full bg-foreground text-background">
      <Link href={CONTACT_URL} onClick={handleClick}>
        {label} <MoveUpRight />
      </Link>
    </Button>
  )
}
