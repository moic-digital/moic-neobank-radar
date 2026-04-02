import type { Locale } from "@/i18n/config"
import { PERKS_PT } from "./perks-pt"
import { PERKS_ES } from "./perks-es"

const PERKS_BY_LOCALE: Partial<Record<Locale, Readonly<Record<string, readonly string[]>>>> = {
  pt: PERKS_PT,
  es: PERKS_ES,
}

export function getCardPerks(
  cardId: string,
  locale: Locale,
  fallbackPerks: readonly string[]
): readonly string[] {
  if (locale === "en") return fallbackPerks

  const localePerks = PERKS_BY_LOCALE[locale]
  if (!localePerks) return fallbackPerks

  const translated = localePerks[cardId]
  if (!translated || translated.length === 0) return fallbackPerks

  return translated
}
