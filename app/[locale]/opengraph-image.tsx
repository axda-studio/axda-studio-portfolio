import { ImageResponse } from "next/og"
import { LOCALES } from "@/locales/constants"
import { siteConfig } from "@/lib/site-config"
import enSeo from "@/locales/en/seo"
import frSeo from "@/locales/fr/seo"
import esSeo from "@/locales/es/seo"

const SEO_BY_LOCALE = { en: enSeo, fr: frSeo, es: esSeo } as const
type Locale = (typeof LOCALES)[number]

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export const alt = "Axda Studio — Alyx Darenne, Frontend Developer."

export function generateImageMetadata({
  params,
}: {
  params: { locale: Locale }
}) {
  const seo =
    SEO_BY_LOCALE[params.locale] ?? SEO_BY_LOCALE[siteConfig.defaultLocale]
  return [{ id: "og", alt: seo.ogAlt, contentType, size }]
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const seo = SEO_BY_LOCALE[locale] ?? SEO_BY_LOCALE[siteConfig.defaultLocale]

  const paper = "#F4F1EA"
  const ink = "#0E0E0C"
  const inkMuted = "#5C5A54"
  const brick = "#A1553A"
  const mark = "#F6F5F1"
  const host = new URL(siteConfig.url).host

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: paper,
        color: ink,
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -120,
          bottom: -220,
          fontSize: 900,
          lineHeight: 1,
          fontStyle: "italic",
          color: brick,
          opacity: 0.08,
          fontFamily: "serif",
        }}
      >
        a
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" fill={ink} />
          <path
            d="M36.9506 34.548C37.333 33.8688 38.3111 33.8688 38.6935 34.548L55.0154 63.5434C55.3906 64.21 54.9089 65.0339 54.144 65.0339H21.5001C20.7351 65.0339 20.2534 64.21 20.6287 63.5434L36.9506 34.548Z"
            fill={mark}
          />
          <path
            d="M53.3052 35.0945C53.3052 34.5274 53.7649 34.0677 54.3319 34.0677H64.517C73.0681 34.0677 80.0001 40.9997 80.0001 49.5508C80.0001 58.1019 73.0681 65.0339 64.517 65.0339H53.8286C53.5395 65.0339 53.3052 64.7995 53.3052 64.5104V35.0945Z"
            fill={mark}
          />
        </svg>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: -0.5,
          }}
        >
          {siteConfig.name}
          <span style={{ fontSize: 18, color: inkMuted }}>®</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "monospace",
            fontSize: 20,
            color: inkMuted,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "flex",
              width: 8,
              height: 8,
              borderRadius: 8,
              background: brick,
            }}
          />
          {siteConfig.author.name}
          <span style={{ color: inkMuted }}>·</span>
          {seo.ogRole} — {seo.ogSkills}
        </div>
        <div
          style={{
            fontSize: 92,
            lineHeight: 1.02,
            letterSpacing: -3,
            fontWeight: 500,
            color: ink,
          }}
        >
          {seo.ogHeadline}
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.35,
            color: inkMuted,
            maxWidth: 820,
          }}
        >
          {seo.description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: 22,
          color: inkMuted,
        }}
      >
        <span>{host}</span>
        <span>{siteConfig.tagline}</span>
      </div>
    </div>,
    { ...size }
  )
}
