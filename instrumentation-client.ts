import posthog from "posthog-js"

import { createBeforeSend, isLiveSiteHost } from "@/lib/analytics"
import { hasAnalyticsConsent } from "@/lib/consent"

// No consent yet means: no cookies, no localStorage, no events leaving the
// browser. `useConsent()` flips this on when the visitor accepts.
const analyticsAllowed = hasAnalyticsConsent()

/**
 * The whole non-production story hangs off the host the page was served from:
 * one PostHog project covers every environment, so localhost, CI and preview
 * deploys have to be kept out of it at the client rather than separated later.
 *
 * Both settings below survive the consent flow. Accepting the banner calls
 * `posthog.opt_in_capturing()`, which re-enables capture but touches neither
 * config nor `before_send` — unlike `opt_out_capturing()`, which it would
 * undo.
 */
const isLiveSite = isLiveSiteHost(window.location.hostname)

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2026-01-30",
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
  persistence: analyticsAllowed ? "localStorage+cookie" : "memory",
  opt_out_capturing_by_default: !analyticsAllowed,
  opt_out_persistence_by_default: !analyticsAllowed,
  disable_session_recording: !isLiveSite,
  before_send: createBeforeSend(window.location.hostname),
})
