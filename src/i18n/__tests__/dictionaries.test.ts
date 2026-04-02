import en from "../dictionaries/en.json"
import pt from "../dictionaries/pt.json"
import es from "../dictionaries/es.json"

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = []
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      keys.push(...getKeys(value as Record<string, unknown>, fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys.sort()
}

describe("dictionary completeness", () => {
  const enKeys = getKeys(en)
  const ptKeys = getKeys(pt)
  const esKeys = getKeys(es)

  it("should have the same keys in pt as en", () => {
    const missingInPt = enKeys.filter((k) => !ptKeys.includes(k))
    const extraInPt = ptKeys.filter((k) => !enKeys.includes(k))
    expect(missingInPt).toEqual([])
    expect(extraInPt).toEqual([])
  })

  it("should have the same keys in es as en", () => {
    const missingInEs = enKeys.filter((k) => !esKeys.includes(k))
    const extraInEs = esKeys.filter((k) => !enKeys.includes(k))
    expect(missingInEs).toEqual([])
    expect(extraInEs).toEqual([])
  })

  it("should have no empty string values in en", () => {
    const emptyKeys = enKeys.filter((key) => {
      const parts = key.split(".")
      let value: unknown = en
      for (const part of parts) {
        value = (value as Record<string, unknown>)[part]
      }
      return value === ""
    })
    expect(emptyKeys).toEqual([])
  })

  it("should have no empty string values in pt", () => {
    const emptyKeys = ptKeys.filter((key) => {
      const parts = key.split(".")
      let value: unknown = pt
      for (const part of parts) {
        value = (value as Record<string, unknown>)[part]
      }
      return value === ""
    })
    expect(emptyKeys).toEqual([])
  })

  it("should have no empty string values in es", () => {
    const emptyKeys = esKeys.filter((key) => {
      const parts = key.split(".")
      let value: unknown = es
      for (const part of parts) {
        value = (value as Record<string, unknown>)[part]
      }
      return value === ""
    })
    expect(emptyKeys).toEqual([])
  })
})
