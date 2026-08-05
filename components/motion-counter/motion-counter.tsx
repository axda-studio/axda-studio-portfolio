"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

// useLayoutEffect is a no-op on the server and React warns about it there.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

/** Splits "−65%" into its sign/prefix, the digits to count, and any trailing unit. */
const METRIC_PATTERN = /^(\D*)(\d+(?:[.,]\d+)?)(.*)$/

interface ParsedMetric {
  prefix: string
  target: number
  suffix: string
  /** Decimals in the source value, so the count-up never gains or drops digits. */
  fractionDigits: number
  /** The decimal separator the source used — "," in fr/es, "." in en. */
  decimalSeparator: string
}

export function parseMetric(value: string): ParsedMetric | null {
  const match = value.match(METRIC_PATTERN)
  if (!match) return null

  const [, prefix, digits, suffix] = match
  const separator = digits.includes(",") ? "," : "."
  const [, fraction = ""] = digits.split(separator)

  return {
    prefix,
    target: Number(digits.replace(",", ".")),
    suffix,
    fractionDigits: fraction.length,
    decimalSeparator: separator,
  }
}

const format = (
  latest: number,
  { prefix, suffix, fractionDigits, decimalSeparator }: ParsedMetric
) =>
  `${prefix}${latest.toFixed(fractionDigits).replace(".", decimalSeparator)}${suffix}`

interface MotionCounterProps {
  /** The metric as authored, e.g. "−65%", "100%", "98". Rendered verbatim if it holds no number. */
  value: string
  /** Seconds to wait before counting, to stagger a row of metrics. */
  delay?: number
  className?: string
}

/**
 * Counts a metric up to its final value the first time it scrolls into view.
 *
 * The value is rendered in full on the server and for assistive tech; only the
 * visual span counts, and it stays at the final value when motion is reduced.
 */
export function MotionCounter({
  value,
  delay = 0,
  className,
}: MotionCounterProps) {
  // Memoized so the animation effect below restarts only when the value does.
  const parsed = useMemo(() => parseMetric(value), [value])
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = Boolean(parsed) && !prefersReducedMotion
  const [display, setDisplay] = useState(value)

  // Reset to zero before the browser paints, so the final value never flashes.
  useIsomorphicLayoutEffect(() => {
    if (!parsed || !shouldAnimate) return
    setDisplay(format(0, parsed))
  }, [shouldAnimate, parsed])

  useEffect(() => {
    if (!parsed || !shouldAnimate || !inView) return

    const controls = animate(0, parsed.target, {
      duration: 1.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(format(latest, parsed)),
    })

    return () => controls.stop()
  }, [inView, shouldAnimate, parsed, delay])

  if (!parsed) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span aria-hidden>{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
