export interface ConsentCategories {
  readonly necessary: true
  readonly analytics: boolean
  readonly marketing: boolean
}

export interface ConsentState {
  readonly categories: ConsentCategories
  readonly timestamp: string
  readonly version: number
}
