import type { CardData } from "@/types/card"

export function pushToDataLayer(event: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
}

export function trackCompareModeOpen(): void {
  pushToDataLayer({
    event: "compare_mode_open",
  })
}

export function trackCompareCards(cards: readonly CardData[]): void {
  pushToDataLayer({
    event: "compare_cards",
    compare_card_count: cards.length,
    compare_card_names: cards.map((c) => c.issuer).join(", "),
    compare_card_ids: cards.map((c) => c.id).join(", "),
  })
}
