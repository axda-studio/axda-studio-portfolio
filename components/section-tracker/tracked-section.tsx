"use client"

import { useEffect, useRef, type ReactNode } from "react"
import posthog from "posthog-js"

const STORAGE_PREFIX = "axda:section_viewed:"

interface TrackedSectionProps {
  section: string
  id: string
  className?: string
  children: ReactNode
}

export function TrackedSection({
  section,
  id,
  className,
  children,
}: TrackedSectionProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const key = STORAGE_PREFIX + section
    if (sessionStorage.getItem(key)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          sessionStorage.setItem(key, "1")
          posthog.capture("section_viewed", { section })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [section])

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  )
}
