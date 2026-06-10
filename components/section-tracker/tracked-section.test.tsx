import { expect, test, describe, vi, beforeEach } from "vitest"
import { render } from "@testing-library/react"

import { TrackedSection } from "./tracked-section"

const captureMock = vi.fn()
vi.mock("posthog-js", () => ({
  default: {
    capture: (...args: unknown[]) => captureMock(...args),
  },
}))

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void

const observers: Array<{
  callback: ObserverCallback
  trigger: (intersecting: boolean, ratio: number) => void
  disconnect: ReturnType<typeof vi.fn>
}> = []

class MockIntersectionObserver {
  callback: ObserverCallback
  disconnect = vi.fn()
  observe = vi.fn()
  unobserve = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ""
  thresholds: ReadonlyArray<number> = []

  constructor(callback: ObserverCallback) {
    this.callback = callback
    observers.push({
      callback,
      trigger: (intersecting, ratio) => {
        callback([
          {
            isIntersecting: intersecting,
            intersectionRatio: ratio,
            target: document.createElement("section"),
            time: 0,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
          } as IntersectionObserverEntry,
        ])
      },
      disconnect: this.disconnect,
    })
  }
}

beforeEach(() => {
  captureMock.mockClear()
  observers.length = 0
  sessionStorage.clear()
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver)
})

describe("TrackedSection", () => {
  test("renders its children inside a <section> with the given id and className", () => {
    const { container } = render(
      <TrackedSection section="work" id="work" className="space-y-4">
        <span>content</span>
      </TrackedSection>
    )
    const section = container.querySelector("section")
    expect(section).not.toBeNull()
    expect(section?.id).toBe("work")
    expect(section?.className).toContain("space-y-4")
    expect(section?.textContent).toBe("content")
  })

  test("fires section_viewed when the section crosses the 50% threshold", () => {
    render(
      <TrackedSection section="pillars" id="pillars">
        <span />
      </TrackedSection>
    )

    expect(captureMock).not.toHaveBeenCalled()

    observers[0].trigger(true, 0.6)

    expect(captureMock).toHaveBeenCalledWith("section_viewed", {
      section: "pillars",
    })
  })

  test("does not fire when intersectionRatio is below 0.5", () => {
    render(
      <TrackedSection section="stack" id="stack">
        <span />
      </TrackedSection>
    )

    observers[0].trigger(true, 0.3)

    expect(captureMock).not.toHaveBeenCalled()
  })

  test("fires only once per session for the same section", () => {
    const { unmount } = render(
      <TrackedSection section="contact" id="contact">
        <span />
      </TrackedSection>
    )
    observers[0].trigger(true, 0.8)
    expect(captureMock).toHaveBeenCalledTimes(1)

    unmount()

    render(
      <TrackedSection section="contact" id="contact">
        <span />
      </TrackedSection>
    )

    // sessionStorage dedupe makes the effect bail out before creating
    // a second IntersectionObserver — so no new event fires either.
    expect(observers).toHaveLength(1)
    expect(captureMock).toHaveBeenCalledTimes(1)
  })
})
