export interface CardData {
  readonly id: string
  readonly name: string
  readonly issuer: string
  readonly logo: string
  readonly type: "Credit" | "Debit" | "Prepaid" | "Virtual Account"
  readonly network: "Visa" | "Mastercard" | "Visa/Mastercard" | "Local Rails"
  readonly cashbackMax: number
  readonly cashbackMin: number
  readonly annualFee: string
  readonly fxFee: string
  readonly perks: readonly string[]
  readonly signupBonus: string
  readonly custody: "Custodial" | "Self-Custody" | "Non-Custodial" | "Hybrid"
  readonly regions: string
  readonly officialLink: string
  readonly cardGradient: string
  readonly tierColor: string
  readonly metal: boolean
  readonly supportedAssets: string
  readonly kyc: "Required" | "Light" | "None"
  readonly supportedCurrencies: readonly string[]
  readonly age: string
  readonly airdropFarming: string
  readonly rank?: number
  readonly recommended?: boolean
  readonly addedDate?: string
}

export interface Filters {
  readonly search: string
  readonly cardType: readonly string[]
  readonly network: readonly string[]
  readonly custody: readonly string[]
  readonly minCashback: number
  readonly annualFee: string
  readonly fxFee: string
  readonly region: string
  readonly kyc: string
  readonly currency: string
  readonly airdrop: string
}

export type SortOption = "cashbackHigh" | "nameAZ" | "age"
