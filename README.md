# MME Group — Marketing Site

Single-page bilingual (EN/ES) marketing site for MME Group, exterior renovation across Miami-Dade & Broward.
Ported from the Claude Design export (`MME Group Offline.html`) onto the same stack as the MGM A/C site.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — tokens in `@theme inline {}` in `app/globals.css` (no `tailwind.config`)
- **next-intl** — `/en` and `/es` routes, copy in `messages/{en,es}.json`
- **next/font** — Outfit (headings) + Inter (body)
- **Vitest** + Testing Library

No backend. The quote form is a demo: it shows a thank-you state and sends nothing.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
```

| Script            | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Dev server                           |
| `npm run build`   | Production build (`output: standalone`) |
| `npm start`       | Serve the production build           |
| `npm run lint`    | ESLint (next core-web-vitals + TS)   |
| `npm test`        | Vitest                               |

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) in production so canonical URLs, Open Graph, and JSON-LD use the real domain.

## Deployment

**GitHub Pages (preview link):** every push to `main` runs `.github/workflows/pages.yml`, which tests the app, builds a static export, and publishes it to **https://idiel99.github.io/mme-site/**.

The static export is a second build mode, switched on by environment variables:

| Variable               | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `STATIC_EXPORT=true`   | `output: "export"` into `out/`, unoptimized images         |
| `BASE_PATH`            | Subpath the site is served from (e.g. `/mme-site`)         |
| `NEXT_PUBLIC_SITE_URL` | Full public URL, used for canonical / Open Graph / JSON-LD |

The workflow sets all three from the Pages settings. In this mode `proxy.ts` doesn't run (static hosts have no server), so `app/page.tsx` redirects `/` with a meta refresh and the host's `404.html` handles unknown paths.

**Own server:** `npm run build && npm start` uses `output: "standalone"` with the locale proxy and image optimization.

## Structure

```
app/
  layout.tsx                 — passthrough; imports globals.css
  page.tsx                   — "/" → redirect to default locale
  not-found.tsx              — fallback 404 outside a locale
  globals.css                — Tailwind import, MME color tokens, buttons, reveal animation
  [locale]/layout.tsx        — <html lang>, fonts, metadata, NextIntlClientProvider
  [locale]/page.tsx          — the single page: composes all sections + JSON-LD
  [locale]/not-found.tsx     — localized 404
  [locale]/[...rest]/page.tsx — routes unknown paths to the localized 404
components/
  Navbar.tsx                 — fixed nav, EN/ES toggle, mobile menu        (client)
  HeroScroll.tsx             — scroll-driven before→after hero              (client)
  BeforeAfterSlider.tsx      — draggable / keyboard comparison slider      (client)
  ContactForm.tsx            — demo quote form                             (client)
  Reveal.tsx                 — fade-up on scroll (IntersectionObserver)     (client)
  Services, WhyUs, Work, Process, Testimonials, Areas, Contact, Footer — server components
lib/
  site.ts                    — non-translatable data: contact info, photos, ids for every list
  icons.tsx                  — line-icon set + <Icon />
  fonts.ts                   — next/font setup
messages/{en,es}.json        — all user-visible copy
proxy.ts                     — next-intl locale routing (Next 16 "proxy", formerly middleware)
public/images/               — project photos extracted from the design export
tests/                       — message parity + slider behaviour
```

## Editing content

- **Copy** → `messages/en.json` and `messages/es.json`. Keep the keys identical; `npm test` fails if they drift.
- **Lists** (services, testimonials, cities, …) → the ids live in `lib/site.ts`; each id needs matching copy in both message files (also checked by tests).
- **Contact details** → `CONTACT` in `lib/site.ts`.

## Before launch

- Replace the placeholders in `lib/site.ts`: `[PHONE]`, `[EMAIL]`, `[LICENSE]`.
  (Placeholder phone/email are left out of the JSON-LD automatically.)
- Swap the stock photos in `public/images/` for real MME project photos.
- Replace the placeholder reviews in `messages/*.json` → `testimonials.items`, and remove the `testimonials.note` / `work.sub` placeholder hints.
- Hook the quote form up to a real destination (email service, CRM, or an API route) and remove `contact.disclaimer`.
