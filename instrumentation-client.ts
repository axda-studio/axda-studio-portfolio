import posthog from "posthog-js"

import { hasAnalyticsConsent } from "@/lib/consent"

// No consent yet means: no cookies, no localStorage, no events leaving the
// browser. `useConsent()` flips this on when the visitor accepts.
const analyticsAllowed = hasAnalyticsConsent()

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2026-01-30",
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
  persistence: analyticsAllowed ? "localStorage+cookie" : "memory",
  opt_out_capturing_by_default: !analyticsAllowed,
  opt_out_persistence_by_default: !analyticsAllowed,
})
