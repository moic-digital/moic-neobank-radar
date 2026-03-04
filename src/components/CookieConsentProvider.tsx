"use client"

import { createContext, useContext } from "react"
import { useConsent } from "@/hooks/useConsent"
import GoogleTagManager from "@/components/GoogleTagManager"
import CookieConsentBanner from "@/components/CookieConsentBanner"
import { Cookie } from "lucide-react"

interface ConsentContextValue {
  readonly resetConsent: () => void
}

const ConsentContext = createContext<ConsentContextValue>({
  resetConsent: () => {},
})

export function useConsentContext() {
  return useContext(ConsentContext)
}

interface CookieConsentProviderProps {
  readonly children: React.ReactNode
}

export default function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const { consent, showBanner, acceptAll, rejectAll, savePreferences, resetConsent } = useConsent()

  const analyticsConsented = consent?.categories.analytics ?? false

  return (
    <ConsentContext.Provider value={{ resetConsent }}>
      {children}
      <GoogleTagManager analyticsConsented={analyticsConsented} />
      {showBanner && (
        <CookieConsentBanner
          initialCategories={consent?.categories}
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onSavePreferences={savePreferences}
        />
      )}
      {!showBanner && (
        <button
          onClick={resetConsent}
          aria-label="Cookie settings"
          className="fixed bottom-4 left-4 z-40 rounded-full border border-white/10 bg-moic-surface/90 p-2.5 text-white/40 shadow-lg backdrop-blur-sm transition-all hover:bg-moic-surface hover:text-white/70"
        >
          <Cookie className="h-4 w-4" />
        </button>
      )}
    </ConsentContext.Provider>
  )
}
