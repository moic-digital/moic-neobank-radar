import {
  LOCALES,
  DEFAULT_LOCALE,
  isValidLocale,
  localeFromCountry,
  localeFromAcceptLanguage,
} from "../config"

describe("i18n config", () => {
  describe("LOCALES", () => {
    it("should contain en, pt, es", () => {
      expect(LOCALES).toEqual(["en", "pt", "es"])
    })
  })

  describe("DEFAULT_LOCALE", () => {
    it("should be en", () => {
      expect(DEFAULT_LOCALE).toBe("en")
    })
  })

  describe("isValidLocale", () => {
    it("should return true for valid locales", () => {
      expect(isValidLocale("en")).toBe(true)
      expect(isValidLocale("pt")).toBe(true)
      expect(isValidLocale("es")).toBe(true)
    })

    it("should return false for invalid locales", () => {
      expect(isValidLocale("fr")).toBe(false)
      expect(isValidLocale("")).toBe(false)
      expect(isValidLocale("EN")).toBe(false)
    })
  })

  describe("localeFromCountry", () => {
    it("should return pt for Brazilian country code", () => {
      expect(localeFromCountry("BR")).toBe("pt")
    })

    it("should return es for Spanish-speaking countries", () => {
      expect(localeFromCountry("AR")).toBe("es")
      expect(localeFromCountry("MX")).toBe("es")
      expect(localeFromCountry("CO")).toBe("es")
      expect(localeFromCountry("ES")).toBe("es")
    })

    it("should return null for unmapped countries", () => {
      expect(localeFromCountry("US")).toBeNull()
      expect(localeFromCountry("GB")).toBeNull()
      expect(localeFromCountry("DE")).toBeNull()
    })

    it("should be case-insensitive", () => {
      expect(localeFromCountry("br")).toBe("pt")
      expect(localeFromCountry("ar")).toBe("es")
    })
  })

  describe("localeFromAcceptLanguage", () => {
    it("should return the highest priority matching locale", () => {
      expect(localeFromAcceptLanguage("pt-BR,pt;q=0.9,en;q=0.8")).toBe("pt")
      expect(localeFromAcceptLanguage("es-AR,es;q=0.9,en;q=0.8")).toBe("es")
      expect(localeFromAcceptLanguage("en-US,en;q=0.9")).toBe("en")
    })

    it("should fall back to lower priority when first is not supported", () => {
      expect(localeFromAcceptLanguage("fr;q=1,pt;q=0.9,en;q=0.8")).toBe("pt")
    })

    it("should return null when no locale matches", () => {
      expect(localeFromAcceptLanguage("fr,de,ja")).toBeNull()
    })

    it("should handle simple language codes", () => {
      expect(localeFromAcceptLanguage("pt")).toBe("pt")
      expect(localeFromAcceptLanguage("es")).toBe("es")
    })
  })
})
