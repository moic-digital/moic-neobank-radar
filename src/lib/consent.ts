import type { ConsentCategories, ConsentState } from "@/types/consent"

const CONSENT_STORAGE_KEY = "neobank-radar-cookie-consent"
const CURRENT_CONSENT_VERSION = 1

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as ConsentState
    return isConsentValid(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function storeConsent(state: ConsentState): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded)
  }
}

export function clearStoredConsent(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    // localStorage may be unavailable
  }
}

export function isConsentValid(state: ConsentState | null): boolean {
  if (!state) return false
  if (state.version !== CURRENT_CONSENT_VERSION) return false
  if (!state.categories || state.categories.necessary !== true) return false
  if (typeof state.categories.analytics !== "boolean") return false
  if (typeof state.categories.marketing !== "boolean") return false
  return true
}

export function buildConsentState(categories: ConsentCategories): ConsentState {
  return {
    categories,
    timestamp: new Date().toISOString(),
    version: CURRENT_CONSENT_VERSION,
  }
}

export function buildAcceptAllConsent(): ConsentState {
  return buildConsentState({
    necessary: true,
    analytics: true,
    marketing: true,
  })
}

export function buildRejectAllConsent(): ConsentState {
  return buildConsentState({
    necessary: true,
    analytics: false,
    marketing: false,
  })
}

export function buildDefaultCategories(): ConsentCategories {
  return {
    necessary: true,
    analytics: true,
    marketing: false,
  }
}
