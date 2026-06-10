import type { ReactNode } from "react"
import { MoveUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CAL_URL,
  EMAIL_ADDRESS,
  EMAIL_HREF,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/components/nav/nav"

interface ContactCardProps {
  title: ReactNode
  scheduleCta: string
  quickLinks: { cal: string; github: string; linkedin: string }
  footer: {
    status: { label: string; value: string }
    timezone: { label: string; value: string }
    reply: { label: string; value: string }
    brand: string
  }
}

const QUICK_LINKS = [
  { key: "cal", href: CAL_URL },
  { key: "github", href: GITHUB_URL },
  { key: "linkedin", href: LINKEDIN_URL },
] as const

export function ContactCard({
  title,
  scheduleCta,
  quickLinks,
  footer,
}: ContactCardProps) {
  const year = new Date().getFullYear()

  return (
    <div className="relative overflow-hidden rounded-3xl bg-foreground bg-radial-[circle_at_80%_50%] from-primary/45 from-0% to-transparent to-55% p-8 text-background lg:p-12">
      <h2 className="text-3xl font-semibold lg:max-w-2xl lg:text-6xl">
        {title}
      </h2>

      <div className="mt-8 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-6">
        <Button
          asChild
          className="w-full rounded-full bg-background text-foreground hover:bg-background/90 lg:w-auto"
        >
          <a href={EMAIL_HREF}>
            {EMAIL_ADDRESS} <MoveUpRight />
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full rounded-full border-background/30 bg-transparent text-background hover:bg-background/10 lg:hidden"
        >
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
            {scheduleCta}
          </a>
        </Button>

        <ul className="hidden items-center gap-6 text-sm lg:flex">
          {QUICK_LINKS.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-background/40 underline-offset-4 hover:decoration-background"
              >
                {quickLinks[key]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 hidden border-t border-background/10 pt-8 lg:block">
        <dl className="grid grid-cols-4 gap-6 font-mono text-xs">
          {[
            footer.status,
            footer.timezone,
            footer.reply,
            { label: `© ${year}`, value: footer.brand },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-2">
              <dt className="tracking-wider text-background/50 uppercase">
                {label}
              </dt>
              <dd className="font-sans text-sm text-background not-italic">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
