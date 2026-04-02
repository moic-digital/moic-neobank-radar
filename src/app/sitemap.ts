import type { MetadataRoute } from "next"
import { cards } from "@/data/cards"
import { BASE_URL } from "@/lib/seo"
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config"

function buildAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {}
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}${path}`
  }
  return alternates
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: locale === DEFAULT_LOCALE ? 1.0 : 0.9,
    alternates: { languages: buildAlternates("") },
  }))

  const faqEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/neobank-faq`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: { languages: buildAlternates("/neobank-faq") },
  }))

  const cardEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    cards.map((card) => ({
      url: `${BASE_URL}/${locale}/cards/${card.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: { languages: buildAlternates(`/cards/${card.id}`) },
    }))
  )

  return [...homeEntries, ...faqEntries, ...cardEntries]
}
