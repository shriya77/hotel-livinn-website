# LIV·INN — Hotel Liv-Inn, Erode

A luxury, editorial marketing site for **Hotel Liv-Inn** (Exclusive Lodging), Erode.
Warm-charcoal palette, gold accents, Fraunces display serif, and cinematic
scroll-driven motion.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Framer Motion** — scroll reveals, hero parallax, staggered headline, marquee
- Self-hosted Google Fonts (Fraunces + Inter) via `next/font`
- Zero UI dependencies beyond the above; all styling in `app/globals.css`

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm run start    # serve the production build
```

## Structure

```
app/
  layout.tsx      fonts, metadata, grain overlay
  page.tsx        section composition
  globals.css     the entire design system
components/        Nav, Hero, Marquee, Stay, Rooms, Amenities,
                  Gallery, Policies, Booking, Footer, Reveal
lib/data.ts       all content (rooms, tariff, amenities, policies, contact)
```

## Editing content

- **Structure** (images, room prices, phone/email/links) lives in **`lib/data.ts`**.
- **All display text** (English, Tamil, Hindi) lives in **`lib/i18n.ts`**.

## Languages (i18n)

The site ships in **English, Tamil (தமிழ்), and Hindi (हिन्दी)**, switchable via
the toggle in the nav. Choice is saved to `localStorage`.

- Translations: `lib/i18n.ts` — one dictionary per language, same shape (TS
  enforces that all three stay in sync). Poetic lines (hero, etc.) are re-worded
  per language rather than translated literally.
- Provider/hook: `components/LanguageProvider.tsx` → `useLang()` returns
  `{ lang, setLang, t }`.
- Toggle UI: `components/LangToggle.tsx`.
- Fonts swap per script automatically — Fraunces/Inter (en), Noto Serif/Sans
  Tamil (ta), Noto Serif/Sans Devanagari (hi) — driven by `data-lang` on `<html>`
  and the `--serif` / `--sans` CSS variables in `app/globals.css`.

To add a language: add its code to `Lang` + `LANGS` in `lib/i18n.ts`, add a full
dictionary, and (if a new script) load a font in `app/layout.tsx` and map the
CSS vars under `:root[data-lang="…"]`.

## Photography

Real hotel photos live in `lib/photos/` and are wired in `lib/data.ts` via
static imports (Next.js reads their dimensions and generates blur-up
placeholders automatically). To swap an image, replace the file or point the
import at a new one. Current mapping:

- `front.webp` → hero background
- `couch.webp` → "Stay" section
- `room1 / room3 / room4` → the three room cards
- `room2, reception, room5, view, couch2` → gallery

## Placeholder to swap

- **Logo** — currently the `L·I` monogram (text). Drop a real logo into
  `components/Nav.tsx` and `Footer.tsx`.

## Booking form

Front-end only — it validates and shows a confirmation message. To take real
reservations, wire the `onSubmit` in `components/Booking.tsx` to an API route,
email service, or booking provider.

## Deploy

Any static host (Vercel, Netlify, Cloudflare Pages). On Vercel: import the repo,
no config needed.
