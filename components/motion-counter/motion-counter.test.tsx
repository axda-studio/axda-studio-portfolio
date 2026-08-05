import { expect, test, describe } from "vitest"
import { render, screen } from "@testing-library/react"

import { MotionCounter, parseMetric } from "./motion-counter"

describe("parseMetric", () => {
  test("splits sign, digits and unit", () => {
    expect(parseMetric("−65%")).toMatchObject({
      prefix: "−",
      target: 65,
      suffix: "%",
      fractionDigits: 0,
    })
    expect(parseMetric("+38%")).toMatchObject({ prefix: "+", target: 38 })
    expect(parseMetric("98")).toMatchObject({
      prefix: "",
      target: 98,
      suffix: "",
    })
  })

  test("keeps the source decimals and separator", () => {
    expect(parseMetric("4,5x")).toMatchObject({
      target: 4.5,
      suffix: "x",
      fractionDigits: 1,
      decimalSeparator: ",",
    })
  })

  test("returns null for values with no number to count", () => {
    expect(parseMetric("N/A")).toBeNull()
  })
})

describe("MotionCounter", () => {
  test("exposes the final value to assistive tech", () => {
    render(<MotionCounter value="−65%" />)
    expect(screen.getByText("−65%")).toBeInTheDocument()
  })

  test("hides the counting span from assistive tech", () => {
    const { container } = render(<MotionCounter value="+38%" />)
    expect(container.querySelector("[aria-hidden]")).toBeInTheDocument()
  })

  test("renders a non-numeric value verbatim", () => {
    render(<MotionCounter value="N/A" />)
    expect(screen.getByText("N/A")).toBeInTheDocument()
  })
})
