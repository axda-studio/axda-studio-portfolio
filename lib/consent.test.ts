import { beforeEach, describe, expect, test, vi } from "vitest"

import {
  CONSENT_MAX_AGE_MS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  clearConsent,
  hasAnalyticsConsent,
  parseConsent,
  readConsent,
  writeConsent,
} from "./consent"

beforeEach(() => {
  window.localStorage.clear()
})

describe("readConsent", () => {
  test("returns null when nothing was stored", () => {
    expect(readConsent()).toBeNull()
  })

  test("returns the stored record", () => {
    const record = writeConsent({ analytics: true })

    expect(readConsent()).toEqual(record)
    expect(Date.parse(record.updatedAt)).not.toBeNaN()
  })

  test.each([
    ["malformed JSON", "{nope"],
    ["a non-object payload", '"yes"'],
    ["a missing category", JSON.stringify({ version: CONSENT_VERSION })],
    [
      "an outdated schema version",
      JSON.stringify({
        version: CONSENT_VERSION + 1,
        updatedAt: "2026-01-01T00:00:00.000Z",
        categories: { analytics: true },
      }),
    ],
  ])("returns null for %s", (_label, raw) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, raw)

    expect(readConsent()).toBeNull()
  })

  test("returns null once the record is older than its validity window", () => {
    const stored = writeConsent({ analytics: true })
    const stale = Date.parse(stored.updatedAt) + CONSENT_MAX_AGE_MS + 1

    expect(parseConsent(JSON.stringify(stored), stale)).toBeNull()
  })

  test("still returns a record one millisecond before it expires", () => {
    const stored = writeConsent({ analytics: true })
    const almost = Date.parse(stored.updatedAt) + CONSENT_MAX_AGE_MS - 1

    expect(parseConsent(JSON.stringify(stored), almost)).toEqual(stored)
  })

  test("returns null when the timestamp is not a real date", () => {
    const raw = JSON.stringify({
      version: CONSENT_VERSION,
      updatedAt: "not-a-date",
      categories: { analytics: true },
    })

    expect(parseConsent(raw)).toBeNull()
  })

  test("survives unreachable storage", () => {
    const getItem = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("SecurityError")
      })

    expect(readConsent()).toBeNull()

    getItem.mockRestore()
  })
})

describe("writeConsent", () => {
  test("only persists known categories", () => {
    writeConsent({ analytics: false, tracking: true } as never)

    expect(readConsent()?.categories).toEqual({ analytics: false })
  })

  test("returns the record even when storage rejects the write", () => {
    const setItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("QuotaExceededError")
      })

    expect(writeConsent({ analytics: true }).categories.analytics).toBe(true)
    expect(readConsent()).toBeNull()

    setItem.mockRestore()
  })
})

describe("hasAnalyticsConsent", () => {
  test.each([
    [true, true],
    [false, false],
  ])("is %s when analytics was set to %s", (expected, analytics) => {
    writeConsent({ analytics })

    expect(hasAnalyticsConsent()).toBe(expected)
  })

  test("is false before any decision", () => {
    expect(hasAnalyticsConsent()).toBe(false)
  })
})

describe("clearConsent", () => {
  test("removes the stored decision", () => {
    writeConsent({ analytics: true })
    clearConsent()

    expect(readConsent()).toBeNull()
  })
})
