import { expect, test, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import type { StaticImageData } from "next/image"

import { WorkCard } from "./work-card"

const mockImage = (src: string): StaticImageData => ({
  src,
  width: 1200,
  height: 900,
})

const baseProps = {
  image: {
    src: {
      mobile: {
        default: mockImage("/img/tyklo-cover--mobile.png"),
        dark: mockImage("/img/tyklo-cover--mobile-dark.png"),
      },
      desktop: {
        default: mockImage("/img/tyklo-cover--desktop.png"),
        dark: mockImage("/img/tyklo-cover--desktop-dark.png"),
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

  test("renders all four image variants (mobile/desktop × light/dark) so CSS can swap without JS", () => {
    const { container } = render(<WorkCard {...baseProps} />)
    const imgs = container.querySelectorAll("img")
    const srcs = Array.from(imgs).map(
      (el) =>
        // next/image rewrites the src via /_next/image?url=…&w=…; extract the url param
        new URL(el.getAttribute("src") ?? "", "http://x").searchParams.get(
          "url"
        ) ??
        el.getAttribute("src") ??
        ""
    )
    const decoded = srcs.map((s) => (s ? decodeURIComponent(s) : s))
    expect(decoded).toContain(baseProps.image.src.mobile.default.src)
    expect(decoded).toContain(baseProps.image.src.mobile.dark.src)
    expect(decoded).toContain(baseProps.image.src.desktop.default.src)
    expect(decoded).toContain(baseProps.image.src.desktop.dark.src)
  })
})
