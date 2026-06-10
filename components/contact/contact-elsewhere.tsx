import { MoveUpRight } from "lucide-react"

import {
  CAL_URL,
  EMAIL_HREF,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/components/nav/nav"

interface ContactElsewhereProps {
  items: {
    github: { label: string; value: string }
    linkedin: { label: string; value: string }
    cal: { label: string; value: string }
    email: { label: string; value: string }
  }
}

const ELSEWHERE_LINKS = [
  { key: "github", href: GITHUB_URL, external: true },
  { key: "linkedin", href: LINKEDIN_URL, external: true },
  { key: "cal", href: CAL_URL, external: true },
  { key: "email", href: EMAIL_HREF, external: false },
] as const

export function ContactElsewhere({ items }: ContactElsewhereProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {ELSEWHERE_LINKS.map(({ key, href, external }) => {
        const { label, value } = items[key]
        return (
          <li key={key}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group/elsewhere flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/30"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  {label}
                </span>
                <span className="text-sm font-medium">{value}</span>
              </div>
              <MoveUpRight
                size={16}
                className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover/elsewhere:text-foreground"
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
