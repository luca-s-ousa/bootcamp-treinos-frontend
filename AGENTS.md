# Repository Guidelines

## Project Structure & Module Organization
This is a single-app Next.js 16 project using the App Router. Routes live in `app/`, shared UI in `components/`, reusable utilities in `lib/`, and static assets in `public/`. Authentication helpers are colocated in `app/_lib/`. Follow the existing split between feature components such as `components/home/` and base shadcn/ui primitives in `components/ui/`.

Repository rules are mandatory. Read `rules/api.md`, `rules/react.md`, `rules/typescript.md`, and `rules/general.md` before changing code.

## Build, Test, and Development Commands
Use `pnpm` for all package management.

- `pnpm dev` starts the local Next.js app.
- `pnpm build` creates the production build and catches integration errors.
- `pnpm start` serves the production build locally.
- `pnpm lint` runs ESLint with the Next.js core-web-vitals and TypeScript presets.

There is no dedicated test script yet, so contributors should at minimum run `pnpm lint` and `pnpm build` before opening a PR.

## Coding Style & Naming Conventions
Write all code in TypeScript. Keep files and folders in `kebab-case`, components in `PascalCase`, and variables/functions in clear `camelCase`. Match the current style: semicolons enabled, double quotes, and simple functional components.

Prefer Server Components and only add `"use client"` when needed. Reuse shadcn/ui primitives before creating new UI. Use theme tokens from `app/globals.css`; do not hard-code Tailwind colors. Do not place multiple components in one file.

## Testing Guidelines
Automated test tooling is not configured yet in `package.json`. When adding tests later, place them next to the feature or in a nearby `__tests__/` folder and use descriptive names such as `login-screen.test.tsx`. Until then, validate changes with linting, production builds, and focused manual checks for auth and routing flows.

## Commit & Pull Request Guidelines
Recent history uses concise Conventional Commit prefixes, for example `feat: scaffold base project structure...`. Continue with `feat:`, `fix:`, `refactor:`, or `docs:` followed by a short imperative summary.

PRs should include a clear description, linked issue or task when applicable, screenshots for UI updates, and the exact validation performed (`pnpm lint`, `pnpm build`). Keep scope narrow and call out any rule-driven decisions.

## Agent-Specific Notes
Use Context7 to confirm current Next.js, React, shadcn/ui, and other stack APIs before implementing changes. For client-side data fetching, forms, auth, and theming, follow the repository rules exactly rather than generic framework defaults.
