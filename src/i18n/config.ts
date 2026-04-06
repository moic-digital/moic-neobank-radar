export const LOCALES = ["en", "pt", "es"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "en"

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  pt: "Portugues",
  es: "Espanol",
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "\u{1F1FA}\u{1F1F8}",
  pt: "\u{1F1E7}\u{1F1F7}",
  es: "\u{1F1EA}\u{1F1F8}",
}

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  BR: "pt",
  PT: "pt",
  AO: "pt",
  MZ: "pt",
  CV: "pt",
  GW: "pt",
  ST: "pt",
  TL: "pt",
  AR: "es",
  MX: "es",
  CO: "es",
  ES: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  BO: "es",
  DO: "es",
  HN: "es",
  PY: "es",
  SV: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  UY: "es",
}

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale)
}

export function localeFromCountry(countryCode: string): Locale | null {
  return COUNTRY_TO_LOCALE[countryCode.toUpperCase()] ?? null
}

export function localeFromAcceptLanguage(header: string): Locale | null {
  const languages = header
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=")
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { lang } of languages) {
    const prefix = lang.split("-")[0]
    if (isValidLocale(prefix)) return prefix
  }

  return null
}
