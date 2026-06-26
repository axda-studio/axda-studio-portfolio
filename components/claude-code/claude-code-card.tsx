import type { ReactNode } from "react"
import { CodeXml, Shield, TrendingUp } from "lucide-react"

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
  eyebrow: string
  title: { line1: string; line2: string }
  description: ReactNode
  stepsLabel: string
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
  stepsLabel,
  steps,
  foundations,
}: ClaudeCodeCardProps) {
  return (
    <div className="relative space-y-8 lg:space-y-10">
      {/* Top: terminal mock + eyebrow/title/description/foundations */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
        <TerminalMock className="hidden lg:flex" />
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* eyebrow intentionally hidden — kept in props/locale for future re-enable */}
          <h3 className="font-serif text-3xl leading-tight font-medium italic md:text-4xl lg:text-5xl">
            <span>{title.line1}</span>{" "}
            <span className="text-primary">{title.line2}</span>
          </h3>
          <p className="text-sm leading-relaxed lg:text-base">{description}</p>
          <div className="mt-2">
            <FoundationRow
              {...foundations.tooling}
              icon={<CodeXml size={18} />}
            />
            <FoundationRow
              {...foundations.guardrails}
              icon={<Shield size={18} />}
            />
            <LiftRow
              {...foundations.lift}
              icon={<TrendingUp size={18} />}
              isLast
            />
          </div>
        </div>
      </div>

      {/* Workflow steps (mobile only — desktop list intentionally hidden) */}
      <ul className="space-y-3 lg:hidden" aria-label={stepsLabel}>
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
    </div>
  )
}

function IconSquare({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
    >
      {children}
    </div>
  )
}

function FoundationRow({
  icon,
  label,
  primary,
  suffix,
  isLast = false,
}: ClaudeCodeFoundation & { icon: ReactNode; isLast?: boolean }) {
  const hasSuffix = suffix.trim().length > 0
  return (
    <div
      className={`flex items-center gap-4 py-4 ${
        isLast ? "" : "border-b border-border"
      }`}
    >
      <IconSquare>{icon}</IconSquare>
      <div className="flex flex-col">
        <p className="font-mono text-tiny tracking-wider text-gray-600 uppercase">
          {label}
        </p>
        <p className="text-sm lg:text-base">
          <span className="font-medium">{primary}</span>
          {hasSuffix && (
            <>
              {" "}
              <span className="">{suffix}</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

function LiftRow({
  icon,
  label,
  emphasis,
  text,
  isLast = false,
}: ClaudeCodeLift & { icon: ReactNode; isLast?: boolean }) {
  return (
    <div
      className={`flex items-start gap-4 py-4 ${
        isLast ? "" : "border-b border-border"
      }`}
    >
      <IconSquare>{icon}</IconSquare>
      <div className="flex flex-col">
        <p className="font-mono text-tiny tracking-wider text-gray-600 uppercase">
          {label}
        </p>
        <p className="text-sm lg:text-base">
          <span className="font-serif text-2xl leading-none font-bold italic">
            {emphasis}
          </span>{" "}
          <span>{text}</span>
        </p>
      </div>
    </div>
  )
}

function TerminalMock({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col overflow-hidden rounded-xl border bg-neutral-900 font-mono shadow-lg ${className ?? ""}`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-800 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-500" />
          <span className="size-3 rounded-full bg-yellow-500" />
          <span className="size-3 rounded-full bg-green-500" />
        </div>
        <span className="text-tiny text-neutral-400">~/axda — claude code</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-4 py-4 text-xs text-neutral-200">
        <p>
          <Prompt /> claude{" "}
          <span className="text-neutral-100">
            &quot;scaffold dashboard route + tests&quot;
          </span>
        </p>
        <p>
          <Bullet /> Reading <span className="text-neutral-100">CLAUDE.md</span>
          <span className="text-neutral-400"> · </span>design tokens
          <span className="text-neutral-400"> · </span>MCP context
        </p>
        <p>
          <Bullet /> Planning <Arrow />{" "}
          <span className="text-neutral-100">spec.md</span>
          <span className="text-neutral-400"> · </span>6 steps
        </p>
        <p>
          <Bullet /> Editing <Arrow />{" "}
          <span className="text-neutral-100">app/dashboard/page.tsx</span>
        </p>
        <p>
          <Bullet /> Editing <Arrow />{" "}
          <span className="text-neutral-100">components/Chart.tsx</span>
        </p>
        <p>
          <Bullet /> Editing <Arrow />{" "}
          <span className="text-neutral-100">lib/metrics.ts</span>
        </p>

        <p className="h-3" aria-hidden="true" />

        <p>
          <Prompt /> pnpm typecheck && pnpm test
        </p>
        <p>
          <Check /> tsc — no errors{" "}
          <span className="text-neutral-400">strict</span>
        </p>
        <p>
          <Check /> 142 passed <span className="text-neutral-400">vitest</span>
        </p>
        <p>
          <Check /> 18 passed{" "}
          <span className="text-neutral-400">playwright e2e</span>
        </p>
        <p>
          <span className="text-neutral-300">coverage</span> 100%{" "}
          <span className="ml-1 -tracking-widest text-primary">━━━━━━━━</span>
        </p>

        <p className="h-3" aria-hidden="true" />

        <p>
          <Bullet /> <span className="text-neutral-400">Awaiting review</span>{" "}
          <span className="text-neutral-400">— diff opened</span>
        </p>
        <p>
          <Prompt /> git commit -m{" "}
          <span className="text-neutral-100">&quot;feat: dashboard&quot;</span>
        </p>
        <p className="flex items-center gap-2">
          <Check />
          <span>human-reviewed</span>
          <span className="text-neutral-400">·</span>
          <span>merged</span>
        </p>
      </div>
    </div>
  )
}

function Prompt() {
  return <span className="text-primary">$</span>
}

function Bullet() {
  return <span className="text-primary">●</span>
}

function Check() {
  return <span className="text-emerald-400">✓</span>
}

function Arrow() {
  return <span className="text-primary">▸</span>
}
