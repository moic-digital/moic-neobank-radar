export function isAirdropFarming(value: string): boolean {
  return value.toLowerCase() === "true"
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export function isNewCard(addedDate: string | undefined): boolean {
  if (!addedDate) return false
  const parsed = Date.parse(addedDate)
  if (isNaN(parsed)) return false
  return Date.now() - parsed < SEVEN_DAYS_MS
}
