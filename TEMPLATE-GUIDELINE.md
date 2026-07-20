# TEMPLATE GUIDELINE — Generic Company Profile Starter (Payload CMS + Next.js)

This document supersedes any previous project-specific guideline. Read this before working on any task in this codebase. It stays valid across sessions.

## 1. What this project is now

This started as a single-purpose company profile site (fiber/connectivity theme). The **layout, structure, and UX have been validated and are good** — they should be preserved. The project is now a **reusable, industry-agnostic starter template**: a base that can be re-used to spin up a company profile site for *any* business (a hospital, a construction firm, a logistics company, etc.) by changing configuration and seed content — not by rewriting code.

**Do not change the visual layout, spacing system, or page structure that already exists** unless a task explicitly asks for a design change. The current task's job is to make the *content and theme* swappable, and the *code* clean and reusable — not to redesign what's already working.

## 2. Tech stack

- Node.js 22+ (v18 deprecated), Next.js 16 (App Router, TypeScript, Turbopack), Payload CMS 3.x (embedded), PostgreSQL, Tailwind CSS v4 (using @tailwindcss/postcss and @theme directives), Lexical rich text, local disk media storage.

## 3. Architecture — route group separation (critical)

```
src/app/(payload)/layout.tsx    ← Payload admin panel. Auto-generated. Do not hand-edit.
src/app/(frontend)/layout.tsx   ← Public site. Tailwind is imported here only.
```
No shared root `src/app/layout.tsx` wrapping both groups. Tailwind must never leak into `(payload)`. The Payload admin panel uses its own original framework CSS via `@payloadcms/next/css` import in the payload layout.

## 4. Content model (collections & globals) — already industry-agnostic

The schema itself was never fiber-specific — `Services`, `Posts` (type: `artikel`/`blog`), `Pages`, `Categories`, `Media`, globals `SiteSettings` and `Landing` are all generic concepts that apply to any business. **The industry-specific part was only ever the seed data and hardcoded copy/colors in components** — that's what needs to become swappable, not the schema.

Do not rename fields or change relationships as part of "genericizing" the project — that's a separate concern from theming/content.

## 5. Theming — config-driven (mandatory)

**No component may hardcode a color, company name, tagline, or industry-specific copy.** All of the following must be sourced from a single config, never hardcoded:
- Primary/accent colors
- Site name, tagline, logo
- Any example copy shown outside of real CMS content

A single source of truth lives at `src/site.config.ts`, reading from environment variables with sensible defaults. The frontend layout injects CSS custom properties into `:root` from siteConfig, and Tailwind's color tokens reference those CSS custom properties. This means a new deployment of this template can restyle itself purely through `.env` — no component code changes required.

## 6. Seed preset system (mandatory)

Seed data is organized into swappable **presets**, one per industry example, under `src/seed/presets/`. Each preset provides a full, realistic set of example content (site settings, landing content, services, pages, categories, posts) for one type of business. At minimum: `generic` (neutral placeholder business), plus one or two illustrative verticals (e.g. `hospital`, `construction`) to prove the template genuinely works across industries. Running the seed script takes a `--preset` argument to choose which one to load: `pnpm seed --preset hospital`.

## 7. Component structure convention

- `src/components/ui/` — small reusable primitives with no business logic: `Button`, `Card`, `Container`, `Section`, `Heading`. These encode the design tokens (spacing, radius, shadow, type scale) in one place.
- `src/components/blocks/` — composed page sections built from `ui/` primitives: `Hero`, `StatsSection`, `ServiceGrid`, `PostGrid`, `CTASection`, `ServiceSidebar`, `RichText`, `EmptyState`, `PageHero`. These are what actual pages assemble.
- Page files under `(frontend)/` should mostly be composition (fetch data, pass to blocks) — not raw markup with inline Tailwind classes duplicated across pages.

## 8. Environment & infra expectations

- PostgreSQL must be runnable locally via a single `docker compose up -d` command — no manual DB install required to try the template.
- There must be a one-command (or single-script) path from "fresh git clone" to "running dev server with example content seeded" — this is the entire point of a template.
- `setup.sh` provides the one-command setup path: installs dependencies, starts PostgreSQL via Docker, runs migrations, seeds data.

## 9. Hard constraints — do not violate

1. Never hardcode industry-specific copy, colors, or example data inside component files — it belongs in `site.config.ts` or a seed preset.
2. Never change collection/global schemas without a task explicitly requesting a data-model change.
3. Never touch Payload's auto-generated admin files by hand.
4. Never let Tailwind CSS reach the `(payload)` route group.
5. Never alter the existing visual design/layout/spacing that's already approved, unless a task explicitly asks for a redesign.
6. Prefer minimal, targeted diffs over broad rewrites in files that already work.
7. Never delete `src/app/layout.tsx` — it must NOT exist. Each route group has its own layout.
8. Lexical rich text content must use `root.type: "root"` (not `"block"`), and heading nodes must have `version` property only once (not duplicated).

## 10. General working rules

- Verify changes actually work by running them, not just by reading the code.
- Report out-of-scope bugs rather than silently fixing them, unless they block the current task.
- When in doubt about whether something counts as "theme-specific" vs. "structural," default to making it configurable — it costs little and pays off across every future use of this template.
- When adding new pages, ensure they follow the established hero pattern and content width constraints.
- When modifying seed presets, ensure all Lexical nodes follow the correct schema (root.type: "root", no duplicate version properties on heading nodes).
- Run `npm run build` (or `pnpm build`) to verify TypeScript and compilation before delivering changes.
