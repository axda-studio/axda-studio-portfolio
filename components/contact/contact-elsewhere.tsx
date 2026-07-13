import { MoveUpRight } from "lucide-react"

import {
  CAL_URL,
  CAL_URL_SHORT,
  EMAIL_HREF,
  EMAIL_ADDRESS,
  GITHUB_URL,
  GITHUB_URL_SHORT,
  LINKEDIN_URL,
  LINKEDIN_URL_SHORT,
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
  { key: "github", href: GITHUB_URL, label: GITHUB_URL_SHORT, external: true },
  {
    key: "linkedin",
    href: LINKEDIN_URL,
    label: LINKEDIN_URL_SHORT,
    external: true,
  },
  { key: "cal", href: CAL_URL, label: CAL_URL_SHORT, external: true },
  { key: "email", href: EMAIL_HREF, label: EMAIL_ADDRESS, external: false },
] as const

export function ContactElsewhere({ items }: ContactElsewhereProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {ELSEWHERE_LINKS.map(({ key, href, external, label }) => {
        const { label: itemLabel } = items[key]
        return (
          <li key={key}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group/elsewhere flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  {itemLabel}
                </span>
                <span className="text-sm font-medium">{label}</span>
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
