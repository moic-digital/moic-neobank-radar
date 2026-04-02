import { cards } from "@/data/cards"
import { BASE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo"

export const revalidate = 3600

function formatCard(card: typeof cards[number]): string {
  const cashback =
    card.cashbackMax > 0
      ? `${card.cashbackMin}% - ${card.cashbackMax}%`
      : "None"

  const lines = [
    `### ${card.name}`,
    "",
    `- **Issuer**: ${card.issuer}`,
    `- **Type**: ${card.type}`,
    `- **Network**: ${card.network}`,
    `- **Cashback**: ${cashback}`,
    `- **Annual Fee**: ${card.annualFee}`,
    `- **FX Fee**: ${card.fxFee}`,
    `- **Custody**: ${card.custody}`,
    `- **KYC**: ${card.kyc}`,
    `- **Regions**: ${card.regions}`,
    `- **Supported Currencies**: ${card.supportedCurrencies.join(", ")}`,
    `- **Supported Assets**: ${card.supportedAssets}`,
    `- **Metal Card**: ${card.metal ? "Yes" : "No"}`,
    `- **Signup Bonus**: ${card.signupBonus}`,
    `- **Airdrop Farming**: ${card.airdropFarming}`,
    `- **Founded**: ${card.age || "N/A"}`,
    `- **Official Link**: ${card.officialLink}`,
    `- **Neobank Radar Page**: ${BASE_URL}/en/cards/${card.id}`,
  ]

  if (card.perks.length > 0) {
    lines.push(`- **Perks**:`)
    for (const perk of card.perks) {
      lines.push(`  - ${perk}`)
    }
  }

  return lines.join("\n")
}

function buildLlmsFullTxt(): string {
  const sortedCards = [...cards].sort((a, b) => a.name.localeCompare(b.name))

  const sections: string[] = [
    `# ${SITE_NAME} — Full Card Data`,
    "",
    `> ${DEFAULT_DESCRIPTION}`,
    "",
    `Website: ${BASE_URL}`,
    `Total cards: ${cards.length}`,
    `Last updated: ${new Date().toISOString().split("T")[0]}`,
    "",
    "---",
    "",
    "## Quick Summary",
    "",
    `| Card | Type | Network | Cashback | Fee | Custody | KYC | Region |`,
    `|------|------|---------|----------|-----|---------|-----|--------|`,
  ]

  for (const card of sortedCards) {
    const cashback =
      card.cashbackMax > 0 ? `${card.cashbackMax}%` : "None"
    sections.push(
      `| ${card.name} | ${card.type} | ${card.network} | ${cashback} | ${card.annualFee} | ${card.custody} | ${card.kyc} | ${card.regions} |`
    )
  }

  sections.push("", "---", "", "## Detailed Card Information", "")

  for (const card of sortedCards) {
    sections.push(formatCard(card))
    sections.push("")
    sections.push("---")
    sections.push("")
  }

  sections.push(
    "## About Neobank Radar",
    "",
    "Neobank Radar is a free, independent comparison platform for crypto debit and credit cards.",
    "We help users compare fees, cashback rates, custody models, KYC requirements, and supported",
    "regions across 40+ providers. Our data is updated regularly from verified sources.",
    "",
    "## Links",
    "",
    `- Website: ${BASE_URL}`,
    `- Summary: ${BASE_URL}/llms.txt`,
    `- Sitemap: ${BASE_URL}/sitemap.xml`,
    ""
  )

  return sections.join("\n")
}

export function GET() {
  const body = buildLlmsFullTxt()

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
