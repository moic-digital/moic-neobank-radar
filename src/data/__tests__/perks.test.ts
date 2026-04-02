import { getCardPerks } from "../perks"
import { PERKS_PT } from "../perks-pt"
import { PERKS_ES } from "../perks-es"

const FALLBACK = ["perk1 in english", "perk2 in english"]

describe("getCardPerks", () => {
  it("should return fallback perks for locale en", () => {
    const result = getCardPerks("nexo-card", "en", FALLBACK)
    expect(result).toBe(FALLBACK)
  })

  it("should return Portuguese perks for locale pt", () => {
    const result = getCardPerks("nexo-card", "pt", FALLBACK)
    expect(result).toBe(PERKS_PT["nexo-card"])
    expect(result[0]).toContain("cashback em crypto")
  })

  it("should return Spanish perks for locale es", () => {
    const result = getCardPerks("nexo-card", "es", FALLBACK)
    expect(result).toBe(PERKS_ES["nexo-card"])
    expect(result[0]).toContain("cashback en crypto")
  })

  it("should fall back to English when card has no translated perks", () => {
    const result = getCardPerks("unknown-card", "pt", FALLBACK)
    expect(result).toBe(FALLBACK)
  })

  it("should fall back to English when translated perks array is empty", () => {
    const result = getCardPerks("bitpay-card", "pt", FALLBACK)
    expect(result).toBe(FALLBACK)
  })
})

describe("perks completeness", () => {
  const ptKeys = Object.keys(PERKS_PT).filter((k) => PERKS_PT[k].length > 0)
  const esKeys = Object.keys(PERKS_ES).filter((k) => PERKS_ES[k].length > 0)

  it("should have the same non-empty card IDs in PT and ES", () => {
    expect(ptKeys.sort()).toEqual(esKeys.sort())
  })

  it("should have matching perk count per card between PT and ES", () => {
    for (const cardId of ptKeys) {
      expect(PERKS_PT[cardId].length).toBe(PERKS_ES[cardId].length)
    }
  })
})
