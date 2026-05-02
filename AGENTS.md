# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js App Router application. Route entrypoints live in `app/`, including `app/layout.tsx`, `app/page.tsx`, and `app/auth/page.tsx`. Shared UI primitives live in `components/ui/`, feature-specific screens in `components/auth/`, reusable helpers in `lib/`, and API/auth utilities in `app/_lib/`. Static assets belong in `public/`, and task briefs live in `tasks/`.

Implementation rules are mandatory: review `rules/general.md`, `rules/react.md`, `rules/typescript.md`, and `rules/api.md` before changing code.

## Build, Test, and Development Commands
Use `pnpm` for all local workflows:

- `pnpm dev`: start the Next.js dev server.
- `pnpm build`: create a production build and catch type/integration issues.
- `pnpm start`: run the production build locally.
- `pnpm lint`: run ESLint with the Next.js and TypeScript presets.

There is no `test` script yet, so contributors should at minimum run `pnpm lint` and `pnpm build` before submitting changes.

## Coding Style & Naming Conventions
Write all code in TypeScript. Use `kebab-case` for files and folders, `PascalCase` for React components, and descriptive `camelCase` for variables and functions. Follow the existing style in the repo: semicolons, double quotes, and small functional components.

Prefer Server Components by default and add `"use client"` only when necessary. Reuse shadcn/ui components before creating new UI, and use theme tokens from `app/globals.css` instead of hard-coded Tailwind colors. Keep one component per file.

## Testing Guidelines
Automated tests are not configured in `package.json` yet. If you add tests, place them near the feature or in a local `__tests__/` directory, using names like `login-screen.test.tsx`. For now, validate auth, routing, and UI changes through `pnpm lint`, `pnpm build`, and targeted manual checks.

## Commit & Pull Request Guidelines
Recent commits follow Conventional Commit prefixes such as `feat:` (`feat: integrate Orval for API client generation...`). Continue using `feat:`, `fix:`, `refactor:`, or `docs:` with a short imperative summary.

PRs should include a concise description, linked task or issue when available, screenshots for UI changes, and the verification steps performed.

## Agent-Specific Notes
Use Context7 to confirm current APIs and patterns for Next.js, React, BetterAuth, Orval, and shadcn/ui before implementing non-trivial changes.
