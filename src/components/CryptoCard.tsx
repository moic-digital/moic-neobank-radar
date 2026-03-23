import Link from "next/link"
import { Check } from "lucide-react"
import { CardData } from "@/types/card"
import { isAirdropFarming } from "@/utils/card"
import CardLogo from "@/components/CardLogo"

interface CryptoCardProps {
  readonly card: CardData
  readonly compareMode?: boolean
  readonly isSelected?: boolean
  readonly onToggleCompare?: (id: string) => void
}

export default function CryptoCard({
  card,
  compareMode = false,
  isSelected = false,
  onToggleCompare,
}: CryptoCardProps) {
  const cashbackLabel =
    typeof card.cashbackMax === "number"
      ? `${card.cashbackMax}%`
      : card.cashbackMax || "N/A"

  const showAirdrop = card.airdropFarming && isAirdropFarming(card.airdropFarming)

  function handleCompareClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    onToggleCompare?.(card.id)
  }

  const cardContent = (
    <div
      className={`relative bg-moic-surface border rounded-xl p-4 sm:p-5 hover:-translate-y-1 hover:border-moic-blue/60 hover:shadow-[0_0_24px_rgba(42,96,251,0.25),0_0_48px_rgba(42,96,251,0.1)] transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-moic-blue/60 shadow-[0_0_24px_rgba(42,96,251,0.25)] -translate-y-1"
          : "border-white/[0.08]"
      }`}
    >
      {/* Compare checkbox */}
      {compareMode && (
        <button
          onClick={handleCompareClick}
          aria-label={isSelected ? `Remove ${card.name} from comparison` : `Add ${card.name} to comparison`}
          aria-pressed={isSelected}
          className={`absolute top-3 left-3 z-10 w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
            isSelected
              ? "bg-moic-blue border-moic-blue"
              : "border-white/30 hover:border-moic-blue/60 bg-white/5"
          }`}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </button>
      )}

      {showAirdrop && (
        <span className="absolute top-3 right-3 text-[9px] font-semibold uppercase tracking-wider bg-moic-green text-black px-2 py-0.5 rounded-sm">
          Airdrop
        </span>
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
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
            {card.name}
          </h3>
          <p className="text-[11px] text-white/40 truncate">
            {card.issuer}
          </p>
        </div>
      </div>

      {/* Middle: 3-column stats */}
      <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-white/[0.06]">
        <div className="text-center">
          <p className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">
            Age
          </p>
          <p className="text-xs font-semibold text-white/80">
            {card.age || "N/A"}
          </p>
        </div>
        <div className="text-center border-x border-white/[0.06]">
          <p className="text-[9px] text-moic-blue uppercase tracking-wider mb-0.5">
            Max CB
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
              card.kyc === "Required"
                ? "text-amber-400"
                : "text-moic-green"
            }`}
          >
            {card.kyc === "Required" ? "YES" : "NO"}
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

      {/* View details — always visible, brighter on hover */}
      {!compareMode && (
        <p className="text-[10px] text-white/25 group-hover:text-white/60 mt-3 text-right transition-colors duration-300">
          View details →
        </p>
      )}
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
    <Link href={`/cards/${card.id}`} className="block group">
      {cardContent}
    </Link>
  )
}
