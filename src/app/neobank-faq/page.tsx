import type { Metadata } from "next"
import FaqSection from "@/components/FaqSection"
import {
  BASE_URL,
  buildFAQPageJsonLd,
  safeJsonLdStringify,
} from "@/lib/seo"
import { FAQ_CATEGORIES, getAllFaqItems } from "@/data/faq"

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

export default function NeoFaqPage() {
  const faqJsonLd = buildFAQPageJsonLd(getAllFaqItems())

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqJsonLd) }}
      />
      <div className="min-h-screen bg-moic-navy">
        <FaqSection categories={FAQ_CATEGORIES} />
      </div>
    </>
  )
}
