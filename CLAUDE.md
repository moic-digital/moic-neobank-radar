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
```

No test runner is configured yet.

## Architecture

### Data Flow

1. **Google Sheets CSV** → `src/lib/sheets.ts` (`fetchCards()`) parses CSV, maps rows to `CardData` using style/logo lookups
2. **Fallback** → If Sheets fetch fails (e.g., 401), imports hardcoded `src/data/cards.ts`
3. **Server page** → `src/app/page.tsx` calls `fetchCards()` and passes cards to `HomePage`
4. **Client filtering** → `src/components/HomePage.tsx` manages filter/sort state with `useMemo`

### Key Data Files

- `src/data/cards.ts` — Hardcoded fallback card data (42 cards, ~1400 lines)
- `src/data/gradients.ts` — Card ID → gradient/tierColor mapping (not in spreadsheet)
- `src/data/logos.ts` — Card ID → `/logos/{filename}` mapping
- `src/types/card.ts` — `CardData`, `Filters`, `SortOption` type definitions

### Routes

- `/` — Home page with card grid, filters, hero section
- `/cards/[id]` — Card detail page (statically generated via `generateStaticParams`)

### Component Roles

- `HomePage.tsx` — Client component managing all filter/sort state, renders card grid
- `FilterBar.tsx` — Search, tri-state toggles (KYC, Self-Custody), dropdowns (Region, Currency, Sort)
- `CryptoCard.tsx` — Individual card display in grid
- `HeroSection.tsx` / `LogoColumn.tsx` — Animated hero with scrolling logo panels

### Styling

- **Tailwind CSS 4** with `@theme` block in `globals.css` for custom colors (`moic-navy`, `moic-surface`, `moic-blue`, `moic-green`) and animations
- **Fonts**: Clash Grotesk (display) + Sora (body) via Google Fonts
- Mobile-first responsive design

### SEO

- `src/lib/seo.ts` — JSON-LD builders (Organization, WebSite, ItemList, FinancialProduct, FAQ, BreadcrumbList)
- Dynamic metadata per card detail page
- `robots.ts` and `sitemap.ts` for crawlers

## Conventions

- All data types use `readonly` fields and arrays — never mutate card data or filter state
- Filter updates always create new objects: `{ ...filters, field: value }`
- Path alias: `@/*` maps to `src/*`
- TypeScript strict mode enabled
- Region matching uses alias-based fuzzy logic in `src/utils/regions.ts`
- Card revalidation: Google Sheets data cached for 1 hour (`revalidate: 3600`)
