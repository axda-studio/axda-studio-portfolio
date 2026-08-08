import { beforeEach, describe, expect, test } from "vitest"
import type { CaptureResult } from "posthog-js"

import {
  DEV_SEND_STORAGE_KEY,
  createBeforeSend,
  isLiveSiteHost,
} from "./analytics"
import { bareHostname, siteConfig } from "./site-config"

// Whichever form `siteConfig.url` is written in, both must be recognised: the
// apex and the www host are one site, and only one of them serves a 200.
const configuredHostname = new URL(siteConfig.url).hostname
const apexHostname = bareHostname(configuredHostname)
const previewHostname = "portfolio-git-feature.vercel.app"

function event(): CaptureResult {
  return {
    uuid: "0199e0f0-0000-7000-8000-000000000000",
    event: "cta_clicked",
    properties: { label: "Get in touch", location: "header" },
  }
}

beforeEach(() => {
  window.localStorage.clear()
})

describe("isLiveSiteHost", () => {
  test("accepts the host siteConfig.url is written with", () => {
    expect(isLiveSiteHost(configuredHostname)).toBe(true)
  })

  test("accepts the apex", () => {
    expect(isLiveSiteHost(apexHostname)).toBe(true)
  })

  test("accepts the www host, which is what Vercel actually serves", () => {
    expect(isLiveSiteHost(`www.${apexHostname}`)).toBe(true)
  })

  test.each([
    ["localhost", "localhost"],
    ["the Playwright host", "127.0.0.1"],
    ["a branch preview", previewHostname],
    ["a per-deployment preview host", "portfolio-abc123.vercel.app"],
  ])("rejects %s", (_label, hostname) => {
    expect(isLiveSiteHost(hostname)).toBe(false)
  })

  test("rejects a lookalike domain that merely ends with the live one", () => {
    expect(isLiveSiteHost(`evil-${apexHostname}`)).toBe(false)
    expect(isLiveSiteHost(`${apexHostname}.attacker.com`)).toBe(false)
  })
})

describe("createBeforeSend", () => {
  test("sends events from the live site through untouched", () => {
    const beforeSend = createBeforeSend(configuredHostname)
    const captured = event()

    expect(beforeSend(captured)).toBe(captured)
  })

  test("adds no environment tag to live events", () => {
    const sent = createBeforeSend(configuredHostname)(event())

    expect(sent?.properties).not.toHaveProperty("environment")
  })

  test.each([["localhost"], ["127.0.0.1"], [previewHostname]])(
    "drops events from %s",
    (hostname) => {
      expect(createBeforeSend(hostname)(event())).toBeNull()
    }
  )

  test("lets events through once the dev escape hatch is set", () => {
    window.localStorage.setItem(DEV_SEND_STORAGE_KEY, "1")

    const sent = createBeforeSend("localhost")(event())

    expect(sent).not.toBeNull()
    expect(sent?.event).toBe("cta_clicked")
  })

  test("tags escape-hatch events so they stay filterable, keeping own properties", () => {
    window.localStorage.setItem(DEV_SEND_STORAGE_KEY, "1")

    const sent = createBeforeSend("localhost")(event())

    expect(sent?.properties).toEqual({
      label: "Get in touch",
      location: "header",
      environment: "development",
    })
  })

  test('ignores an escape-hatch value other than "1"', () => {
    window.localStorage.setItem(DEV_SEND_STORAGE_KEY, "true")

    expect(createBeforeSend("localhost")(event())).toBeNull()
  })

  test("reads the flag per event, so toggling it needs no reload", () => {
    const beforeSend = createBeforeSend("localhost")
    expect(beforeSend(event())).toBeNull()

    window.localStorage.setItem(DEV_SEND_STORAGE_KEY, "1")
    expect(beforeSend(event())).not.toBeNull()
  })

  test("passes a null event straight through", () => {
    expect(createBeforeSend("localhost")(null)).toBeNull()
    expect(createBeforeSend(configuredHostname)(null)).toBeNull()
  })
})
