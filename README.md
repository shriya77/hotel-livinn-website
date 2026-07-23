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

Validates the fields, then opens **WhatsApp** to the front desk
(`contact.whatsapp` in `lib/data.ts`) with the name, dates, room, and guest
count pre-filled — the guest just taps send. No backend, no payment online.
Logic lives in `onSubmit` in `components/Booking.tsx`.

## Virtual Concierge (chatbot)

A Gemini-powered concierge (floating button, bottom-right) that answers guest
questions in English, Tamil, or Tanglish. Modular and secure:

- `lib/chatbot/knowledge.ts` — the hotel knowledge base (single source of truth;
  reuses tariff/contact from `lib/data.ts` so nothing drifts). Edit `facts` here
  to update hotel info; anything marked `UNVERIFIED` is never stated as fact.
- `lib/chatbot/config.ts` — model + limits (swap the model/provider in one place).
- `lib/chatbot/prompt.ts` — the system instructions (personality, accuracy rules,
  language, security). Server-side only.
- `app/api/chat/route.ts` — secure proxy to Gemini. The **API key never reaches
  the browser**. Includes per-IP rate limiting, input validation, and safe errors.
- `components/chatbot/` — `Chatbot.tsx` (UI) + `useChat.ts` (state/transport).
- Chat UI strings live in the `chat` section of `lib/i18n.ts` (all three languages).

**Setup:** copy `.env.example` to `.env.local` and add a free Gemini key from
https://aistudio.google.com/apikey. Without a key the concierge shows a friendly
"contact reception" message instead of crashing. Never commit `.env.local`.

Model note: the code uses `gemini-flash-latest` (Google's current stable Flash).
The pinned `gemini-2.5-flash` returns 404 for newly-created keys; change the
model in `lib/chatbot/config.ts` if you later pin a specific version.

## Deploy

Any static host (Vercel, Netlify, Cloudflare Pages). On Vercel: import the repo,
no config needed.
