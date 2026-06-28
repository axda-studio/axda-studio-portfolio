import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface AvailabilityBadgeProps {
  children: ReactNode
  className?: string
}

export function AvailabilityBadge({
  children,
  className,
}: AvailabilityBadgeProps) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-x-2 rounded-full border px-2 py-0.5 font-mono text-tiny uppercase",
        className
      )}
    >
      <span className="size-1.5 animate-pulse rounded-full bg-green-700" />
      {children}
    </div>
  )
}
