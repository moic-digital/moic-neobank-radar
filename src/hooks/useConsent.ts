"use client"

import { useState, useEffect, useCallback } from "react"
import type { ConsentCategories, ConsentState } from "@/types/consent"
import {
  getStoredConsent,
  storeConsent,
  clearStoredConsent,
  buildAcceptAllConsent,
  buildRejectAllConsent,
  buildConsentState,
} from "@/lib/consent"

interface UseConsentReturn {
  readonly consent: ConsentState | null
  readonly showBanner: boolean
  readonly acceptAll: () => void
  readonly rejectAll: () => void
  readonly savePreferences: (categories: ConsentCategories) => void
  readonly resetConsent: () => void
}

export function useConsent(): UseConsentReturn {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (stored) {
      setConsent(stored)
    }
    setHydrated(true)
  }, [])

  const showBanner = hydrated && consent === null

  const acceptAll = useCallback(() => {
    const newConsent = buildAcceptAllConsent()
    storeConsent(newConsent)
    setConsent(newConsent)
  }, [])

  const rejectAll = useCallback(() => {
    const newConsent = buildRejectAllConsent()
    storeConsent(newConsent)
    setConsent(newConsent)
  }, [])

  const savePreferences = useCallback((categories: ConsentCategories) => {
    const newConsent = buildConsentState(categories)
    storeConsent(newConsent)
    setConsent(newConsent)
  }, [])

  const resetConsent = useCallback(() => {
    clearStoredConsent()
    setConsent(null)
  }, [])

  return {
    consent,
    showBanner,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
  }
}
