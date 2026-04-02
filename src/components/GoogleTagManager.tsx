"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function updateConsent(granted: boolean) {
  const status = granted ? "granted" : "denied"

  window.dataLayer = window.dataLayer || []
  window.gtag("consent", "update", {
    analytics_storage: status,
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
  })
}

interface GoogleTagManagerProps {
  readonly analyticsConsented: boolean
}

export default function GoogleTagManager({ analyticsConsented }: GoogleTagManagerProps) {
  useEffect(() => {
    if (typeof window.gtag === "function") {
      updateConsent(analyticsConsented)
    }
  }, [analyticsConsented])

  return null
}
