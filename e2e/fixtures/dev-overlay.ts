import type { Page } from "@playwright/test"

/**
 * Hides the Next.js dev-overlay portal. When the suite reuses a running
 * `next dev` server (playwright.config reuseExistingServer outside CI), that
 * portal sits in a bottom corner and swallows clicks aimed at anything fixed
 * there — the cookie banner and the footer links. It does not exist in the
 * production build CI runs against, so hiding it removes a local-only failure
 * without weakening the assertions.
 */
export async function hideDevOverlay(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const hide = () => {
      const style = document.createElement("style")
      style.textContent = "nextjs-portal { display: none !important }"
      document.head.appendChild(style)
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", hide, { once: true })
    } else {
      hide()
    }
  })
}
