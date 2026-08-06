"use client"

import { ReactNode, useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface MotionHoverProps {
  children: ReactNode
  className?: string
}

/**
 * Underlines its child on hover or keyboard focus. The hover state lives on this
 * wrapper because the bar animates from zero width — it has no hit area of its own.
 */
export function MotionHover({ children, className }: MotionHoverProps) {
  const [active, setActive] = useState(false)

  return (
    <motion.span
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={cn("relative inline-flex flex-col items-center", className)}
    >
      {children}
      <motion.span
        aria-hidden
        initial={false}
        animate={active ? "hover" : "rest"}
        variants={{
          rest: { width: 0, opacity: 0 },
          hover: { width: "100%", opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
        className="h-px bg-foreground"
      />
    </motion.span>
  )
}
