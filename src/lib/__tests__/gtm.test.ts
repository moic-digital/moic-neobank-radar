import { pushToDataLayer, trackCompareCards } from "@/lib/gtm"
import type { CardData } from "@/types/card"

function makeCard(overrides: Partial<CardData> & Pick<CardData, "id" | "issuer">): CardData {
  return {
    name: overrides.issuer,
    logo: "/logos/test.svg",
    type: "Debit",
    network: "Visa",
    cashbackMax: 0,
    cashbackMin: 0,
    annualFee: "$0",
    fxFee: "0%",
    perks: [],
    signupBonus: "",
    custody: "Custodial",
    regions: "Global",
    officialLink: "https://example.com",
    cardGradient: "from-gray-900 to-gray-800",
    tierColor: "gray",
    metal: false,
    supportedAssets: "",
    kyc: "Required",
    supportedCurrencies: ["USD"],
    age: "2 years",
    airdropFarming: "No",
    ...overrides,
  }
}

beforeEach(() => {
  window.dataLayer = []
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe("pushToDataLayer", () => {
  it("should push event to existing dataLayer", () => {
    window.dataLayer = [{ event: "existing" }]

    pushToDataLayer({ event: "test_event", value: 42 })

    expect(window.dataLayer).toHaveLength(2)
    expect(window.dataLayer[1]).toEqual({ event: "test_event", value: 42 })
  })

  it("should initialize dataLayer if undefined", () => {
    // @ts-expect-error — simulating GTM not loaded
    delete window.dataLayer

    pushToDataLayer({ event: "test_event" })

    expect(window.dataLayer).toHaveLength(1)
    expect(window.dataLayer[0]).toEqual({ event: "test_event" })
  })
})

describe("trackCompareCards", () => {
  it("should push compare_cards event with card details", () => {
    const cards = [
      makeCard({ id: "bybit", issuer: "Bybit" }),
      makeCard({ id: "binance", issuer: "Binance" }),
    ]

    trackCompareCards(cards)

    expect(window.dataLayer).toHaveLength(1)
    expect(window.dataLayer[0]).toEqual({
      event: "compare_cards",
      compare_card_count: 2,
      compare_card_names: "Bybit, Binance",
      compare_card_ids: "bybit, binance",
    })
  })

  it("should handle 4 cards (max compare)", () => {
    const cards = [
      makeCard({ id: "bybit", issuer: "Bybit" }),
      makeCard({ id: "binance", issuer: "Binance" }),
      makeCard({ id: "crypto-com", issuer: "Crypto.com" }),
      makeCard({ id: "nexo", issuer: "Nexo" }),
    ]

    trackCompareCards(cards)

    expect(window.dataLayer[0]).toEqual({
      event: "compare_cards",
      compare_card_count: 4,
      compare_card_names: "Bybit, Binance, Crypto.com, Nexo",
      compare_card_ids: "bybit, binance, crypto-com, nexo",
    })
  })

  it("should handle a single card", () => {
    const cards = [makeCard({ id: "revolut", issuer: "Revolut" })]

    trackCompareCards(cards)

    expect(window.dataLayer[0]).toEqual({
      event: "compare_cards",
      compare_card_count: 1,
      compare_card_names: "Revolut",
      compare_card_ids: "revolut",
    })
  })

  it("should handle empty card list", () => {
    trackCompareCards([])

    expect(window.dataLayer[0]).toEqual({
      event: "compare_cards",
      compare_card_count: 0,
      compare_card_names: "",
      compare_card_ids: "",
    })
  })

  it("should use issuer field for card names", () => {
    const cards = [
      makeCard({ id: "test", issuer: "Test Issuer", name: "Test Card Product" }),
    ]

    trackCompareCards(cards)

    expect(window.dataLayer[0]).toMatchObject({
      compare_card_names: "Test Issuer",
    })
  })
})
