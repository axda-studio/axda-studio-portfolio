import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import { LOCALES } from "@/locales/constants"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProviderClient } from "@/locales/client"
import { cn } from "@/lib/utils"

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

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export const metadata = {
  title: "Axda Studio",
  description: "Frontend engineering with a designer's eye.",
}

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>
  children: React.ReactNode
}>) {
  const { locale } = await params
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        geist.variable,
        "font-sans",
        instrumentSerif.variable,
        jetBrainsMono.variable,
        "selection:bg-primary selection:text-white"
      )}
    >
      <body>
        <ThemeProvider>
          <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
        </ThemeProvider>
      </body>
    </html>
  )
}
