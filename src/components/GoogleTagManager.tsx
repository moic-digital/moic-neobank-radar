"use client"

import Script from "next/script"

const GTM_ID = "G-0SRP1R4501"

interface GoogleTagManagerProps {
  readonly analyticsConsented: boolean
}

export default function GoogleTagManager({ analyticsConsented }: GoogleTagManagerProps) {
  if (!analyticsConsented) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GTM_ID}');
        `}
      </Script>
    </>
  )
}
