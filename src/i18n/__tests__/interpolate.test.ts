import { interpolate } from "../interpolate"

describe("interpolate", () => {
  it("should replace placeholders with values", () => {
    expect(interpolate("Filtered: {count} cards", { count: 5 })).toBe(
      "Filtered: 5 cards"
    )
  })

  it("should handle multiple placeholders", () => {
    expect(interpolate("{a} and {b}", { a: "X", b: "Y" })).toBe("X and Y")
  })

  it("should leave unknown placeholders unchanged", () => {
    expect(interpolate("{unknown} text", {})).toBe("{unknown} text")
  })

  it("should handle no placeholders", () => {
    expect(interpolate("plain text", {})).toBe("plain text")
  })
})
