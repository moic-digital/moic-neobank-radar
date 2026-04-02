import { Suspense } from "react"
import { cards } from "@/data/cards"
import HomePage from "@/components/HomePage"
import StaticCardGrid from "@/components/StaticCardGrid"
import {
  buildWebSiteJsonLd,
  buildItemListJsonLd,
  safeJsonLdStringify,
} from "@/lib/seo"

interface PageProps {
  readonly params: Promise<{ locale: string }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const webSiteJsonLd = buildWebSiteJsonLd()
  const itemListJsonLd = buildItemListJsonLd(cards)

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
