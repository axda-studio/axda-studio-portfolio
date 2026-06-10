import {
  House,
  BriefcaseBusiness,
  Layers,
  UserRound,
  MessageCircle,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  id: number
  label: string
  slug: string
  icon: LucideIcon
}

export const NAV_ITEMS = [
  { id: 1, label: "work", slug: "#work", icon: BriefcaseBusiness },
  { id: 2, label: "stack", slug: "#stack", icon: Layers },
  { id: 3, label: "about", slug: "#about", icon: UserRound },
  { id: 4, label: "faq", slug: "#faq", icon: MessageCircle },
] as const satisfies readonly NavItem[]

export const MOBILE_NAV_ITEMS = [
  { id: 0, label: "home", slug: "/", icon: House },
  { id: 1, label: "work", slug: "#work", icon: BriefcaseBusiness },
  { id: 2, label: "stack", slug: "#stack", icon: Layers },
  { id: 3, label: "about", slug: "#about", icon: UserRound },
  { id: 4, label: "contact", slug: "#contact", icon: MessageCircle },
] as const satisfies readonly NavItem[]

export const CONTACT_URL = "#contact" as const
export const WORK_URL = "#work" as const
export const CLAUDE_CODE_URL = "#claude-code" as const

export const EMAIL_ADDRESS = "hello@axda-studio.fr" as const
export const EMAIL_HREF = `mailto:${EMAIL_ADDRESS}` as const
export const CAL_URL = "https://calendar.app.google/VEmfweYv5o8gjiva6" as const
export const GITHUB_URL = "https://github.com/axda-studio" as const
export const LINKEDIN_URL = "https://www.linkedin.com/in/alyx-darenne" as const
