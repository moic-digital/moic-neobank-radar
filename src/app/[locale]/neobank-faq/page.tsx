import type { Metadata } from "next"
import FaqSection from "@/components/FaqSection"
import {
  BASE_URL,
  buildFAQPageJsonLd,
  safeJsonLdStringify,
} from "@/lib/seo"
import { getFaqCategories, getAllFaqItems } from "@/data/faq"
import { type Locale } from "@/i18n/config"

interface FaqPageProps {
  readonly params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: "FAQ — Neobank Radar",
  description:
    "Frequently asked questions about neobanks, crypto neobanks, stablecoins, and the Neobank Radar comparison platform.",
  alternates: {
    canonical: `${BASE_URL}/neobank-faq`,
  },
  openGraph: {
    title: "FAQ — Neobank Radar",
    description:
      "Frequently asked questions about neobanks, crypto neobanks, stablecoins, and the Neobank Radar comparison platform.",
    url: `${BASE_URL}/neobank-faq`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neobank Radar - FAQ",
      },
    ],
  },
}

export default async function NeoFaqPage({ params }: FaqPageProps) {
  const { locale } = await params
  const categories = getFaqCategories(locale as Locale)
  const faqJsonLd = buildFAQPageJsonLd(getAllFaqItems())

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqJsonLd) }}
      />
      <div className="min-h-screen bg-moic-navy">
        <FaqSection categories={categories} />
      </div>
    </>
  )
}
