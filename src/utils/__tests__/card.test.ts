import { matchesCurrencyFilter } from "../card"

describe("matchesCurrencyFilter", () => {
  it("matches everything when filter is empty", () => {
    expect(matchesCurrencyFilter(["USD"], "")).toBe(true)
    expect(matchesCurrencyFilter([], "")).toBe(true)
  })

  it("matches when filter is in the supported list", () => {
    expect(matchesCurrencyFilter(["USD", "EUR"], "USD")).toBe(true)
    expect(matchesCurrencyFilter(["EUR"], "EUR")).toBe(true)
  })

  it("does not match when filter is missing", () => {
    expect(matchesCurrencyFilter(["USD"], "EUR")).toBe(false)
    expect(matchesCurrencyFilter([], "USD")).toBe(false)
  })

  it("treats 'Global' as a wildcard sentinel", () => {
    expect(matchesCurrencyFilter(["USD", "Global"], "JPY")).toBe(true)
    expect(matchesCurrencyFilter(["Global"], "BRL")).toBe(true)
  })

  it("treats 'X+ currencies' patterns as wildcard sentinels", () => {
    expect(matchesCurrencyFilter(["18+ currencies"], "USD")).toBe(true)
    expect(matchesCurrencyFilter(["20+ currencies"], "JPY")).toBe(true)
    expect(matchesCurrencyFilter(["USD", "18+ currencies"], "BRL")).toBe(true)
  })

  it("does not treat arbitrary strings as wildcards", () => {
    expect(matchesCurrencyFilter(["GBP etc."], "USD")).toBe(false)
    expect(matchesCurrencyFilter(["currencies"], "USD")).toBe(false)
  })
})
