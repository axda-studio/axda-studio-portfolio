"use client"
import { motion, type Variants } from "motion/react"
import { type ReactNode } from "react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
} satisfies Variants
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
} satisfies Variants

export const StackList = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.ul>
  )
}

export const StackListItem = ({ children }: { children: ReactNode }) => {
  return (
    <motion.li variants={item} className="block">
      {children}
    </motion.li>
  )
}
