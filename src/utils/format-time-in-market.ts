interface TimeLabels {
  readonly years: string
  readonly months: string
  readonly month: string
}

function parseAge(age: string): Date {
  if (age.includes("-")) {
    const [year, month] = age.split("-").map(Number)
    return new Date(year, month - 1)
  }
  return new Date(parseInt(age), 0)
}

function computeMonthsDiff(age: string): number {
  const launchDate = parseAge(age)
  const now = new Date()
  return (now.getFullYear() - launchDate.getFullYear()) * 12
    + (now.getMonth() - launchDate.getMonth())
}

export function formatTimeInMarket(
  age: string | undefined,
  labels: TimeLabels
): string {
  if (!age) return "N/A"

  const totalMonths = computeMonthsDiff(age)
  if (totalMonths < 0) return "N/A"

  if (totalMonths < 1) return `< 1 ${labels.month}`
  if (totalMonths < 12) return `${totalMonths} ${totalMonths === 1 ? labels.month : labels.months}`

  const years = Math.floor(totalMonths / 12)
  return `${years} ${labels.years}`
}

export function formatTimeInMarketShort(
  age: string | undefined,
  labels: TimeLabels
): string {
  if (!age) return "N/A"

  const totalMonths = computeMonthsDiff(age)
  if (totalMonths < 0) return "N/A"

  if (totalMonths < 1) return `< 1 mo`
  if (totalMonths < 12) return `${totalMonths} mo`

  const years = Math.floor(totalMonths / 12)
  return `${years} yr`
}
