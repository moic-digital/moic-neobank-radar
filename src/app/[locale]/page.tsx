import { Suspense } from "react"
import { cards } from "@/data/cards"
import HomePage from "@/components/HomePage"
import {
  buildWebSiteJsonLd,
  buildItemListJsonLd,
  safeJsonLdStringify,
} from "@/lib/seo"

export default function Page() {
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
      <Suspense>
        <HomePage cards={cards} />
      </Suspense>
    </>
  )
}
