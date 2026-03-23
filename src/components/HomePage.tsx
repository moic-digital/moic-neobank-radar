"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Scale } from "lucide-react"
import { Filters, SortOption, CardData } from "@/types/card"
import { matchesRegion } from "@/utils/regions"
import HeroSection from "@/components/HeroSection"
import CryptoCard from "@/components/CryptoCard"
import FilterBar from "@/components/FilterBar"
import CompareBar from "@/components/CompareBar"
import CompareDrawer from "@/components/CompareDrawer"
import FaqSection from "@/components/FaqSection"
import Footer from "@/components/Footer"
import { FAQ_CATEGORIES } from "@/data/faq"

interface HomePageProps {
  readonly cards: readonly CardData[]
}

const DEFAULT_FILTERS: Filters = {
  search: "",
  cardType: [],
  network: [],
  custody: [],
  minCashback: 0,
  annualFee: "all",
  fxFee: "all",
  region: "",
  kyc: "",
  currency: "",
  airdrop: "",
}

const MAX_COMPARE = 4

export default function HomePage({ cards }: HomePageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [sort, setSort] = useState<SortOption>("nameAZ")
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Hydrate compare state from URL on mount (intentionally run once)
  useEffect(() => {
    const compareParam = searchParams.get("compare")
    if (compareParam) {
      const cardIdSet = new Set(cards.map((c) => c.id))
      const ids = compareParam.split(",").filter((id) => cardIdSet.has(id))
      if (ids.length >= 2) {
        setSelectedIds(ids)
        setCompareMode(true)
        setDrawerOpen(true)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filteredCards = useMemo(() => {
    const result = cards.filter((card) => {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        card.name.toLowerCase().includes(searchLower) ||
        card.issuer.toLowerCase().includes(searchLower) ||
        card.perks.some((p) => p.toLowerCase().includes(searchLower))

      const matchesNetwork =
        filters.network.length === 0 ||
        filters.network.includes(card.network)

      const matchesCustody =
        filters.custody.length === 0 ||
        filters.custody.includes(card.custody)

      const matchesCashback =
        typeof card.cashbackMax === "number"
          ? card.cashbackMax >= filters.minCashback
          : filters.minCashback === 0

      const matchesRegionFilter = matchesRegion(card.regions, filters.region)

      const matchesKyc =
        filters.kyc === ""
          ? true
          : filters.kyc === "required"
            ? card.kyc === "Required" || card.kyc === "Light"
            : card.kyc === "None"

      const matchesCurrency =
        filters.currency === "" ||
        card.supportedCurrencies.includes(filters.currency) ||
        card.supportedCurrencies.includes("Global")

      const matchesAirdrop =
        filters.airdrop === ""
          ? true
          : filters.airdrop === "with"
            ? card.airdropFarming.toLowerCase() === "true"
            : card.airdropFarming.toLowerCase() !== "true"

      return (
        matchesSearch &&
        matchesNetwork &&
        matchesCustody &&
        matchesCashback &&
        matchesRegionFilter &&
        matchesKyc &&
        matchesCurrency &&
        matchesAirdrop
      )
    })

    return [...result].sort((a, b) => {
      if (sort === "featured") {
        return (a.rank ?? 999) - (b.rank ?? 999)
      }
      if (sort === "cashbackHigh") {
        const aVal = typeof a.cashbackMax === "number" ? a.cashbackMax : 0
        const bVal = typeof b.cashbackMax === "number" ? b.cashbackMax : 0
        return bVal - aVal
      }
      if (sort === "nameAZ") {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
  }, [cards, filters, sort])

  const selectedCards = useMemo(
    () => cards.filter((c) => selectedIds.includes(c.id)),
    [cards, selectedIds]
  )

  const toggleCompare = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((x) => x !== id)
        }
        if (prev.length >= MAX_COMPARE) return prev
        return [...prev, id]
      })
    },
    []
  )

  function updateCompareUrl(ids: readonly string[]) {
    if (ids.length >= 2) {
      router.replace(`?compare=${ids.join(",")}`, { scroll: false })
    } else {
      router.replace("/", { scroll: false })
    }
  }

  function handleOpenDrawer() {
    setDrawerOpen(true)
    updateCompareUrl(selectedIds)
  }

  function handleCloseDrawer() {
    setDrawerOpen(false)
    router.replace("/", { scroll: false })
  }

  function handleExitCompareMode() {
    setCompareMode(false)
    setSelectedIds([])
    setDrawerOpen(false)
    router.replace("/", { scroll: false })
  }

  function handleRemoveFromCompare(id: string) {
    const newIds = selectedIds.filter((x) => x !== id)
    setSelectedIds(newIds)
    if (newIds.length < 2 && drawerOpen) {
      setDrawerOpen(false)
      router.replace("/", { scroll: false })
    } else if (drawerOpen) {
      updateCompareUrl(newIds)
    }
  }

  return (
    <div id="top" className="min-h-screen bg-moic-navy selection:bg-moic-blue selection:text-white">
      <HeroSection />

      <main className="px-4 sm:px-6 md:px-8 pb-12 bg-moic-navy">
        <FilterBar
          filters={filters}
          sort={sort}
          onFilterChange={setFilters}
          onSortChange={setSort}
          resultsCount={filteredCards.length}
        />

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 ${compareMode && selectedIds.length > 0 ? "pb-24" : ""}`}>
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <CryptoCard
                key={card.id}
                card={card}
                compareMode={compareMode}
                isSelected={selectedIds.includes(card.id)}
                onToggleCompare={toggleCompare}
              />
            ))
          ) : (
            <div className="col-span-full py-12 sm:py-20 text-center border border-white/10 rounded-xl">
              <p className="text-white/50 text-sm sm:text-base">
                No cards match your filters
              </p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="mt-4 text-moic-blue font-semibold hover:underline text-sm sm:text-base"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* FAB — Compare toggle */}
      <button
        onClick={() => {
          if (compareMode) {
            handleExitCompareMode()
          } else {
            setCompareMode(true)
          }
        }}
        className={`fixed bottom-6 right-6 z-30 p-3.5 rounded-full shadow-lg transition-all cursor-pointer ${
          compareMode
            ? "bg-moic-blue text-white shadow-[0_0_20px_rgba(42,96,251,0.4)]"
            : "bg-moic-surface/90 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white hover:border-white/20"
        } ${selectedIds.length > 0 ? "bottom-24 sm:bottom-28" : ""}`}
        aria-label={compareMode ? "Exit compare mode" : "Compare cards"}
      >
        <Scale className="w-5 h-5" />
      </button>

      {/* Compare bottom bar */}
      {compareMode && (
        <CompareBar
          cards={selectedCards}
          maxCards={MAX_COMPARE}
          onRemove={handleRemoveFromCompare}
          onCompare={handleOpenDrawer}
          onClear={handleExitCompareMode}
        />
      )}

      {/* Compare drawer */}
      {drawerOpen && selectedCards.length >= 2 && (
        <CompareDrawer
          cards={selectedCards}
          onClose={handleCloseDrawer}
        />
      )}

      <FaqSection categories={FAQ_CATEGORIES} />

      <Footer />
    </div>
  )
}
