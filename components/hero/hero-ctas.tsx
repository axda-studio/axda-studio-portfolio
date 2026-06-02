"use client"

import Link from "next/link"
import posthog from "posthog-js"
import { MoveUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { WORK_URL, APPOINTMENT_BOOKING_URL } from "@/components/nav/nav"

interface HeroCtasProps {
  primaryLabel: string
  secondaryLabel: string
}

export function HeroCtas({ primaryLabel, secondaryLabel }: HeroCtasProps) {
  const handlePrimaryClick = () => {
    posthog.capture("cta_clicked", {
      label: primaryLabel,
      location: "hero",
      target: "work",
    })
  }

  const handleSecondaryClick = () => {
    posthog.capture(
      "cta_clicked",
      {
        label: secondaryLabel,
        location: "hero",
        target: "booking",
      },
      { send_instantly: true }
    )
  }

  return (
    <div className="flex items-center gap-x-4">
      <Button
        asChild
        className="rounded-full bg-foreground p-4 text-background"
      >
        <Link href={WORK_URL} onClick={handlePrimaryClick}>
          {primaryLabel} <MoveUpRight />
        </Link>
      </Button>
      <Button asChild className="rounded-full p-4" variant="outline">
        <a
          href={APPOINTMENT_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSecondaryClick}
        >
          {secondaryLabel}
        </a>
      </Button>
    </div>
  )
}
