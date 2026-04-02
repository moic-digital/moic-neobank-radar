---
name: add-card
description: Add a new crypto card to Neobank Radar with all required data, logo mapping, perks translations, and verification
---

# Add Card to Neobank Radar

Use this skill when the user wants to add a new crypto card/neobank to the platform.

## Prerequisites

Before starting, gather from the user:
- Card/neobank name and issuer
- Official website URL
- Card type, network, fees, cashback, etc.
- Logo image file (or URL to download)
- Perks/benefits list

## Step-by-step process

### 1. Add logo file

Place the logo image in `public/logos/` with a clear filename (e.g., `CardName.png`).

### 2. Add logo mapping

In `src/data/logos.ts`, add an entry to the `cardLogos` object:

```typescript
"card-id": "/logos/CardName.png",
```

The card ID convention is: lowercase name + `-card` suffix (e.g., `"nexo-card"`, `"binance-card"`).

### 3. Add card data

In `src/data/cards.ts`, add a new entry to the `cards` array. ALL fields below are required:

```typescript
{
  id: "card-id",                    // string — unique slug, matches logos.ts key
  name: "Card Name",                // string — display name
  issuer: "Issuer Name",            // string — company/institution
  logo: getCardLogo("card-id"),     // use the helper function
  type: "Debit",                    // "Credit" | "Debit" | "Prepaid" | "Virtual Account"
  network: "Visa",                  // "Visa" | "Mastercard" | "Visa/Mastercard" | "Local Rails"
  cashbackMax: 3,                   // number — max cashback % (0 if none)
  cashbackMin: 1,                   // number — min cashback % (0 if none)
  annualFee: "Free",                // string — "Free", "$99/yr", "Staking", etc.
  fxFee: "1.5%",                    // string — "0%", "1.5%", "Not specified"
  perks: [                          // readonly string[] — card benefits in ENGLISH
    "Up to 3% crypto cashback",
    "No monthly fees",
  ],
  signupBonus: "None",              // string — "None", "$25 BTC", "20 USDT"
  custody: "Custodial",             // "Custodial" | "Self-Custody" | "Non-Custodial" | "Hybrid"
  regions: "Global",                // string — "Global", "Europe", "United States, LATAM"
  officialLink: "https://...",      // string — official product page URL
  cardGradient: "from-blue-600 to-blue-800",  // string — Tailwind gradient classes
  tierColor: "text-blue-400",       // string — Tailwind text color class
  metal: false,                     // boolean — metal/premium card?
  supportedAssets: "BTC, ETH, USDT",  // string — supported crypto assets
  kyc: "Required",                  // "Required" | "Light" | "None"
  supportedCurrencies: ["USD", "EUR"],  // readonly string[] — fiat currencies
  age: "2023",                      // string — year founded/launched
  airdropFarming: "False",          // string — "True" or "False"
  // Optional fields:
  recommended: false,               // boolean — show as "Our Picks" highlight
  addedDate: "2026-04-02",          // string — ISO date, shows "Recentes" badge for 7 days
}
```

### 4. Translate perks

Perks must be translated into Portuguese and Spanish. Add entries to both files using the card ID as key.

**Portuguese** — `src/data/perks-pt.ts`:

```typescript
// Add inside the PERKS_PT object:
"card-id": [
  "Até 3% de cashback em crypto",
  "Sem taxas mensais",
],
```

**Spanish** — `src/data/perks-es.ts`:

```typescript
// Add inside the PERKS_ES object:
"card-id": [
  "Hasta 3% de cashback en crypto",
  "Sin tarifas mensuales",
],
```

Rules:
- The number of perks MUST match between EN, PT, and ES (same count per card)
- If the card has no perks (empty array `[]`), add an empty array in both files
- Keep proper accents: PT uses ã, ç, é, ê, í, ó, ú, etc. ES uses á, é, í, ó, ú, ñ, ¿, ¡
- Technical terms (APY, APR, BTC, ETH, USDC, DeFi, etc.) stay in English
- The loader at `src/data/perks.ts` (`getCardPerks`) falls back to English automatically if translations are missing

### 5. Verify

After adding the card, run:

```bash
npx tsc --noEmit      # TypeScript check
npm test              # All tests pass (perks completeness test validates PT/ES match)
npm run build         # Production build succeeds
```

Also verify visually with `npm run dev`:
- Card appears in the home grid
- Card detail page works at `/en/cards/{card-id}`
- Perks display correctly at `/pt/cards/{card-id}` and `/es/cards/{card-id}`
- Filters work (region, KYC, custody, etc.)
- Compare mode includes the new card

## Important notes

- **Card data field values are NOT translated** — values like "Free", "Required", "Custodial" are kept in English as they are product-specific labels displayed in the UI
- **Perks ARE translated** — they appear in the "Highlights" section of the card detail page
- The `cardGradient` should visually match the card's brand colors. Use Tailwind gradient classes or arbitrary values like `from-[#1E2329] to-[#000000]`
- The `id` must be unique across all cards and match the key in `logos.ts`
- The `logo` field MUST use `getCardLogo("card-id")` — never hardcode the path
- All arrays (`perks`, `supportedCurrencies`) must be `readonly` compatible — use literal arrays
- If the card is new and you want the "Recentes"/"Recently Added" badge, set `addedDate` to today's ISO date
