"use client"

import { Plus, X } from "lucide-react"
import { motion, type Variants } from "motion/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
  id: number
  question: string
  answer: string
}

interface FaqListProps {
  items: FaqItem[]
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
} satisfies Variants

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
} satisfies Variants

export function FaqList({ items }: FaqListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Accordion type="multiple">
        {items.map(({ id, question, answer }) => (
          <motion.div key={id} variants={item}>
            <AccordionItem
              value={String(id)}
              className="border-b border-border"
            >
              <AccordionTrigger
                className="items-center gap-6 py-5 text-base font-medium hover:no-underline"
                icon={
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-colors">
                    <Plus className="size-4 group-aria-expanded/accordion-trigger:hidden" />
                    <X className="hidden size-4 group-aria-expanded/accordion-trigger:inline" />
                  </span>
                }
              >
                {question}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl text-sm text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  )
}
