export const CLAUDE_CODE_STEPS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
] as const

export type ClaudeCodeStepId = (typeof CLAUDE_CODE_STEPS)[number]["id"]
