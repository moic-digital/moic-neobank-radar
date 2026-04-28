export function isAirdropFarming(value: string): boolean {
  return value.toLowerCase() === "true"
}

const GLOBAL_CURRENCY_PATTERN = /^\d+\+\s*currencies?$/i

export function matchesCurrencyFilter(
  supportedCurrencies: readonly string[],
  filter: string,
): boolean {
  if (filter === "") return true
  if (supportedCurrencies.includes(filter)) return true
  return supportedCurrencies.some(
    (c) => c === "Global" || GLOBAL_CURRENCY_PATTERN.test(c),
  )
}

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000

export function isNewCard(addedDate: string | undefined): boolean {
  if (!addedDate) return false
  const parsed = Date.parse(addedDate)
  if (isNaN(parsed)) return false
  return Date.now() - parsed < FOURTEEN_DAYS_MS
}
