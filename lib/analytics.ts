import type { BeforeSendFn } from "posthog-js"

import { bareHostname, siteConfig } from "@/lib/site-config"

const LIVE_HOSTNAME = bareHostname(new URL(siteConfig.url).hostname)

/**
 * Set `localStorage.setItem("posthog-dev-send", "1")` in the console to let
 * events from localhost or a preview through while working on instrumentation.
 * A storage key rather than an env var so it toggles without a rebuild, and
 * per-browser so it cannot be left on for anyone else.
 */
export const DEV_SEND_STORAGE_KEY = "posthog-dev-send"

/**
 * Whether a hostname is the live site, as opposed to localhost, a Playwright
 * run, or a `*.vercel.app` preview.
 *
 * Deliberately not an env var. This runs in the browser, where `VERCEL_ENV`
 * does not exist and `NEXT_PUBLIC_VERCEL_ENV` depends on Vercel's "expose
 * system environment variables" project setting — if that is ever off, the
 * check silently inverts. `NODE_ENV` is no better: it is "production" for
 * every `next build`, so it would miss CI and preview deploys, which are the
 * two cases worth catching. The host the page was actually served from cannot
 * be wrong.
 */
export function isLiveSiteHost(hostname: string): boolean {
  return bareHostname(hostname) === LIVE_HOSTNAME
}

function devSendEnabled(): boolean {
  try {
    return window.localStorage.getItem(DEV_SEND_STORAGE_KEY) === "1"
  } catch {
    // Storage unreachable (Safari private mode, blocked by policy) — the
    // escape hatch is opt-in, so failing closed is the safe default.
    return false
  }
}

/**
 * Drops events that did not originate from the live site.
 *
 * One PostHog project has to serve every environment, so anything that reaches
 * it lands in the same dataset as real visitors and cannot be told apart
 * afterwards. Dropping at the source keeps the data clean and costs no quota,
 * which post-hoc filtering does not.
 *
 * This runs at `before_send` — the last step before the network call — rather
 * than via `opt_out_capturing()`, which the consent flow would undo: accepting
 * the banner calls `posthog.opt_in_capturing()` (see `syncAnalytics()` in
 * hooks/use-consent.ts). Everything upstream of the send still runs, so
 * persistence, cookies and the consent e2e assertions are unaffected, and
 * `debug: true` still logs every capture locally — you can verify an event
 * fires with the right properties without it ever leaving the browser.
 */
export function createBeforeSend(hostname: string): BeforeSendFn {
  if (isLiveSiteHost(hostname)) return (event) => event

  return (event) => {
    if (!event || !devSendEnabled()) return null

    // Tagged so anything sent through the escape hatch stays filterable, and
    // deletable, once it is in the project alongside real traffic.
    return {
      ...event,
      properties: { ...event.properties, environment: "development" },
    }
  }
}
