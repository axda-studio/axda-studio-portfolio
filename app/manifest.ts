import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.author.jobTitle}`,
    short_name: siteConfig.name,
    description: siteConfig.tagline,
    start_url: "/en",
    display: "standalone",
    background_color: "#F4F1EA",
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  }
}
