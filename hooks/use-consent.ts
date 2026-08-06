"use client"

import { useCallback, useMemo, useSyncExternalStore } from "react"
import posthog from "posthog-js"

import {
  parseConsent,
  readRawConsent,
  subscribeToConsent,
  writeConsent,
  type ConsentCategories,
} from "@/lib/consent"

/**
 * Mirrors a decision onto the PostHog client. `instrumentation-client.ts`
 * boots opted-out with memory-only persistence, so this is what actually turns
 * tracking (and its cookies) on.
 */
export function syncAnalytics(categories: ConsentCategories): void {
  if (categories.analytics) {
    posthog.set_config({ persistence: "localStorage+cookie" })
    posthog.opt_in_capturing()
    return
  }

  // Clear anything a previous "accept" left behind before going memory-only.
  posthog.reset(true)
  posthog.set_config({ persistence: "memory" })
  posthog.opt_out_capturing()
}

// The server cannot see localStorage, so it always reports "not answered yet"
// while `hydrated` stays false — that keeps the banner out of the static HTML
// and out of the hydration diff.
const serverSnapshot = () => null
const subscribeToHydration = () => () => {}
const hydratedOnClient = () => true
const notHydratedOnServer = () => false

export function useConsent() {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    hydratedOnClient,
    notHydratedOnServer
  )
  const raw = useSyncExternalStore(
    subscribeToConsent,
    readRawConsent,
    serverSnapshot
  )
  const record = useMemo(() => parseConsent(raw), [raw])

  const save = useCallback((categories: ConsentCategories) => {
    syncAnalytics(categories)
    writeConsent(categories)
  }, [])

  return { record, hydrated, save }
}
