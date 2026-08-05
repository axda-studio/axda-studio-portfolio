export const CONSENT_STORAGE_KEY = "axda-consent"
// Bumped to 2 when the notice started disclosing session replay: that widens what
// "analytics" covers, so stored decisions are invalidated and the banner re-asks
// rather than carrying an answer given about page views alone.
export const CONSENT_VERSION = 2
export const CONSENT_OPEN_EVENT = "axda:open-consent-preferences"

/**
 * CNIL asks that consent be re-collected periodically rather than kept
 * indefinitely; six months is its recommended interval. An expired record is
 * treated as "never answered", so the banner comes back. Keep in sync with
 * `siteConfig.legal.consentValidityMonths`, which the /legal page states.
 */
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000

export interface ConsentCategories {
  analytics: boolean
}

export interface ConsentRecord {
  version: number
  updatedAt: string
  categories: ConsentCategories
}

export const ACCEPT_ALL: ConsentCategories = { analytics: true }
export const REJECT_ALL: ConsentCategories = { analytics: false }

/**
 * localStorage can throw on access alone (Safari private browsing, storage
 * disabled by policy), so every call site goes through here.
 */
function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage
  } catch {
    // Storage unavailable — consent is then per-page-load only.
    return null
  }
}

const listeners = new Set<() => void>()

/**
 * Subscription for `useSyncExternalStore`: same-tab writes go through the
 * listener set, other tabs come in via the native `storage` event.
 */
export function subscribeToConsent(onChange: () => void): () => void {
  listeners.add(onChange)
  window.addEventListener("storage", onChange)

  return () => {
    listeners.delete(onChange)
    window.removeEventListener("storage", onChange)
  }
}

/** Raw stored payload — a stable snapshot value, so it is safe to render from. */
export function readRawConsent(): string | null {
  try {
    return storage()?.getItem(CONSENT_STORAGE_KEY) ?? null
  } catch {
    return null
  }
}

/**
 * Returns the stored decision, or `null` when the visitor has never answered
 * or the stored record predates the current schema (in which case we ask again).
 */
export function parseConsent(
  raw: string | null,
  now: number = Date.now()
): ConsentRecord | null {
  try {
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== "object" || parsed === null) return null

    const { version, updatedAt, categories } = parsed as Partial<ConsentRecord>
    if (version !== CONSENT_VERSION) return null
    if (typeof updatedAt !== "string") return null
    if (typeof categories?.analytics !== "boolean") return null

    const age = now - Date.parse(updatedAt)
    if (Number.isNaN(age) || age > CONSENT_MAX_AGE_MS) return null

    return {
      version,
      updatedAt,
      categories: { analytics: categories.analytics },
    }
  } catch {
    // Corrupted payload — treat as "never answered".
    return null
  }
}

export function readConsent(): ConsentRecord | null {
  return parseConsent(readRawConsent())
}

export function writeConsent(
  categories: ConsentCategories,
  now: Date = new Date()
): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    updatedAt: now.toISOString(),
    categories: { analytics: categories.analytics },
  }

  try {
    storage()?.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Quota or private mode — the in-memory decision still applies.
  }

  listeners.forEach((notify) => notify())

  return record
}

export function clearConsent(): void {
  try {
    storage()?.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    // Nothing to do — storage is unreachable.
  }

  listeners.forEach((notify) => notify())
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.categories.analytics === true
}

/** Re-opens the banner in preferences mode (used by the footer link). */
export function openConsentPreferences(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT))
}
