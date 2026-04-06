export function isAirdropFarming(value: string): boolean {
  return value.toLowerCase() === "true"
}

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000

export function isNewCard(addedDate: string | undefined): boolean {
  if (!addedDate) return false
  const parsed = Date.parse(addedDate)
  if (isNaN(parsed)) return false
  return Date.now() - parsed < FOURTEEN_DAYS_MS
}
