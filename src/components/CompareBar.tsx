"use client"

import { X, ArrowRight } from "lucide-react"
import { CardData } from "@/types/card"
import CardLogo from "@/components/CardLogo"
import { useDictionary } from "@/i18n/use-dictionary"

interface CompareBarProps {
  readonly cards: readonly CardData[]
  readonly maxCards: number
  readonly onRemove: (id: string) => void
  readonly onCompare: () => void
  readonly onClear: () => void
}

export default function CompareBar({
  cards,
  maxCards,
  onRemove,
  onCompare,
  onClear,
}: CompareBarProps) {
  const { t } = useDictionary()

  if (cards.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
      <div className="mx-auto max-w-3xl px-4 pb-4">
        <div className="bg-moic-surface/95 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            {/* Selected cards */}
            <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto no-scrollbar">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 shrink-0"
                >
                  <CardLogo
                    src={card.logo}
                    alt={card.issuer}
                    issuer={card.issuer}
                    size="xs"
                  />
                  <span className="text-xs text-white font-medium truncate max-w-[80px]">
                    {card.issuer}
                  </span>
                  <button
                    onClick={() => onRemove(card.id)}
                    aria-label={`Remove ${card.issuer} from comparison`}
                    className="p-0.5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3 text-white/40" />
                  </button>
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: maxCards - cards.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-10 h-10 border border-dashed border-white/10 rounded-lg shrink-0 flex items-center justify-center"
                >
                  <span className="text-[10px] text-white/20">+</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-white/30 hidden sm:block">
                {cards.length}/{maxCards}
              </span>
              <button
                onClick={onClear}
                aria-label="Clear comparison"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>
              <button
                onClick={onCompare}
                disabled={cards.length < 2}
                className="flex items-center gap-1.5 px-4 py-2 bg-moic-blue hover:bg-moic-blue-light disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {t.compare.compare}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
