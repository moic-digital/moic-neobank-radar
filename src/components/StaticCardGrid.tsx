import Link from "next/link"
import { CardData } from "@/types/card"
import { isAirdropFarming } from "@/utils/card"

interface StaticCardGridProps {
  readonly cards: readonly CardData[]
  readonly locale: string
}

function StaticCard({
  card,
  locale,
}: {
  readonly card: CardData
  readonly locale: string
}) {
  const cashbackLabel = card.cashbackMax > 0 ? `${card.cashbackMax}%` : "N/A"
  const showAirdrop =
    card.airdropFarming && isAirdropFarming(card.airdropFarming)
  const kycLabel =
    card.kyc === "Required"
      ? "Yes"
      : card.kyc === "Light"
        ? "Light"
        : "No"

  return (
    <Link
      href={`/${locale}/cards/${card.id}`}
      className="block group"
    >
      <div className="relative bg-moic-surface border border-white/[0.08] rounded-xl p-4 sm:p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-moic-blue/60 hover:shadow-[0_0_24px_rgba(42,96,251,0.25),0_0_48px_rgba(42,96,251,0.1)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
            {card.logo ? (
              <img
                src={card.logo}
                alt={card.issuer}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-xs font-bold text-white/60 uppercase flex items-center justify-center w-full h-full">
                {card.issuer.slice(0, 2)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
              {card.name}
            </h3>
            <p className="text-[11px] text-white/40 truncate">
              {card.issuer}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-white/[0.06]">
          <div className="text-center">
            <p className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">
              Age
            </p>
            <p className="text-xs font-semibold text-white/80">
              {card.age
                ? `${new Date().getFullYear() - parseInt(card.age)} yr`
                : "N/A"}
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
                card.kyc === "None" ? "text-moic-green" : "text-amber-400"
              }`}
            >
              {kycLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] text-white/30 uppercase tracking-wider">
            {card.type}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/5 text-white/50 px-2 py-0.5 rounded border border-white/[0.08]">
            {card.network}
          </span>
        </div>

        <div className="flex items-center mt-3">
          {showAirdrop && (
            <span className="text-[9px] font-semibold uppercase tracking-wider bg-moic-green text-black px-2 py-0.5 rounded-sm">
              Airdrop
            </span>
          )}
          <p className="text-[10px] text-white/25 group-hover:text-white/60 text-right transition-colors duration-300 ml-auto">
            View details →
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function StaticCardGrid({
  cards,
  locale,
}: StaticCardGridProps) {
  const sortedCards = [...cards].sort((a, b) => {
    const aRec = a.recommended ? 0 : 1
    const bRec = b.recommended ? 0 : 1
    if (aRec !== bRec) return aRec - bRec
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="min-h-screen bg-moic-navy selection:bg-moic-blue selection:text-white">
      <main id="cards" className="px-4 sm:px-6 md:px-8 py-12 bg-moic-navy">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {sortedCards.map((card) => (
            <StaticCard key={card.id} card={card} locale={locale} />
          ))}
        </div>
      </main>
    </div>
  )
}
