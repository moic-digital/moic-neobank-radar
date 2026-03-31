"use client"

import { useState, useCallback, useEffect } from "react"
import { Plus, MessageCircle, ClipboardCheck, Globe, CheckCircle, XCircle, X } from "lucide-react"
import AddNeobankModal from "@/components/AddNeobankModal"

const STEPS = [
  {
    icon: MessageCircle,
    title: "Submit",
    description: "Tell us about your neobank and card details",
  },
  {
    icon: ClipboardCheck,
    title: "Review",
    description: "We reach out, gather info, and evaluate your card",
  },
  {
    icon: Globe,
    title: "Publish",
    description: "Your neobank goes live on the Radar",
  },
] as const

export default function AddNeobankSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState<"success" | "error" | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(timer)
  }, [toast])

  const handleModalClose = useCallback((result?: "success" | "error") => {
    setIsModalOpen(false)
    if (result) setToast(result)
  }, [])

  return (
    <section
      id="add-neobank"
      className="relative bg-moic-surface border-t border-b border-white/6 py-20 sm:py-28 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Subtle top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-moic-blue/40 to-transparent" />

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-moic-blue mb-5">
            Get Listed
          </span>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
          >
            <span className="text-white">Didn&apos;t find your </span>
            <span className="bg-gradient-to-r from-moic-blue to-moic-blue-light bg-clip-text text-transparent">
              neobank
            </span>
            <span className="text-white"> here?</span>
          </h2>

          <p className="text-white/50 text-base sm:text-lg leading-relaxed mt-5 max-w-xl mx-auto">
            Submit your neobank and our team will reach out to gather more
            details, review your card, and publish it on the platform.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 mt-14">
          {/* Connector line (desktop only) */}
          <div className="hidden sm:block absolute top-6 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px border-t border-dashed border-white/12" />

          {STEPS.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center gap-3 px-4">
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-moic-blue/10 border border-moic-blue/25">
                <step.icon className="w-5 h-5 text-moic-blue" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-moic-blue text-[10px] font-bold text-white flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <div className="mt-1">
                <p className="text-sm font-semibold text-white">{step.title}</p>
                <p className="text-xs text-white/35 mt-1 leading-relaxed max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-2.5 px-10 py-4 bg-moic-blue hover:bg-moic-blue-light text-white font-semibold rounded-xl transition-all text-base cursor-pointer shadow-[0_0_30px_rgba(42,96,251,0.35)] hover:shadow-[0_0_44px_rgba(42,96,251,0.5)]"
            style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
          >
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            Add Your Neobank
          </button>
        </div>
      </div>

      {/* Subtle bottom glow line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-moic-blue/40 to-transparent" />

      {isModalOpen && <AddNeobankModal onClose={handleModalClose} />}

      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border shadow-2xl backdrop-blur-sm transition-all ${
            toast === "success"
              ? "bg-emerald-600/90 border-emerald-400/30"
              : "bg-red-600/90 border-red-400/30"
          }`}
        >
          {toast === "success" ? (
            <CheckCircle className="w-5 h-5 text-white shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-white shrink-0" />
          )}
          <div>
            <p className="text-white text-sm font-semibold">
              {toast === "success"
                ? "Thank you for your submission!"
                : "Something went wrong"}
            </p>
            <p className="text-white/70 text-xs mt-0.5">
              {toast === "success"
                ? "We will be in touch soon."
                : "Please try again later."}
            </p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="ml-2 p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>
      )}
    </section>
  )
}
