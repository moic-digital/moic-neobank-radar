import { getFaqCategories } from "../faq"

describe("getFaqCategories", () => {
  it("should return English FAQ for locale en", () => {
    const categories = getFaqCategories("en")
    expect(categories.length).toBe(3)
    expect(categories[0].title).toBe("Understanding Neobanks")
  })

  it("should return Portuguese FAQ for locale pt", () => {
    const categories = getFaqCategories("pt")
    expect(categories.length).toBe(3)
    expect(categories[0].title).toBe("Entendendo Neobanks")
  })

  it("should return Spanish FAQ for locale es", () => {
    const categories = getFaqCategories("es")
    expect(categories.length).toBe(3)
    expect(categories[0].title).toBe("Entendiendo los Neobanks")
  })

  it("should have the same number of categories across all locales", () => {
    const en = getFaqCategories("en")
    const pt = getFaqCategories("pt")
    const es = getFaqCategories("es")
    expect(en.length).toBe(pt.length)
    expect(en.length).toBe(es.length)
  })

  it("should have the same number of items per category across locales", () => {
    const en = getFaqCategories("en")
    const pt = getFaqCategories("pt")
    const es = getFaqCategories("es")
    for (let i = 0; i < en.length; i++) {
      expect(en[i].items.length).toBe(pt[i].items.length)
      expect(en[i].items.length).toBe(es[i].items.length)
    }
  })
})
