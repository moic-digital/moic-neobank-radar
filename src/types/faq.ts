export interface FaqItem {
  readonly question: string
  readonly answer: string
}

export interface FaqCategory {
  readonly title: string
  readonly items: readonly FaqItem[]
}
