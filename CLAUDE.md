# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Neobanks Radar is a crypto debit/credit card comparison platform built with **Next.js 15 (App Router)** and **React 19**. It displays 42+ crypto cards with filtering, sorting, and detail pages. Data is fetched from a Google Sheets CSV at build/request time, with fallback to hardcoded data in `src/data/cards.ts`.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npm test         # Jest tests (49 tests across 7 suites)
```

## Architecture

### Data Flow

1. **Google Sheets CSV** → `src/lib/sheets.ts` (`fetchCards()`) parses CSV, maps rows to `CardData` using style/logo lookups
2. **Fallback** → If Sheets fetch fails (e.g., 401), imports hardcoded `src/data/cards.ts`
3. **Server page** → `src/app/[locale]/page.tsx` calls `fetchCards()` and passes cards to `HomePage`
4. **Client filtering** → `src/components/HomePage.tsx` manages filter/sort state with `useMemo`

### Key Data Files

- `src/data/cards.ts` — Hardcoded fallback card data (42 cards, ~1400 lines)
- `src/data/logos.ts` — Card ID → `/logos/{filename}` mapping
- `src/types/card.ts` — `CardData`, `Filters`, `SortOption` type definitions

### i18n (Internationalization)

The site supports **3 languages**: English (en), Portuguese (pt), Spanish (es). Default is English.

- `src/i18n/config.ts` — Locale definitions, country-to-locale mapping, `Accept-Language` parser
- `src/i18n/types.ts` — Typed `Dictionary` interface
- `src/i18n/dictionaries/{en,pt,es}.json` — Translation dictionaries
- `src/i18n/DictionaryProvider.tsx` + `use-dictionary.ts` — React context + hook for client components
- `src/i18n/get-dictionary.ts` — Server-side dictionary loader (dynamic imports)
- `src/i18n/interpolate.ts` — Template string interpolation (`{count}` → value)
- `src/middleware.ts` — Locale detection: Cookie → `CF-IPCountry` (Cloudflare) → `Accept-Language` → default "en"
- `src/data/faq.ts` / `faq-pt.ts` / `faq-es.ts` — FAQ content per locale, loaded via `getFaqCategories(locale)`

### Routes

- `/[locale]` — Home page with card grid, filters, hero section
- `/[locale]/cards/[id]` — Card detail page (statically generated via `generateStaticParams`)
- `/[locale]/neobank-faq` — FAQ page

Middleware redirects bare URLs (`/`, `/cards/x`) to locale-prefixed versions (`/en/`, `/en/cards/x`).

### Component Roles

- `HomePage.tsx` — Client component managing all filter/sort state, renders card grid
- `FilterBar.tsx` — Search, tri-state toggles (KYC, Self-Custody), dropdowns (Region, Currency, Sort)
- `CryptoCard.tsx` — Individual card display in grid
- `HeroSection.tsx` / `LogoColumn.tsx` — Animated hero with scrolling logo panels
- `LanguageSwitcher.tsx` — Language dropdown (EN/PT/ES) in hero section

### Styling

- **Tailwind CSS 4** with `@theme` block in `globals.css` for custom colors (`moic-navy`, `moic-surface`, `moic-blue`, `moic-green`) and animations
- **Fonts**: Clash Grotesk (display) + Sora (body) via Google Fonts
- Mobile-first responsive design

### SEO

- `src/lib/seo.ts` — JSON-LD builders (Organization, WebSite, ItemList, FinancialProduct, FAQ, BreadcrumbList)
- Dynamic metadata per card detail page
- `robots.ts` and `sitemap.ts` with hreflang alternates for all locales

## Conventions

- All data types use `readonly` fields and arrays — never mutate card data or filter state
- Filter updates always create new objects: `{ ...filters, field: value }`
- Path alias: `@/*` maps to `src/*`
- TypeScript strict mode enabled
- Region matching uses alias-based fuzzy logic in `src/utils/regions.ts`
- Card revalidation: Google Sheets data cached for 1 hour (`revalidate: 3600`)
- All UI strings come from i18n dictionaries — never hardcode user-facing text in components
- Card data values (fees, regions, asset names) are kept in English as they are product-specific

## Skills

### `/add-card` — Add a new crypto card

Use the skill at `.claude/skills/add-card.md` when adding a new card to the platform. It covers:
1. Adding the logo file to `public/logos/`
2. Adding the logo mapping in `src/data/logos.ts`
3. Adding the full card entry in `src/data/cards.ts` with all required fields
4. Verification steps (TypeScript, tests, build)

Invoke with: `/add-card`
