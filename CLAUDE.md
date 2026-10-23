# MME Group — Marketing Site

## Project
- **Stack:** Next.js 16 + React 19 + TypeScript, Tailwind CSS v4, next-intl (EN/ES)
- Single-page static marketing site. No backend, no admin portal.
- Mirrors the conventions of the MGM A/C site (`../construction-crm/apps/web`).

## Conventions
- All user-visible strings go through `t()`. No hardcoded copy in components.
- `en.json` and `es.json` must have identical keys (enforced by `tests/messages.test.ts`).
- Non-translatable data (ids, icons, photos, contact info, cities) lives in `lib/site.ts`; copy is keyed by those ids.
- Server Components by default; `'use client'` only for interactivity (Navbar, HeroScroll, BeforeAfterSlider, ContactForm, Reveal).
- Tailwind v4: tokens via `@theme inline {}` in `app/globals.css`, no `tailwind.config.ts`.
- `<html lang>` is rendered in `app/[locale]/layout.tsx` (the root layout can't see the locale).
- `params` are **Promises** — always `await` them.
- Update `README.md` when stack, structure, scripts, or env vars change.

## Design Rules
- Palette tokens: `ink`, `ink-2`, `ink-3`, `surface`, `surface-2`, `brand`, `brand-deep`, `glow`, `glow-soft`, `silver`, `steel`, `line`, `hair`.
- Headings use `var(--font-outfit)`, body uses `var(--font-inter)`.
- Sections use the dark theme (navy surfaces, white text, `white/60` secondary text).
- Breakpoints from the design: 980px (nav links / two-column grids), 760px (nav CTA, footer), 520px (footer).
