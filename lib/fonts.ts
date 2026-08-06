import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google"

/**
 * Shared so `[locale]/layout.tsx` and `app/not-found.tsx` cannot drift. The
 * 404 is served from Next's own `/_not-found` route, which sits outside the
 * locale layout and therefore has to build its own <html> — including these
 * variables, since the Tailwind theme reads `--font-sans` and friends.
 */

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500"],
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: "400",
  style: "italic",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: "400",
})

export const fontClassNames = [
  "antialiased",
  geist.variable,
  "font-sans",
  instrumentSerif.variable,
  jetBrainsMono.variable,
] as const
