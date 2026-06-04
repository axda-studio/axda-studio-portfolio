export const PILLARS = [
  { id: 1, badgeKeys: ["motion", "theming", "designSystems"] },
  { id: 2, badgeKeys: ["typescript", "vitest", "playwright"] },
  { id: 3, badgeKeys: ["seo", "a11yI18n", "posthog"] },
] as const

export type PillarBadgeKey = (typeof PILLARS)[number]["badgeKeys"][number]
