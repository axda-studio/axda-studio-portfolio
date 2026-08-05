// Not 3000, and distinct from Playwright's 3100: on 3000 this measured whatever
// already held the port. A `pnpm dev` server there renders in one pass, which
// both flatters the scores and hides production-only streaming faults — the
// blank page that surfaced here as NO_FCP.
const PORT = 3101

module.exports = {
  ci: {
    collect: {
      url: [`http://localhost:${PORT}/`],
      numberOfRuns: 3,
      startServerCommand: `pnpm exec next start --port ${PORT}`,
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 60_000,
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
}
