import { siteConfig } from "@/lib/site-config"

/**
 * Where *this deployment* lives — as opposed to `siteConfig.url`, which is who
 * the site *is*. The two only diverge outside production:
 *
 *   - production       → the custom domain, the one canonical answer;
 *   - preview          → the deployment's own host, so a shared preview link
 *                        resolves its own OG images and sitemap instead of
 *                        quietly pointing at the live site;
 *   - local / CI build → localhost, which is what Playwright serves.
 *
 * Use this for anything describing this deployment: `metadataBase`, robots,
 * sitemap. Keep `siteConfig.url` for anything identifying the site itself —
 * the JSON-LD `@id`s in particular, which have to stay stable across
 * environments or they stop referring to the same entity.
 */
export function getBaseUrl(): string {
  // Vercel sets VERCEL_ENV at build time and at runtime; it is absent locally
  // and in CI, where the localhost branch below is the right answer anyway.
  if (isProductionDeployment()) return siteConfig.url

  // VERCEL_BRANCH_URL is stable for the life of a branch. VERCEL_URL changes
  // on every single deployment, which would churn the sitemap for no reason.
  const host = process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL
  if (host) return `https://${host}`

  return `http://localhost:${process.env.PORT ?? 3000}`
}

/**
 * True only on the live site. Previews and local builds serve the same pages
 * under a different host, so they must not be indexable.
 */
export function isProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === "production"
}
