import { X } from "lucide-react"

import { ClaudeLogo } from "./claude-logo"

interface ClaudeCodeStep {
  id: number
  label: string
  meta: string
}

interface ClaudeCodeFoundation {
  label: string
  primary: string
  suffix: string
}

interface ClaudeCodeLift {
  label: string
  emphasis: string
  text: string
}

interface ClaudeCodeCardProps {
  title: { line1: string; line2: string }
  description: string
  steps: ClaudeCodeStep[]
  foundations: {
    tooling: ClaudeCodeFoundation
    guardrails: ClaudeCodeFoundation
    lift: ClaudeCodeLift
  }
  never: { label: string; text: string }
}

export function ClaudeCodeCard({
  title,
  description,
  steps,
  foundations,
  never,
}: ClaudeCodeCardProps) {
  return (
    <div className="relative space-y-8 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 lg:space-y-10 lg:p-12">
      <div className="flex justify-between lg:items-center">
        <h3 className="max-w-4/5 font-serif text-3xl leading-tight font-medium italic lg:text-5xl">
          <span className="">{title.line1}</span>
          {""}
          <span className="text-primary">{title.line2}</span>
        </h3>
        <ClaudeLogo
          aria-hidden="true"
          className="size-10 text-primary opacity-70"
        />
      </div>

      <p className="max-w-xl text-sm lg:text-base">{description}</p>

      <ul className="space-y-3 lg:hidden" aria-label="Workflow steps">
        {steps.map(({ id, label, meta }) => (
          <li
            key={id}
            className="flex items-baseline gap-4 rounded-2xl border border-border bg-background px-4 py-3"
          >
            <span className="font-mono text-tiny text-gray-600">
              {String(id).padStart(2, "0")}
            </span>
            <span className="text-base font-semibold">{label}</span>
            <span className="flex-1 text-right text-sm text-muted-foreground">
              {meta}
            </span>
          </li>
        ))}
      </ul>

      <ol
        className="hidden items-center gap-2 lg:flex"
        aria-label="Workflow steps"
      >
        {steps.map(({ id, label }, index) => (
          <li
            key={id}
            className="flex flex-1 items-center gap-3 last:flex-none"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-muted-foreground">
              {id}
            </div>
            <span className="text-base font-semibold">{label}</span>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="ml-2 flex-1 border-t border-border"
              />
            )}
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-border">
        <FoundationBlock {...foundations.tooling} className="lg:pr-8" />
        <FoundationBlock {...foundations.guardrails} className="lg:px-8" />
        <LiftBlock {...foundations.lift} className="lg:pl-8" />
      </div>

      <p className="flex items-start gap-3 text-sm">
        <X
          size={18}
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-primary"
        />
        <span>
          <strong className="font-semibold">{never.label}</strong>{" "}
          <span className="text-muted-foreground">{never.text}</span>
        </span>
      </p>
    </div>
  )
}

function FoundationBlock({
  label,
  primary,
  suffix,
  className,
}: ClaudeCodeFoundation & { className?: string }) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <p className="font-mono text-tiny tracking-wider text-gray-600 uppercase">
        {label}
      </p>
      <p className="text-base">
        <span className="font-medium">{primary}</span>{" "}
        <span className="text-muted-foreground">{suffix}</span>
      </p>
    </div>
  )
}

function LiftBlock({
  label,
  emphasis,
  text,
  className,
}: ClaudeCodeLift & { className?: string }) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <p className="font-mono text-tiny tracking-wider text-gray-600 uppercase">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <span className="shrink-0 font-serif text-5xl leading-none font-medium italic">
          {emphasis}
        </span>
        <span className="text-base text-muted-foreground">{text}</span>
      </div>
    </div>
  )
}
