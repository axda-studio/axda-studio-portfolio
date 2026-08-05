import { expect, type Locator, type Page } from "@playwright/test"

/**
 * Clicks a `next/link` and waits for the client-side navigation to land.
 *
 * Why this is not just `click()` + `toHaveURL()`: a click that arrives while
 * React is still hydrating gets its default prevented by the root listener and
 * queued for replay, and the replay can be dropped — so the router never sees
 * it. The symptom is the giveaway: no click error, and the URL never changes at
 * all (if the router had taken it, it would have pushed immediately). Waiting
 * longer cannot help, because no navigation was ever started.
 *
 * It is a test-environment race, not a product defect — a real visitor clicking
 * a fraction of a second later navigates fine, and every other link click in
 * this suite passes. It surfaced only on CI's Linux Firefox, on roughly half of
 * runs, on whichever of the two links happened to be clicked inside the window.
 *
 * So: settle the page first to shrink the window, then re-issue the click if
 * nothing happened. The URL check comes first, so an already-successful
 * navigation is never clicked a second time.
 */
export async function clickAndExpectUrl(
  page: Page,
  link: Locator,
  pattern: RegExp
): Promise<void> {
  await page.waitForLoadState("networkidle")
  await expect(link).toBeVisible()

  await expect(async () => {
    if (!pattern.test(page.url())) await link.click()
    await expect(page).toHaveURL(pattern, { timeout: 3_000 })
  }).toPass({ timeout: 20_000 })
}
