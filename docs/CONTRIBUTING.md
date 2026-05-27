# Contributing

This project follows a **GitHub Flow** workflow with **Conventional Commits** and automated releases via **release-please**.

## TL;DR

```bash
git checkout main && git pull
git checkout -b feat/short-description
# code…
git commit -m "feat(scope): describe the change"
git push -u origin feat/short-description
gh pr create
# wait for CI green → "Squash and merge" in GitHub UI
```

That's the entire workflow.

## Branching

- `main` is the **only long-lived branch**. It is always deployable.
- All work happens on **short-lived branches** (hours to a few days, never weeks).
- Branch naming: `feat/...`, `fix/...`, `chore/...`, `docs/...`, `refactor/...`.
- Risky/incomplete features ship behind a **PostHog feature flag**, not a long branch.

## Commits

We use [Conventional Commits](https://www.conventionalcommits.org/). The format is:

```
<type>(<optional scope>): <subject>
```

### Types

| Type       | When to use                         | Triggers                     |
| ---------- | ----------------------------------- | ---------------------------- |
| `feat`     | A new user-visible feature          | **MINOR** version bump       |
| `fix`      | A bug fix                           | **PATCH** version bump       |
| `perf`     | Performance improvement             | PATCH bump                   |
| `refactor` | Code change with no behavior change | No bump (shown in changelog) |
| `docs`     | Documentation only                  | No bump (shown in changelog) |
| `test`     | Adding/updating tests               | No bump (hidden)             |
| `build`    | Build system or dependencies        | No bump (hidden)             |
| `ci`       | CI configuration                    | No bump (hidden)             |
| `chore`    | Maintenance, tooling                | No bump (hidden)             |
| `style`    | Formatting, whitespace              | No bump (hidden)             |
| `revert`   | Reverts a previous commit           | Shown in changelog           |

### Breaking changes

Append `!` after the type, or add a `BREAKING CHANGE:` footer. This triggers a **MAJOR** version bump.

```
feat(api)!: rename getUser to fetchUser

BREAKING CHANGE: getUser is renamed to fetchUser.
```

### Examples

```
feat(theme): add dark mode toggle
fix(header): correct mobile menu z-index
chore(deps): bump next to 16.2.6
docs(readme): document local dev setup
refactor(lib): extract image helpers into shared module
```

Commit messages are enforced locally by **commitlint** (via the Husky `commit-msg` hook) and PR titles are enforced by a GitHub Action.

## Pull requests

- The **PR title must be a Conventional Commit** — it becomes the squash-merge commit on `main` and feeds into the changelog.
- Keep PRs small and focused. Smaller PRs = faster review = faster merge.
- CI must be green before merge: `lint`, `unit`, `build`, `e2e`, `lighthouse`.
- Use **Squash and merge** (it's the only merge method enabled).

## Releases

Releases are fully automated by [release-please](https://github.com/googleapis/release-please):

1. Every push to `main` triggers the `release-please` workflow.
2. release-please maintains an **open Release PR** titled like `chore(main): release 1.3.0`. It accumulates the version bump (`package.json`), changelog entries (`CHANGELOG.md`), and manifest update (`.release-please-manifest.json`).
3. **To ship a release: merge the Release PR.** release-please then:
   - Tags the commit (`v1.3.0`)
   - Creates a GitHub Release with auto-generated notes

### What you never do manually

- Edit `CHANGELOG.md` by hand
- Bump the version in `package.json`
- Create or push git tags (after the initial bootstrap tag)

### Versioning

We follow [SemVer](https://semver.org/) — `MAJOR.MINOR.PATCH`. Until the project hits `1.0.0`, `feat` commits bump the **minor** segment and breaking changes bump the **minor** segment too (no `0.x → 1.x` jump from a single `!` commit). After `1.0.0`, breaking changes bump the major segment as expected.

## Feature flags

For risky or partial features, use a **PostHog feature flag** instead of keeping the work on a long-lived branch:

```tsx
"use client"
import { useFeatureFlagEnabled } from "posthog-js/react"

export function ThemeToggle() {
  const enabled = useFeatureFlagEnabled("dark-mode")
  if (!enabled) return null
  return <button onClick={toggle}>…</button>
}
```

Roll out: yourself → 5% → 50% → 100% from the PostHog dashboard. Roll back instantly by flipping the flag off — no `git revert` needed.

Once the feature is fully rolled out and stable, remove the flag check from the code in a follow-up `chore:` commit.

## Local setup

```bash
pnpm install        # also installs Husky hooks via "prepare"
pnpm dev            # start dev server
pnpm lint           # eslint
pnpm typecheck      # tsc --noEmit
pnpm test:unit      # vitest
pnpm test:e2e       # playwright (requires `pnpm build` first or use test:e2e:fresh)
```

Pre-commit runs `lint-staged` (eslint + prettier on changed files). Commit messages are validated by commitlint.

## Anti-patterns to avoid

- ❌ Long-lived feature branches (use feature flags instead)
- ❌ A `develop` branch (we use GitHub Flow — main only)
- ❌ Merge commits (squash only)
- ❌ Manual `CHANGELOG.md` edits
- ❌ Manual `git tag` (release-please handles tags)
- ❌ Force-pushing to `main`
