"use client"

import { useEffect, useCallback, useState, useRef, Fragment } from "react"
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { CardData } from "@/types/card"
import { isAirdropFarming } from "@/utils/card"
import CardLogo from "@/components/CardLogo"
import { useDictionary } from "@/i18n/use-dictionary"
import type { Dictionary } from "@/i18n/types"

interface CompareDrawerProps {
  readonly cards: readonly CardData[]
  readonly onClose: () => void
}

interface StatRow {
  readonly label: string
  readonly getValue: (card: CardData) => string
  readonly highlight?: (value: string) => string
  readonly desktopOnly?: boolean
}

function buildStatRows(t: Dictionary): readonly StatRow[] {
  return [
    { label: t.compare.type, getValue: (c) => c.type },
    { label: t.compare.network, getValue: (c) => c.network },
    {
      label: t.compare.cashback,
      getValue: (c) =>
        c.cashbackMax > 0 ? `${c.cashbackMax}%` : "N/A",
      highlight: (v) => {
        const num = parseFloat(v)
        if (isNaN(num)) return "text-white/60"
        if (num >= 4) return "text-moic-green font-bold"
        if (num >= 2) return "text-moic-blue font-bold"
        return "text-white"
      },
    },
    { label: t.compare.annualFee, getValue: (c) => c.annualFee },
    { label: t.compare.fxFee, getValue: (c) => c.fxFee },
    {
      label: t.compare.kyc,
      getValue: (c) => c.kyc,
      highlight: (v) =>
        v === "None" ? "text-moic-green" : v === "Required" ? "text-amber-400" : "text-white",
    },
    { label: t.compare.custodyLabel, getValue: (c) => c.custody },
    {
      label: t.compare.metal,
      getValue: (c) => (c.metal ? t.compare.yes : t.compare.no),
      highlight: (v) => (v === t.compare.yes ? "text-moic-blue" : "text-white/40"),
    },
    { label: t.compare.bonus, getValue: (c) => c.signupBonus || t.compare.none },
    {
      label: t.compare.airdrop,
      getValue: (c) => (isAirdropFarming(c.airdropFarming) ? t.compare.yes : t.compare.no),
      highlight: (v) => (v === t.compare.yes ? "text-moic-green" : "text-white/40"),
    },
    { label: t.compare.regions, getValue: (c) => c.regions, desktopOnly: true },
    { label: t.compare.assets, getValue: (c) => c.supportedAssets || "N/A", desktopOnly: true },
    {
      label: t.compare.currencies,
      getValue: (c) => c.supportedCurrencies.join(", ") || "N/A",
    },
    { label: t.compare.age, getValue: (c) => c.age || "N/A" },
  ]
}

