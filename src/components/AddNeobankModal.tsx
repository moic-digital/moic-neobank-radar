"use client"

import { useEffect, useRef, useState } from "react"
import { X, Loader2 } from "lucide-react"
import { useDictionary } from "@/i18n/use-dictionary"

type SubmitResult = "success" | "error"

interface AddNeobankModalProps {
  readonly onClose: (result?: SubmitResult) => void
}

const WEBHOOK_URL =
  "https://hook.us2.make.com/9yw7vlvqzgns7c0tcara5pyfjmekekep"

interface FormData {
  readonly contactName: string
  readonly email: string
  readonly telegram: string
  readonly message: string
}

const INITIAL_FORM: FormData = {
  contactName: "",
  email: "",
  telegram: "",
  message: "",
}

export default function AddNeobankModal({ onClose }: AddNeobankModalProps) {
  const { t } = useDictionary()
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
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

  function isFormValid(): boolean {
    return (
      form.contactName.trim() !== "" &&
      form.email.trim() !== "" &&
      form.message.trim() !== ""
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isFormValid()) {
      setShowErrors(true)
      return
    }
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
    } finally {
      setSubmitting(false)
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
            {t.addNeobank.modalTitle}
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
            <legend className={sectionHeadingClasses}>{t.addNeobank.contactInfo}</legend>

            <div>
              <label className={labelClasses}>{t.addNeobank.name}</label>
              <input
                type="text"
                required
                placeholder={t.addNeobank.namePlaceholder}
                className={inputClasses}
                value={form.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>{t.addNeobank.email}</label>
                <input
                  required
                  type="email"
                  placeholder={t.addNeobank.emailPlaceholder}
                  className={inputClasses}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClasses}>{t.addNeobank.telegram}</label>
                <input
                  type="text"
                  placeholder={t.addNeobank.telegramPlaceholder}
                  className={inputClasses}
                  value={form.telegram}
                  onChange={(e) => handleChange("telegram", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>{t.addNeobank.message}</label>
              <textarea
                required
                placeholder={t.addNeobank.messagePlaceholder}
                rows={4}
                className={inputClasses + " resize-none"}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>
          </fieldset>

          {/* Submit */}
          <div className="pt-2">
            {showErrors && !isFormValid() && (
              <p className="text-red-400 text-xs mb-3">
                {t.addNeobank.validationError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer tracking-wide flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? t.addNeobank.submitting : t.addNeobank.submitNeobank}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
