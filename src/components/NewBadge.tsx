"use client"

import { useDictionary } from "@/i18n/use-dictionary"

interface NewBadgeProps {
  readonly isRecommended: boolean
}

export default function NewBadge({ isRecommended }: NewBadgeProps) {
  const { t } = useDictionary()

  return (
    <div
      className={`absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg ${
        isRecommended
          ? "bg-gradient-to-r from-orange-500 to-amber-400"
          : "bg-gradient-to-r from-moic-blue to-moic-blue-light"
      }`}
    >
      {t.card.recentlyAdded}
    </div>
  )
}
