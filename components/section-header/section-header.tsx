import type { ReactNode } from "react"

interface SectionHeaderProps {
  children: ReactNode
  meta?: ReactNode
}

export function SectionHeader({ children, meta }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <h2 className="flex items-center gap-2 text-sm font-medium">
        <span aria-hidden className="size-2 rounded-full bg-primary" />
        {children}
      </h2>
      {meta ? (
        <span className="font-mono text-tiny text-gray-600">{meta}</span>
      ) : null}
    </div>
  )
}
