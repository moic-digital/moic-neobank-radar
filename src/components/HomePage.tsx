"use client"

import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Scale } from "lucide-react"
import { Filters, SortOption, CardData } from "@/types/card"
import { matchesRegion } from "@/utils/regions/regionUtils"
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
  const [heroVisible, setHeroVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    function handleScroll() {
      const el = heroRef.current
      if (!el) return
      setHeroVisible(el.getBoundingClientRect().bottom > 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

      const matchesCashback = card.cashbackMax >= filters.minCashback

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
      const aRec = a.recommended ? 0 : 1
      const bRec = b.recommended ? 0 : 1
      if (aRec !== bRec) return aRec - bRec

      if (sort === "featured") {
        return (a.rank ?? 999) - (b.rank ?? 999)
      }
      if (sort === "cashbackHigh") {
        const aVal = a.cashbackMax
        const bVal = b.cashbackMax
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
      <div ref={heroRef}>
        <HeroSection onCompare={() => {
          setCompareMode(true)
          document.getElementById("cards")?.scrollIntoView({ behavior: "smooth" })
        }} />
      </div>

      <main id="cards" className="px-4 sm:px-6 md:px-8 pb-12 bg-moic-navy">
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
                highlightRecommended
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

      {/* FAB — Compare toggle (slides in from right when hero is out of view) */}
      <button
        onClick={() => {
          if (compareMode) {
            handleExitCompareMode()
          } else {
            setCompareMode(true)
          }
        }}
        className={`fixed right-6 bottom-6 z-30 h-12 rounded-full shadow-lg cursor-pointer bg-moic-blue text-white hover:bg-moic-blue/90 flex items-center justify-center overflow-hidden ${
          compareMode
            ? "w-12 px-0 gap-0 shadow-[0_0_20px_rgba(42,96,251,0.4)]"
            : "w-[140px] px-4 gap-2"
        }`}
        style={{
          transform: heroVisible ? "translateX(calc(100% + 24px))" : "translateX(0)",
          transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1), width 500ms cubic-bezier(0.4, 0, 0.2, 1), padding 500ms cubic-bezier(0.4, 0, 0.2, 1), gap 500ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        aria-label={compareMode ? "Exit compare mode" : "Compare cards"}
      >
        <Scale className="w-5 h-5 shrink-0" />
        <span className={`text-sm font-medium whitespace-nowrap transition-[max-width,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          compareMode ? "max-w-0 opacity-0" : "max-w-24 opacity-100"
        }`}>
          Compare
        </span>
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
