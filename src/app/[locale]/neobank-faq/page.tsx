import type { Metadata } from "next"
import FaqSection from "@/components/FaqSection"
import {
  BASE_URL,
  SITE_NAME,
  getOgLocale,
  buildHreflangAlternates,
  buildFAQPageJsonLd,
  safeJsonLdStringify,
} from "@/lib/seo"
import { getFaqCategories, getAllFaqItems } from "@/data/faq"
import { type Locale } from "@/i18n/config"

interface FaqPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: FaqPageProps): Promise<Metadata> {
  const { locale } = await params
  const description =
    "Frequently asked questions about neobanks, crypto neobanks, stablecoins, and the Neobank Radar comparison platform."

  return {
    title: "FAQ",
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/neobank-faq`,
      languages: buildHreflangAlternates("/neobank-faq"),
    },
    openGraph: {
      title: `FAQ | ${SITE_NAME}`,
      description,
      url: `${BASE_URL}/${locale}/neobank-faq`,
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
      type: "website",
      images: [
        {
          url: "/neobank-radar-image-rs.png",
          width: 1200,
          height: 630,
          alt: "Neobank Radar - FAQ",
        },
      ],
    },
  }
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
