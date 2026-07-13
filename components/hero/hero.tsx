"use client"

import { HeroCtas } from "@/components/hero"
import { TrackedSection } from "@/components/section-tracker"
import { motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

interface HeroProps {
  tagline: {
    role: string
    skills: string
  }
  title: {
    headline: {
      prefix: string
      emphasis: string
    }
    tail: string
  }
  subtitle: {
    prefix: string
    emphasis: string
  }
  ctaPrimary: string
  ctaSecondary: string
}

const TYPE_SPEED_MS = 60
const START_DELAY_MS = 200

const Caret = () => {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return null
  return (
    <motion.span
      aria-hidden
      className="ml-1 inline-block h-[0.75em] w-[0.06em] translate-y-[-0.05em] bg-current align-middle"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: 0.9,
        repeat: Infinity,
        times: [0, 0.5, 0.5, 1],
        ease: "linear",
      }}
    />
  )
}

export const Hero = ({
  tagline,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) => {
  const { prefix, emphasis } = title.headline
  const { tail } = title
  const total = prefix.length + emphasis.length + tail.length

  const shouldReduceMotion = useReducedMotion()
  const [revealed, setRevealed] = useState(total)

  useEffect(() => {
    if (shouldReduceMotion) return
    // SSR renders full text (SEO / no-JS / pre-hydration). On the client we
    // reset to 0 and animate — this cascading render IS the animation trigger.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRevealed(0)
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setRevealed((r) => {
          if (r >= total) {
            clearInterval(id)
            return r
          }
          return r + 1
        })
      }, TYPE_SPEED_MS)
    }, START_DELAY_MS)
    return () => clearTimeout(start)
  }, [total, shouldReduceMotion])

  const prefixLen = prefix.length
  const emphasisLen = emphasis.length

  const bottomDelay = Math.min(
    (START_DELAY_MS + total * TYPE_SPEED_MS * 0.8) / 1000,
    1.5
  )

  const inPrefix = revealed < prefixLen
  const inEmphasis = revealed >= prefixLen && revealed < prefixLen + emphasisLen
  const onLine2 = revealed >= prefixLen + emphasisLen

  const prefixShown = prefix.slice(0, Math.min(revealed, prefixLen))
  const emphasisShown = emphasis.slice(
    0,
    Math.max(0, Math.min(revealed - prefixLen, emphasisLen))
  )
  const tailShown = tail.slice(
    0,
    Math.max(0, revealed - prefixLen - emphasisLen)
  )

  return (
    <TrackedSection
      section="hero"
      id="hero"
      className="relative mx-auto flex w-full max-w-6xl flex-col justify-center overflow-hidden px-4 py-14 lg:min-h-screen lg:px-0 lg:py-0"
    >
      <HeroWatermark />
      <div className="flex h-full w-full flex-col gap-y-6">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 flex flex-wrap items-center gap-x-2 text-mono-up"
        >
          <span className="text-primary">{tagline.role}</span>
          <span aria-hidden className="text-ink-3">
            —
          </span>
          <span>{tagline.skills}</span>
        </motion.p>

        <h1 className="relative z-10 my-auto text-[clamp(2.75rem,12vw,11rem)] leading-[0.85] font-black tracking-[-0.03em]">
          <span className="block">
            {prefixShown}
            {inPrefix && <Caret />}
            {revealed >= prefixLen && (
              <>
                {" "}
                <span className="font-serif font-normal text-primary italic">
                  {emphasisShown}
                </span>
                {inEmphasis && <Caret />}
              </>
            )}
          </span>
          <span className="block min-h-[0.85em]">
            {tailShown}
            {onLine2 && <Caret />}
          </span>
        </h1>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: bottomDelay, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-start justify-between gap-y-8 lg:flex-row lg:items-end lg:gap-x-8"
        >
          <p className="max-w-3xs font-serif text-xl leading-snug italic lg:max-w-2xs lg:text-3xl">
            {subtitle.prefix}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {subtitle.emphasis}
              <SubtitleUnderline />
            </span>
          </p>
          <HeroCtas primaryLabel={ctaPrimary} secondaryLabel={ctaSecondary} />
        </motion.div>
      </div>
    </TrackedSection>
  )
}

const HeroWatermark = () => (
  <span
    aria-hidden
    className="pointer-events-none absolute top-1/2 right-[-2vw] hidden -translate-y-1/2 font-serif text-[34rem] leading-none text-primary/10 italic select-none lg:block xl:text-[42rem]"
  >
    a
  </span>
)

const SubtitleUnderline = () => (
  <svg
    aria-hidden
    viewBox="0 0 120 8"
    preserveAspectRatio="none"
    className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full text-primary"
  >
    <path
      d="M2 5 Q 20 1, 40 4 T 80 4 T 118 3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)
