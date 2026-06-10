export const FAQ_ITEMS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
] as const

export type FaqItemId = (typeof FAQ_ITEMS)[number]["id"]
