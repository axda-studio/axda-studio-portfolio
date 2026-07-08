import { expect, test, describe, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"

import { WorkCard } from "./work-card"

// next-themes is consumed by next/image's parent context indirectly; stub it
// so the component renders deterministically in jsdom. The theme value is
// hoisted so individual tests can flip to dark before rendering.
const themeState = vi.hoisted(() => ({ theme: "light" }))

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: themeState.theme,
    resolvedTheme: themeState.theme,
  }),
}))

beforeEach(() => {
  themeState.theme = "light"
})

const baseProps = {
  image: {
    src: {
      mobile: {
        default: "/img/tyklo-cover--mobile.png",
        dark: "/img/tyklo-cover--mobile-dark.png",
      },
      desktop: {
        default: "/img/tyklo-cover--desktop.png",
        dark: "/img/tyklo-cover--desktop-dark.png",
      },
    },
    alt: "Tyklo preview",
  },
  title: { prefix: "Tyklo", emphasis: "Timesheet made easy" },
  tags: "WEB · B2B · SaaS",
  description: "A web-based timesheet app for Parakar employees.",
  liveUrl: "https://tyklo.eu",
  liveLabel: "Live site",
  metrics: [
    { value: "−65%", label: "Time to submit" },
    { value: "100%", label: "Test coverage" },
    { value: "+38%", label: "On-time submissions" },
    { value: "98", label: "Lighthouse perf" },
  ],
}

describe("WorkCard", () => {
  test("renders the title prefix and emphasis", () => {
    render(<WorkCard {...baseProps} />)
    expect(screen.getByText("Tyklo")).toBeInTheDocument()
    expect(screen.getByText("Timesheet made easy")).toBeInTheDocument()
  })

  test("renders tags and description", () => {
    render(<WorkCard {...baseProps} />)
    expect(screen.getByText("WEB · B2B · SaaS")).toBeInTheDocument()
    expect(screen.getByText(baseProps.description)).toBeInTheDocument()
  })

  test("live link points to liveUrl in a new tab with safe rel", () => {
    render(<WorkCard {...baseProps} />)
    const link = screen.getByRole("link", { name: /live site/i })
    expect(link).toHaveAttribute("href", "https://tyklo.eu")
    expect(link).toHaveAttribute("target", "_blank")
    const rel = link.getAttribute("rel") ?? ""
    expect(rel).toContain("noopener")
    expect(rel).toContain("noreferrer")
  })

  test("renders all four metrics — values + labels", () => {
    render(<WorkCard {...baseProps} />)
    for (const { value, label } of baseProps.metrics) {
      expect(screen.getByText(value)).toBeInTheDocument()
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  test("in dark theme, renders the dark image variants", () => {
    themeState.theme = "dark"
    render(<WorkCard {...baseProps} />)
    const images = screen.getAllByRole("img", { name: baseProps.image.alt })
    const srcs = images.map((img) => img.getAttribute("src") ?? "")
    // next/image encodes the src into the query string of its /_next/image url.
    expect(
      srcs.some((src) => src.includes(encodeURIComponent("mobile-dark")))
    ).toBe(true)
    expect(
      srcs.some((src) => src.includes(encodeURIComponent("desktop-dark")))
    ).toBe(true)
  })
})
