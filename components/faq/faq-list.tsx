import { Plus, X } from "lucide-react"

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

export function FaqList({ items }: FaqListProps) {
  return (
    <Accordion type="multiple">
      {items.map(({ id, question, answer }) => (
        <AccordionItem
          key={id}
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
      ))}
    </Accordion>
  )
}
