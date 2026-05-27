"use client"

import Link from "next/link"
import posthog from "posthog-js"
import { Button } from "@/components/ui/button"
import { MoveUpRight } from "lucide-react"

interface CtaLinkProps {
  label: string
}

export function CtaLink({ label }: CtaLinkProps) {
  const handleClick = () => {
    posthog.capture("cta_clicked", { label })
  }

  return (
    <Button asChild className="rounded-full bg-foreground text-background">
      <Link href="/#contact" onClick={handleClick}>
        {label} <MoveUpRight />
      </Link>
    </Button>
  )
}
