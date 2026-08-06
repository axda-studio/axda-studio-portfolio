import { expect, test, describe } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import { MotionHover } from "./motion-hover"

/**
 * The underline is the only aria-hidden node in the tree, and the wrapper is the
 * only element carrying the gesture handlers.
 */
function parts(container: HTMLElement) {
  const wrapper = container.firstElementChild as HTMLElement
  const underline = wrapper.querySelector<HTMLElement>('[aria-hidden="true"]')
  if (!underline) throw new Error("underline was not rendered")

  return { wrapper, underline }
}

/** Motion animates over 200ms, so settled values need polling rather than a tick. */
async function expectGrown(underline: HTMLElement) {
  await waitFor(() => {
    expect(underline.style.width).toBe("100%")
    expect(underline.style.opacity).toBe("1")
  })
}

async function expectCollapsed(underline: HTMLElement) {
  await waitFor(() => {
    expect(parseFloat(underline.style.width)).toBe(0)
    expect(underline.style.opacity).toBe("0")
  })
}

describe("MotionHover", () => {
  test("renders its children", () => {
    render(
      <MotionHover>
        <button type="button">Work</button>
      </MotionHover>
    )
    expect(screen.getByRole("button", { name: "Work" })).toBeInTheDocument()
  })

  test("merges className onto the wrapper without dropping its own layout classes", () => {
    const { container } = render(
      <MotionHover className="gap-1">
        <span>Work</span>
      </MotionHover>
    )
    const { wrapper } = parts(container)
    expect(wrapper).toHaveClass("gap-1")
    expect(wrapper).toHaveClass("relative", "inline-flex", "flex-col")
  })

  test("keeps the underline out of the accessibility tree", () => {
    const { container } = render(
      <MotionHover>
        <span>Work</span>
      </MotionHover>
    )
    // Decorative only — the child already carries the accessible name.
    expect(parts(container).underline).toHaveAttribute("aria-hidden", "true")
  })

  test("starts collapsed", () => {
    const { container } = render(
      <MotionHover>
        <span>Work</span>
      </MotionHover>
    )
    const { underline } = parts(container)
    expect(parseFloat(underline.style.width)).toBe(0)
    expect(underline.style.opacity).toBe("0")
  })

  test("grows the underline on hover and collapses it on exit", async () => {
    const { container } = render(
      <MotionHover>
        <span>Work</span>
      </MotionHover>
    )
    const { wrapper, underline } = parts(container)

    fireEvent.pointerEnter(wrapper)
    await expectGrown(underline)

    fireEvent.pointerLeave(wrapper)
    await expectCollapsed(underline)
  })

  test("grows the underline when a child takes keyboard focus, and collapses on blur", async () => {
    const { container } = render(
      <MotionHover>
        <button type="button">Work</button>
      </MotionHover>
    )
    const { underline } = parts(container)
    const child = screen.getByRole("button", { name: "Work" })

    // The wrapper span is not focusable itself; it relies on focus bubbling
    // from whatever interactive child it wraps.
    fireEvent.focus(child)
    await expectGrown(underline)

    fireEvent.blur(child)
    await expectCollapsed(underline)
  })

  test("collapses when a focused child blurs, even while still hovered", async () => {
    const { container } = render(
      <MotionHover>
        <button type="button">Work</button>
      </MotionHover>
    )
    const { wrapper, underline } = parts(container)
    const child = screen.getByRole("button", { name: "Work" })

    fireEvent.pointerEnter(wrapper)
    fireEvent.focus(child)
    await expectGrown(underline)

    // Single shared flag: blur wins over the still-active hover. Documents the
    // current behaviour rather than endorsing it.
    fireEvent.blur(child)
    await expectCollapsed(underline)
  })
})
