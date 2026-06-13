import type { ReactNode } from "react"

import { AvailabilityBadge } from "@/components/availability-badge"

interface AboutFact {
  key: string
  label: string
  primary: string
  suffix: string
}

interface AboutSignature {
  firstName: string
  lastName: string
  role: string
  available: string
}

interface AboutCardProps {
  title: string
  paragraph1: string
  paragraph2: ReactNode
  paragraph3: ReactNode
  facts: AboutFact[]
  signature: AboutSignature
}

const PANEL_CLASSES =
  "rounded-3xl bg-card p-6 ring-1 ring-foreground/10 lg:rounded-none lg:bg-transparent lg:p-12 lg:ring-0"

export function AboutCard({
  title,
  paragraph1,
  paragraph2,
  paragraph3,
  facts,
  signature,
}: AboutCardProps) {
  return (
    <div className="space-y-4 lg:grid lg:grid-cols-2 lg:space-y-0 lg:rounded-3xl lg:bg-card lg:ring-1 lg:ring-foreground/10">
      {/* Intro */}
      <div className={`${PANEL_CLASSES} space-y-6`}>
        <h3 className="font-serif text-3xl leading-tight font-medium italic lg:text-5xl">
          {title}
        </h3>
        <p className="max-w-prose text-sm lg:text-base">{paragraph1}</p>
        <p className="max-w-prose text-sm lg:text-base">{paragraph2}</p>
        <p className="max-w-prose text-sm lg:text-base">{paragraph3}</p>
      </div>

      {/* Right column: facts + signature */}
      <div
        className={`${PANEL_CLASSES} flex flex-col gap-8 lg:border-l lg:border-border`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-full bg-foreground font-serif text-xl text-background italic"
            >
              {signature.firstName[0]}
              {signature.lastName[0]}
            </div>
            <div className="flex flex-col gap-1 leading-tight">
              <span className="text-base font-medium lg:text-lg">
                {signature.firstName} {signature.lastName}
              </span>
              <span className="font-mono text-tiny tracking-wider text-gray-600 uppercase">
                {signature.role}
              </span>
            </div>
          </div>
          <AvailabilityBadge className="mt-2 border-0 shadow-none">
            {signature.available}
          </AvailabilityBadge>
        </div>

        <dl>
          {facts.map(({ key, label, primary, suffix }, index) => {
            const hasSuffix = suffix.trim().length > 0
            return (
              <div
                key={key}
                className={`flex items-baseline justify-between gap-4 py-3 ${
                  index < facts.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <dt className="font-mono text-tiny tracking-wider text-gray-600 uppercase">
                  {label}
                </dt>
                <dd className="text-right text-sm lg:text-base">
                  <span className="font-medium">{primary}</span>
                  {hasSuffix && (
                    <span className="text-muted-foreground"> · {suffix}</span>
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </div>
  )
}