function DesktopTable({ cards, statRows }: { readonly cards: readonly CardData[]; readonly statRows: readonly StatRow[] }) {
  const { t } = useDictionary()

  return (
    <div className="min-w-[500px]">
      {/* Card headers — sticky */}
      <div className="sticky top-0 z-10 bg-moic-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="grid" style={{ gridTemplateColumns: `140px repeat(${cards.length}, minmax(120px, 1fr))` }}>
          <div className="p-4" />
          {cards.map((card) => (
            <div key={card.id} className="p-4 text-center border-l border-white/[0.06]">
              <div className="flex flex-col items-center gap-2">
                <CardLogo src={card.logo} alt={card.issuer} issuer={card.issuer} size="sm" />
                <div>
                  <p className="text-sm font-bold text-white truncate max-w-[120px]">{card.name}</p>
                  <p className="text-[10px] text-white/40">{card.issuer}</p>
                </div>
                <a
                  href={card.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] text-moic-blue hover:text-moic-blue-light transition-colors"
                >
                  {t.compare.visit} <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stat rows */}
      {statRows.map((row) => (
        <div
          key={row.label}
          className="grid border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
          style={{ gridTemplateColumns: `140px repeat(${cards.length}, minmax(120px, 1fr))` }}
        >
          <div className="p-4 flex items-center">
            <span className="text-xs text-white/40 font-medium uppercase tracking-wider">{row.label}</span>
          </div>
          {cards.map((card) => {
            const value = row.getValue(card)
            const colorClass = row.highlight ? row.highlight(value) : "text-white"
            return (
              <div key={card.id} className="p-4 flex items-center justify-center border-l border-white/[0.04]">
                <span className={`text-sm text-center ${colorClass}`}>{value}</span>
              </div>
            )
          })}
        </div>
      ))}

    </div>
  )
}

function MobileTable({ cards, statRows }: { readonly cards: readonly CardData[]; readonly statRows: readonly StatRow[] }) {
  const { t } = useDictionary()
  const [hasScrolled, setHasScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    if (!hasScrolled) setHasScrolled(true)
  }, [hasScrolled])

  const mobileStatRows = statRows.filter((r) => !r.desktopOnly)
  const gridCols = `120px repeat(${mobileStatRows.length}, 100px)`
  const rowHeight = "calc((100dvh - 120px) * 0.25)"

  return (
    <div className="flex flex-col h-full relative">
      {/* Swipe hint */}
      {!hasScrolled && (
        <div className="flex items-center justify-center gap-2 py-2 text-[10px] text-white/30 animate-pulse">
          <ChevronLeft className="w-3 h-3" />
          <span>{t.compare.swipeToExplore}</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      )}

      <div className="flex-1 overflow-auto custom-scrollbar" onScroll={handleScroll}>
        <div className="grid" style={{ gridTemplateColumns: gridCols, width: `${120 + mobileStatRows.length * 100}px` }}>
          {/* Header row */}
          <div className="sticky left-0 z-20 bg-moic-navy h-[40px] border-b border-white/10 border-r border-r-white/10" />
          {mobileStatRows.map((row) => (
            <div key={row.label} className="h-[40px] flex items-center justify-center px-2 border-b border-white/10">
              <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider text-center leading-tight">
                {row.label}
              </span>
            </div>
          ))}

          {/* Card rows */}
          {cards.map((card) => (
            <Fragment key={card.id}>
              {/* Sticky card name cell — logo on top, name below */}
              <div
                key={`${card.id}-name`}
                className="sticky left-0 z-20 bg-moic-navy flex flex-col items-center justify-center gap-1.5 px-2 border-b border-white/[0.06] border-r border-r-white/10"
                style={{ height: rowHeight }}
              >
                <CardLogo src={card.logo} alt={card.issuer} issuer={card.issuer} size="sm" />
                <p className="text-xs font-bold text-white text-center leading-tight">{card.issuer}</p>
                <a
                  href={card.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-moic-blue"
                >
                  {t.compare.visit} →
                </a>
              </div>

              {/* Stat cells */}
              {mobileStatRows.map((row) => {
                const value = row.getValue(card)
                const colorClass = row.highlight ? row.highlight(value) : "text-white"
                return (
                  <div
                    key={`${card.id}-${row.label}`}
                    className="flex items-center justify-center px-2 border-b border-white/[0.06]"
                    style={{ height: rowHeight }}
                  >
                    <span className={`text-sm text-center leading-tight font-medium ${colorClass}`}>
                      {value}
                    </span>
                  </div>
                )
              })}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Right edge fade — scroll affordance */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-moic-navy to-transparent z-30" />
    </div>
  )
}

export default function CompareDrawer({ cards, onClose }: CompareDrawerProps) {
  const { t } = useDictionary()
  const [closing, setClosing] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const statRows = buildStatRows(t)

  const handleClose = useCallback(() => {
    setClosing(true)
    const drawer = drawerRef.current
    if (!drawer) {
      onClose()
      return
    }
    drawer.addEventListener("animationend", onClose, { once: true })
    // Fallback in case animationend doesn't fire
    setTimeout(onClose, 350)
  }, [onClose])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    },
    [handleClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={t.compare.compareCards}>
      {/* Backdrop — desktop only */}
      <div
        className={`hidden sm:block sm:w-[35%] bg-black/60 backdrop-blur-sm ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className={`w-full sm:w-[65%] bg-moic-navy border-l border-white/10 flex flex-col overflow-hidden ${closing ? "sm:animate-slide-out-right" : "sm:animate-slide-in-right"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 shrink-0">
          <h2 className="text-lg font-bold text-white tracking-tight font-display">
            {t.compare.compareCards}
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close comparison drawer"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white/50" />
          </button>
        </div>

        {/* Content — responsive layout */}
        <div className="flex-1 overflow-hidden relative">
          {/* Desktop: original layout (stats as rows, cards as columns) */}
          <div className="hidden sm:block h-full overflow-auto custom-scrollbar">
            <DesktopTable cards={cards} statRows={statRows} />
          </div>

          {/* Mobile: transposed layout (cards as rows, stats as columns) */}
          <div className="sm:hidden h-full">
            <MobileTable cards={cards} statRows={statRows} />
          </div>
        </div>
      </div>
    </div>
  )
}
