import type { Metadata } from "next"
import { Suspense } from "react"
import { cards } from "@/data/cards"
import HomePage from "@/components/HomePage"
import StaticCardGrid from "@/components/StaticCardGrid"
import {
  BASE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  getOgLocale,
  buildHreflangAlternates,
  buildWebSiteJsonLd,
  buildItemListJsonLd,
  safeJsonLdStringify,
} from "@/lib/seo"

interface PageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params

  return {
    openGraph: {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: `${BASE_URL}/${locale}`,
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: buildHreflangAlternates(""),
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const webSiteJsonLd = buildWebSiteJsonLd()
  const itemListJsonLd = buildItemListJsonLd(cards, locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdStringify(itemListJsonLd),
        }}
      />
      <Suspense fallback={<StaticCardGrid cards={cards} locale={locale} />}>
        <HomePage cards={cards} />
      </Suspense>
    </>
  )
}
