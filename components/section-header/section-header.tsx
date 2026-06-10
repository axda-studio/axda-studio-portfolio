import type { ReactNode } from "react"

interface SectionHeaderProps {
  children: ReactNode
  meta?: ReactNode
}

export function SectionHeader({ children, meta }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 font-medium">
        <span className="size-2 rounded-full bg-primary" />
        {children}
      </div>
      {meta ? (
        <span className="font-mono text-tiny text-gray-600">{meta}</span>
      ) : null}
    </div>
  )
}
