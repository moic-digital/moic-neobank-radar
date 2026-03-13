import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"
import {
  BASE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  buildOrganizationJsonLd,
  safeJsonLdStringify,
} from "@/lib/seo"
import CookieConsentProvider from "@/components/CookieConsentProvider"

const sora = Sora({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  icons: {
    icon: "/radar-logo-blue.png",
    apple: "/radar-logo-blue.png",
  },
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.png",
        width: 1080,
        height: 570,
        alt: `${SITE_NAME} - Compare Crypto Cards`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationJsonLd = buildOrganizationJsonLd()

  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} bg-moic-navy text-white antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLdStringify(organizationJsonLd),
          }}
        />
        <CookieConsentProvider>
          {children}
        </CookieConsentProvider>
      </body>
    </html>
  )
}
