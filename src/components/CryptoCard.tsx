"use client"

import Link from "next/link"
import { Check, Flame } from "lucide-react"
import { CardData } from "@/types/card"
import { isAirdropFarming, isNewCard } from "@/utils/card"
import { formatTimeInMarketShort } from "@/utils/format-time-in-market"
import CardLogo from "@/components/CardLogo"
import NewBadge from "@/components/NewBadge"
import VerifiedBadge from "@/components/VerifiedBadge"
import { useDictionary } from "@/i18n/use-dictionary"

interface CryptoCardProps {
  readonly card: CardData
  readonly compareMode?: boolean
  readonly isSelected?: boolean
  readonly highlightRecommended?: boolean
  readonly onToggleCompare?: (id: string) => void
}

export default function CryptoCard({
  card,
  compareMode = false,
  isSelected = false,
  highlightRecommended = false,
  onToggleCompare,
}: CryptoCardProps) {
  const { t, locale } = useDictionary()
  const isNeonActive = card.recommended && highlightRecommended
  const showNew = isNewCard(card.addedDate)
  const cashbackLabel = card.cashbackMax > 0 ? `${card.cashbackMax}%` : "N/A"

  const showAirdrop = card.airdropFarming && isAirdropFarming(card.airdropFarming)

  function handleCompareClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    onToggleCompare?.(card.id)
  }

  const cardContent = (
    <div
      className={`relative bg-moic-surface border rounded-xl p-4 sm:p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
        isNeonActive
          ? "border-orange-400/60 shadow-[0_0_20px_rgba(255,140,0,0.3),0_0_40px_rgba(255,140,0,0.15)] animate-neon-pulse-orange hover:border-orange-400 hover:shadow-[0_0_28px_rgba(255,140,0,0.45),0_0_56px_rgba(255,140,0,0.2)]"
          : isSelected
            ? "border-moic-blue/60 shadow-[0_0_24px_rgba(42,96,251,0.25)] -translate-y-1"
            : "border-white/[0.08] hover:border-moic-blue/60 hover:shadow-[0_0_24px_rgba(42,96,251,0.25),0_0_48px_rgba(42,96,251,0.1)]"
      }`}
    >
      {/* New badge */}
      {showNew && <NewBadge isRecommended={!!isNeonActive} />}

      {/* Recommended fire badge */}
      {isNeonActive && (
        <div className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_12px_rgba(255,140,0,0.6)] border border-orange-400/80">
          <Flame className="w-3.5 h-3.5 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]" />
        </div>
      )}

      {/* Compare checkbox */}
      {compareMode && (
        <button
          onClick={handleCompareClick}
          aria-label={isSelected ? `Remove ${card.name} from comparison` : `Add ${card.name} to comparison`}
          aria-pressed={isSelected}
          className={`absolute top-3 right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isSelected
              ? "bg-moic-blue border-2 border-moic-blue shadow-[0_0_10px_rgba(42,96,251,0.5)] scale-110"
              : "border-2 border-white/30 hover:border-moic-blue/60 hover:scale-105 bg-white/5 backdrop-blur-sm"
          }`}
        >
          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
        </button>
      )}


      {/* Top: Logo + Name */}
      <div className="flex items-center gap-3 mb-4">
        <CardLogo
          src={card.logo}
          alt={card.issuer}
          issuer={card.issuer}
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
              {card.name}
            </h3>
            {card.isVerified && <VerifiedBadge />}
          </div>
          <p className="text-[11px] text-white/40 truncate">
            {card.issuer}
          </p>
        </div>
      </div>

      {/* Middle: 3-column stats */}
      <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-white/[0.06]">
        <div className="text-center">
          <p className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">
            {t.card.age}
          </p>
          <p className="text-xs font-semibold text-white/80">
            {formatTimeInMarketShort(card.age, t.cardDetail)}
          </p>
        </div>
        <div className="text-center border-x border-white/[0.06]">
          <p className="text-[9px] text-moic-blue uppercase tracking-wider mb-0.5">
            {t.card.maxCB}
          </p>
          <p className="text-sm font-bold text-moic-blue">
            {cashbackLabel}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">
            KYC
          </p>
          <p
            className={`text-xs font-semibold ${
              card.kyc === "None"
                ? "text-moic-green"
                : "text-amber-400"
            }`}
          >
            {card.kyc === "Required" ? t.card.kycYes : card.kyc === "Light" ? t.card.kycLight : t.card.kycNo}
          </p>
        </div>
      </div>

      {/* Bottom: Network badge */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] text-white/30 uppercase tracking-wider">
          {card.type}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/5 text-white/50 px-2 py-0.5 rounded border border-white/[0.08]">
          {card.network}
        </span>
      </div>

      {/* Airdrop tag + View details */}
      <div className={`flex items-center mt-3 ${compareMode ? "invisible" : ""}`}>
        {showAirdrop && (
          <span className="text-[9px] font-semibold uppercase tracking-wider bg-moic-green text-black px-2 py-0.5 rounded-sm">
            {t.card.airdrop}
          </span>
        )}
        <p className="text-[10px] text-white/25 group-hover:text-white/60 text-right transition-colors duration-300 ml-auto">
          {t.card.viewDetails} →
        </p>
      </div>
    </div>
  )

  if (compareMode) {
    return (
      <div className="block group" onClick={handleCompareClick}>
        {cardContent}
      </div>
    )
  }

  return (
    <Link href={`/${locale}/cards/${card.id}`} className="block group">
      {cardContent}
    </Link>
  )
}
