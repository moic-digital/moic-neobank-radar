"use client"

import { useEffect, useRef, useState } from "react"
import { X, Loader2 } from "lucide-react"
import FormDropdown from "@/components/FormDropdown"

type SubmitResult = "success" | "error"

interface AddNeobankModalProps {
  readonly onClose: (result?: SubmitResult) => void
}

const KYC_OPTIONS = ["Yes", "No"] as const
const CUSTODY_OPTIONS = ["Custodial", "Non-Custodial"] as const

const WEBHOOK_URL =
  "https://hook.us2.make.com/9yw7vlvqzgns7c0tcara5pyfjmekekep"

interface FormData {
  readonly contactName: string
  readonly email: string
  readonly telegram: string
  readonly neobankName: string
  readonly site: string
  readonly founded: string
  readonly cashbackMax: string
  readonly kyc: string
  readonly custody: string
  readonly currencies: string
}

const INITIAL_FORM: FormData = {
  contactName: "",
  email: "",
  telegram: "",
  neobankName: "",
  site: "",
  founded: "",
  cashbackMax: "",
  kyc: "",
  custody: "",
  currencies: "",
}

export default function AddNeobankModal({ onClose }: AddNeobankModalProps) {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose()
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      onClose("success")
    } catch {
      onClose("error")
    }
  }

  const inputClasses =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-moic-blue focus:shadow-[0_0_12px_rgba(42,96,251,0.2)] text-sm transition-all"

  const labelClasses = "block text-xs font-medium text-white/50 mb-1.5"

  const sectionHeadingClasses =
    "text-sm font-semibold text-white/70 tracking-wide uppercase mb-3 w-full"


  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="relative w-full max-w-lg bg-moic-navy border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-moic-navy border-b border-white/10 rounded-t-2xl px-6 py-4 flex items-center justify-between z-10">
          <h2
            className="text-lg font-bold text-white tracking-tight"
            style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
          >
            Add Neobank
          </h2>
          <button
            onClick={() => onClose()}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white/50" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
          {/* Section 1: Contact Info */}
          <fieldset className="space-y-4">
            <legend className={sectionHeadingClasses}>Contact Info</legend>

            <div>
              <label className={labelClasses}>Name</label>
              <input
                type="text"
                placeholder="Your name"
                className={inputClasses}
                value={form.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>E-mail</label>
                <input
                  type="email"
                  placeholder="contact@example.com"
                  className={inputClasses}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClasses}>Telegram</label>
                <input
                  type="text"
                  placeholder="@username"
                  className={inputClasses}
                  value={form.telegram}
                  onChange={(e) => handleChange("telegram", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <div className="border-t border-white/10" />

          {/* Section 2: Neobank Info */}
          <fieldset className="space-y-4">
            <legend className={sectionHeadingClasses}>Neobank Info</legend>

            <div>
              <label className={labelClasses}>Neobank name</label>
              <input
                type="text"
                placeholder="Neobank name"
                className={inputClasses}
                value={form.neobankName}
                onChange={(e) => handleChange("neobankName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Site</label>
                <input
                  type="text"
                  placeholder="example.com"
                  className={inputClasses}
                  value={form.site}
                  onChange={(e) => handleChange("site", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClasses}>Founded</label>
                <input
                  type="text"
                  placeholder="2023"
                  className={inputClasses}
                  value={form.founded}
                  onChange={(e) => handleChange("founded", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Custody</label>
                <FormDropdown
                  value={form.custody}
                  placeholder="Select..."
                  options={CUSTODY_OPTIONS}
                  onChange={(val) => handleChange("custody", val)}
                />
              </div>
              <div>
                <label className={labelClasses}>KYC</label>
                <FormDropdown
                  value={form.kyc}
                  placeholder="Select..."
                  options={KYC_OPTIONS}
                  onChange={(val) => handleChange("kyc", val)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Cashback max.</label>
                <input
                  type="text"
                  placeholder="e.g. 8%"
                  className={inputClasses}
                  value={form.cashbackMax}
                  onChange={(e) => handleChange("cashbackMax", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClasses}>Supported currencies</label>
                <input
                  type="text"
                  placeholder="USD, EUR, BTC..."
                  className={inputClasses}
                  value={form.currencies}
                  onChange={(e) => handleChange("currencies", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer tracking-wide flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? "Submitting..." : "Submit Neobank"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
