<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the axda-studio portfolio. Here's a summary of changes made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the `posthog-js` SDK with EU host, exception capture, reverse proxy, and debug mode in development.
- **`next.config.mjs`** (updated): Added reverse proxy rewrites routing `/ingest/*` to the EU PostHog ingestion endpoint, and `/ingest/static/*` + `/ingest/array/*` to the EU assets CDN. Also set `skipTrailingSlashRedirect: true`.
- **`components/header/nav-link.tsx`** (new): Client component wrapping Next.js `Link` that captures `nav_item_clicked` with a `label` property on click.
- **`components/header/cta-link.tsx`** (new): Client component wrapping the contact CTA button that captures `cta_clicked` with a `label` property on click.
- **`components/header/header.tsx`** (updated): Replaced direct `Link`/`Button` usage for nav items and CTA with the new `NavLink` and `CtaLink` tracked client components.
- **`components/locale-selector/locale-selector.tsx`** (updated): Added `locale_changed` capture with `from` and `to` properties in `handleLocaleClick`.
- **`components/theme-selector/theme-selector.tsx`** (updated): Added `theme_changed` capture with `from` and `to` properties in `handleToggleTheme`.
- **`.env.local`** (new): Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

## Events

| Event              | Description                                             | File                                             |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------ |
| `cta_clicked`      | User clicks the 'Contact' CTA button in the header      | `components/header/cta-link.tsx`                 |
| `nav_item_clicked` | User clicks a navigation item (work, stack, about, faq) | `components/header/nav-link.tsx`                 |
| `locale_changed`   | User switches the site language (en/fr/es)              | `components/locale-selector/locale-selector.tsx` |
| `theme_changed`    | User toggles between light and dark theme               | `components/theme-selector/theme-selector.tsx`   |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/686144)
- [CTA Clicks Over Time](/insights/gynMviFA) — tracks contact CTA clicks, your primary conversion signal
- [Nav Item Clicks by Section](/insights/qXrMTuez) — which sections (work/stack/about/faq) attract the most attention
- [Locale Changes](/insights/36d2bNoG) — language switching behavior by destination locale
- [Theme Changes](/insights/vFLwkAB8) — light/dark theme preference by chosen theme
- [Total Engagement Events](/insights/vRnNqXaI) — all custom events side-by-side as an overall activity trend

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
