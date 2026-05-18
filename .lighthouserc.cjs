module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      numberOfRuns: 3,
      startServerCommand: "pnpm start",
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
