/**
 * Rows of the cookies / local-storage table. Names are language-neutral so they
 * live here rather than in the locale files; purpose, kind and duration are
 * translated. `consentRequired: false` means strictly necessary — set whatever
 * the visitor chooses.
 */
export const STORAGE_ITEMS = [
  { id: "locale", name: "Next-Locale", consentRequired: false },
  { id: "theme", name: "theme", consentRequired: false },
  { id: "consent", name: "axda-consent", consentRequired: false },
  { id: "analytics", name: "ph_…_posthog", consentRequired: true },
] as const

export const PURPOSE_IDS = ["analytics", "contact", "technical"] as const

export const PROCESSOR_IDS = ["analytics", "host"] as const
