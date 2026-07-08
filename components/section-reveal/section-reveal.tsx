"use client"

import { motion, type Variants } from "motion/react"
import { type ReactNode } from "react"

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
} satisfies Variants

interface SectionRevealProps {
  children: ReactNode
  className?: string
}

export const SectionReveal = ({ children, className }: SectionRevealProps) => (
  <motion.div
    variants={reveal}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
)
