import { cards } from "@/data/cards"
import { BASE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo"

export const revalidate = 3600

function buildLlmsTxt(): string {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${DEFAULT_DESCRIPTION}`,
    "",
    `Website: ${BASE_URL}`,
    `Total cards compared: ${cards.length}`,
    "",
    "## What is Neobank Radar?",
    "",
    "Neobank Radar is a free, independent comparison platform for crypto debit and credit cards.",
    "We track fees, cashback rates, custody models, KYC requirements, supported regions,",
    "and other features across 40+ crypto card providers to help users find the best card for their needs.",
    "",
    "## Card Categories",
    "",
    "- **Card Types**: Credit, Debit, Prepaid, Virtual Account",
    "- **Networks**: Visa, Mastercard",
    "- **Custody Models**: Custodial, Self-Custody, Non-Custodial, Hybrid",
    "- **KYC Levels**: Required, Light, None",
    "",
    "## All Cards",
    "",
  ]

  const sortedCards = [...cards].sort((a, b) => a.name.localeCompare(b.name))

  for (const card of sortedCards) {
    const cashback =
      card.cashbackMax > 0
        ? `${card.cashbackMin}%-${card.cashbackMax}%`
        : "None"

    lines.push(
      `- [${card.name}](${BASE_URL}/en/cards/${card.id}): ${card.type} (${card.network}) | Cashback: ${cashback} | Fee: ${card.annualFee} | Custody: ${card.custody} | KYC: ${card.kyc} | Region: ${card.regions}`
    )
  }

  lines.push(
    "",
    "## Useful Links",
    "",
    `- Full card data: ${BASE_URL}/llms-full.txt`,
    `- English: ${BASE_URL}/en`,
    `- Portuguese: ${BASE_URL}/pt`,
    `- Spanish: ${BASE_URL}/es`,
    `- Sitemap: ${BASE_URL}/sitemap.xml`,
    ""
  )

  return lines.join("\n")
}

export function GET() {
  const body = buildLlmsTxt()

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
