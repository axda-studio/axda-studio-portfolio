export const ABOUT_FACT_KEYS = [
  "now",
  "based",
  "stack",
  "animation",
  "testing",
  "analytics",
  "languages",
] as const

export type AboutFactKey = (typeof ABOUT_FACT_KEYS)[number]
