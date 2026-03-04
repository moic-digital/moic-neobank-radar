"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Cookie, Shield, BarChart3, Megaphone } from "lucide-react"
import type { ConsentCategories } from "@/types/consent"
import { buildDefaultCategories } from "@/lib/consent"

interface CookieConsentBannerProps {
  readonly initialCategories?: ConsentCategories
  readonly onAcceptAll: () => void
  readonly onRejectAll: () => void
  readonly onSavePreferences: (categories: ConsentCategories) => void
}

export default function CookieConsentBanner({
  initialCategories,
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
}: CookieConsentBannerProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [categories, setCategories] = useState<ConsentCategories>(
    initialCategories ?? buildDefaultCategories()
  )
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bannerRef.current?.focus()
  }, [])

  const handleToggle = useCallback(
    (key: "analytics" | "marketing") => {
      setCategories((prev) => ({
        ...prev,
        [key]: !prev[key],
      }))
    },
    []
  )

  const handleSave = useCallback(() => {
    onSavePreferences(categories)
  }, [categories, onSavePreferences])

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-description"
      tabIndex={-1}
      className="fixed inset-x-0 bottom-0 z-50 animate-slide-up focus:outline-none"
    >
      <div className="mx-auto max-w-4xl p-4">
        <div className="rounded-2xl border border-white/10 bg-moic-surface/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
          {/* Main content */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 hidden rounded-lg bg-moic-blue/10 p-2 sm:block">
              <Cookie className="h-5 w-5 text-moic-blue" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-white sm:text-base">
                We value your privacy
              </h2>
              <p
                id="cookie-consent-description"
                className="mt-1 text-xs leading-relaxed text-white/60 sm:text-sm"
              >
                We use cookies to enhance your browsing experience, analyze site
                traffic, and personalize content. You can choose which cookies to
                accept.
              </p>
            </div>
          </div>

          {/* Details panel */}
          {showDetails && (
            <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
              <CategoryToggle
                icon={<Shield className="h-4 w-4" />}
                label="Necessary"
                description="Required for the site to function properly. Cannot be disabled."
                checked={true}
                disabled={true}
              />
              <CategoryToggle
                icon={<BarChart3 className="h-4 w-4" />}
                label="Analytics"
                description="Help us understand how visitors interact with our site via Google Analytics."
                checked={categories.analytics}
                onChange={() => handleToggle("analytics")}
              />
              <CategoryToggle
                icon={<Megaphone className="h-4 w-4" />}
                label="Marketing"
                description="Used for targeted advertising and tracking across websites."
                checked={categories.marketing}
                onChange={() => handleToggle("marketing")}
              />
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="order-3 rounded-lg px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:text-white sm:order-1 sm:mr-auto sm:text-sm"
            >
              {showDetails ? "Hide details" : "Customize"}
            </button>

            {showDetails ? (
              <button
                onClick={handleSave}
                className="order-1 rounded-lg bg-moic-blue px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-moic-blue-light sm:order-3 sm:text-sm"
              >
                Save preferences
              </button>
            ) : (
              <>
                <button
                  onClick={onRejectAll}
                  className="order-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-white/10 sm:text-sm"
                >
                  Reject all
                </button>
                <button
                  onClick={onAcceptAll}
                  className="order-1 rounded-lg bg-moic-blue px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-moic-blue-light sm:order-3 sm:text-sm"
                >
                  Accept all
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface CategoryToggleProps {
  readonly icon: React.ReactNode
  readonly label: string
  readonly description: string
  readonly checked: boolean
  readonly disabled?: boolean
  readonly onChange?: () => void
}

function CategoryToggle({
  icon,
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: CategoryToggleProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
      <div className="mt-0.5 text-white/40">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-white sm:text-sm">
            {label}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={`${label} cookies`}
            disabled={disabled}
            onClick={onChange}
            className={`
              relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full
              transition-colors duration-200
              ${checked ? "bg-moic-green" : "bg-white/20"}
              ${disabled ? "cursor-not-allowed opacity-60" : "hover:opacity-80"}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-4 w-4 translate-y-0.5
                rounded-full bg-white shadow-sm transition-transform duration-200
                ${checked ? "translate-x-4" : "translate-x-0.5"}
              `}
            />
          </button>
        </div>
        <p className="mt-0.5 text-[11px] leading-relaxed text-white/40 sm:text-xs">
          {description}
        </p>
      </div>
    </div>
  )
}
