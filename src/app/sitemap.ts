import type { MetadataRoute } from "next"
import { cards } from "@/data/cards"
import { BASE_URL, buildHreflangAlternates } from "@/lib/seo"
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: locale === DEFAULT_LOCALE ? 1.0 : 0.9,
    alternates: { languages: buildHreflangAlternates("") },
  }))

  const faqEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/neobank-faq`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: { languages: buildHreflangAlternates("/neobank-faq") },
  }))

  const cardEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    cards.map((card) => ({
      url: `${BASE_URL}/${locale}/cards/${card.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: { languages: buildHreflangAlternates(`/cards/${card.id}`) },
    }))
  )

  return [...homeEntries, ...faqEntries, ...cardEntries]
}
