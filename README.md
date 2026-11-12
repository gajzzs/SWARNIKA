# Swarnika — demonstration jewellery maison site

A Next.js (App Router) storefront for an Indian fine-jewellery house: collections with filters, product pages with a live gold/stones/making/GST price breakup, trousseau wishlist shared over WhatsApp, appointment & video-consultation booking, atelier story, and BIS/HUID trust seals.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start   # production (Node)
STATIC_EXPORT=1 npx next build   # plain static site in out/, host anywhere
```

## Before launching for a real business

- **All imagery is AI-generated**: photographs by Google Gemini 3.1 Flash Image, the two looping films (`public/videos/`) by Gemini Omni 1.2 Flash, and the gold line ornaments (`public/vectors/`) by Recraft v4.1 Vector, all via OpenRouter. Each image carries its prompt in its metadata, each film has a `.mp4.json` sidecar and each SVG a `<desc>`. The people shown are not real. Replace with photographs of real, hallmarked inventory and real clients (with consent) before launch.
- **All business facts are samples**: shop name, address, phone/WhatsApp number, email, gold rates (`lib/data.ts` → `GOLD_RATES`, `RATE_DATE`), products, weights, prices, HUIDs and karigar names. Edit `lib/data.ts`.
- The appointment form is a client-side demo (`components/AppointmentForm.tsx`); wire its submit to an API route or CRM, and connect a live gold-rate feed.

## Where things live

- `lib/data.ts` — products, collections, rates, shop details (the one file to edit for content)
- `lib/price.ts` — price-breakup math (gold × rate + stones + making % + 3% GST)
- `components/` — PriceTicket (breakup with karat switch), Seals (BIS/HUID/IGI/buyback), Trousseau (wishlist drawer), Catalogue (filters), AppointmentForm
- `app/globals.css` — the entire design system (tokens at the top)
