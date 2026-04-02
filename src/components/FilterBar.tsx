"use client"

import {
  Search,
  X,
  Globe,
  DollarSign,
  Shield,
  KeyRound,
  ArrowDownAZ,
  Sparkles,
  Flame,
} from "lucide-react"
import { Filters, SortOption } from "@/types/card"
import FilterDropdown from "@/components/FilterDropdown"
import { useDictionary } from "@/i18n/use-dictionary"
import { interpolate } from "@/i18n/interpolate"

const REGION_ITEMS = [
  { value: "Global", label: "Global" },
  {
    groupLabel: "Americas",
    groupValue: "Americas",
    options: [
      { value: "United States", label: "US" },
      { value: "Canada", label: "Canada" },
      { value: "Brazil", label: "Brazil" },
      { value: "Argentina", label: "Argentina" },
      { value: "Mexico", label: "Mexico" },
      { value: "LATAM", label: "LATAM" },
    ],
  },
  {
    groupLabel: "Europe",
    groupValue: "Europe",
    options: [
      { value: "United Kingdom", label: "UK" },
      { value: "Germany", label: "Germany" },
      { value: "France", label: "France" },
      { value: "EEA", label: "EEA" },
    ],
  },
  {
    groupLabel: "Asia Pacific",
    groupValue: "APAC",
    options: [
      { value: "India", label: "India" },
      { value: "Japan", label: "Japan" },
      { value: "Singapore", label: "Singapore" },
      { value: "Australia", label: "Australia" },
      { value: "South Korea", label: "South Korea" },
    ],
  },
  {
    groupLabel: "Middle East & Africa",
    groupValue: "Middle East & Africa",
    options: [
      { value: "Nigeria", label: "Nigeria" },
      { value: "UAE", label: "UAE" },
      { value: "South Africa", label: "South Africa" },
      { value: "Middle East", label: "Middle East" },
    ],
  },
] as const

const CURRENCY_ITEMS = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "INR", label: "INR" },
  { value: "BRL", label: "BRL (R$)" },
] as const

interface FilterBarProps {
  readonly filters: Filters
  readonly sort: SortOption
  readonly onFilterChange: (filters: Filters) => void
  readonly onSortChange: (sort: SortOption) => void
  readonly resultsCount: number
}

type TriState = "none" | "with" | "without"

const SELF_CUSTODY_VALUES = ["Self-Custody", "Non-Custodial"]
const CUSTODIAL_VALUES = ["Custodial", "Hybrid"]

function getTriStateClasses(state: TriState): string {
  if (state === "with") {
    return "bg-moic-blue/15 border-moic-blue text-white shadow-[0_0_12px_rgba(42,96,251,0.15)]"
  }
  if (state === "without") {
    return "bg-amber-500/10 border-amber-500/50 text-white shadow-[0_0_12px_rgba(245,158,11,0.1)]"
  }
  return "bg-white/5 border-white/10 text-white hover:border-white/20"
}

function getTriStateIconClasses(state: TriState): string {
  if (state === "with") return "text-moic-blue"
  if (state === "without") return "text-amber-400"
  return "text-moic-blue"
}

const TRI_STATES: readonly TriState[] = ["none", "with", "without"]

function getDotColor(dotState: TriState, activeState: TriState): string {
  if (dotState !== activeState) return "bg-white/20"
  if (activeState === "with") return "bg-moic-blue"
  if (activeState === "without") return "bg-amber-400"
  return "bg-white/50"
}

function TriStateDots({ state }: { readonly state: TriState }) {
  return (
    <div className="flex items-center gap-1">
      {TRI_STATES.map((s) => (
        <span
          key={s}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${getDotColor(s, state)}`}
        />
      ))}
    </div>
  )
}

export default function FilterBar({
  filters,
  sort,
  onFilterChange,
  onSortChange,
  resultsCount,
}: FilterBarProps) {
  const { t } = useDictionary()

  const sortItems = [
    { value: "nameAZ", label: t.filter.sortAZ },
    { value: "featured", label: t.filter.sortAll },
    { value: "cashbackHigh", label: t.filter.sortTopCashback },
    { value: "newest", label: t.filter.sortNewest },
  ] as const

  const hasActiveFilters =
    filters.region !== "" ||
    filters.kyc !== "" ||
    filters.currency !== "" ||
    filters.custody.length > 0 ||
    filters.airdrop !== ""

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    onFilterChange({ ...filters, search: e.target.value })
  }

  function getKycState(): TriState {
    if (filters.kyc === "") return "none"
    if (filters.kyc === "required") return "with"
    return "without"
  }

  function getSelfCustodyState(): TriState {
    if (filters.custody.length === 0) return "none"
    if (SELF_CUSTODY_VALUES.some((v) => filters.custody.includes(v))) return "with"
    return "without"
  }

  function cycleKyc() {
    const state = getKycState()
    const newKyc = state === "none" ? "required" : state === "with" ? "None" : ""
    onFilterChange({ ...filters, kyc: newKyc })
  }

  function cycleSelfCustody() {
    const state = getSelfCustodyState()
    const newCustody =
      state === "none"
        ? [...SELF_CUSTODY_VALUES]
        : state === "with"
          ? [...CUSTODIAL_VALUES]
          : []
    onFilterChange({ ...filters, custody: newCustody })
  }

  function getAirdropState(): TriState {
    if (filters.airdrop === "") return "none"
    if (filters.airdrop === "with") return "with"
    return "without"
  }

  function cycleAirdrop() {
    const state = getAirdropState()
    const newAirdrop = state === "none" ? "with" : state === "with" ? "without" : ""
    onFilterChange({ ...filters, airdrop: newAirdrop })
  }

  function clearFilters() {
    onFilterChange({
      search: filters.search,
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
    })
  }

  const kycState = getKycState()
  const selfCustodyState = getSelfCustodyState()
  const airdropState = getAirdropState()

  return (
    <div className="w-full mb-6 sm:mb-8 py-4 sm:py-6 space-y-4">
      {/* Row 1: Recommended Switch + Search */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide border rounded-xl whitespace-nowrap bg-gradient-to-r from-orange-600 to-amber-500 border-orange-400/60 text-white shadow-[0_0_20px_rgba(251,146,60,0.4),0_0_40px_rgba(251,146,60,0.15)]">
          <Flame className="w-4 h-4 shrink-0 text-white" />
          <span>{t.filter.ourPicks}</span>
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white/30" />
          </div>
          <input
            type="text"
            placeholder={t.filter.searchPlaceholder}
            className="block w-full pl-11 sm:pl-13 pr-4 py-3.5 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-moic-blue focus:shadow-[0_0_12px_rgba(42,96,251,0.2)] text-sm sm:text-base tracking-wide transition-all"
            value={filters.search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Row 2: KYC + Self-Custody + Airdrop (prominent tri-state) + other filters */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {/* KYC tri-state */}
        <button
          onClick={cycleKyc}
          className={`flex items-center justify-center gap-2 px-3 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide transition-all border rounded-xl cursor-pointer ${getTriStateClasses(kycState)}`}
        >
          <Shield className={`w-4 h-4 shrink-0 ${getTriStateIconClasses(kycState)}`} />
          <span>
            {kycState === "none" && t.filter.kyc}
            {kycState === "with" && t.filter.withKyc}
            {kycState === "without" && t.filter.noKyc}
          </span>
          <TriStateDots state={kycState} />
        </button>

        {/* Self-Custody tri-state */}
        <button
          onClick={cycleSelfCustody}
          className={`flex items-center justify-center gap-2 px-3 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide transition-all border rounded-xl cursor-pointer ${getTriStateClasses(selfCustodyState)}`}
        >
          <KeyRound className={`w-4 h-4 shrink-0 ${getTriStateIconClasses(selfCustodyState)}`} />
          <span>
            {selfCustodyState === "none" && t.filter.custody}
            {selfCustodyState === "with" && t.filter.selfCustody}
            {selfCustodyState === "without" && t.filter.custodial}
          </span>
          <TriStateDots state={selfCustodyState} />
        </button>

        {/* Airdrop tri-state */}
        <button
          onClick={cycleAirdrop}
          className={`flex items-center justify-center gap-2 px-3 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide transition-all border rounded-xl cursor-pointer ${getTriStateClasses(airdropState)}`}
        >
          <Sparkles className={`w-4 h-4 shrink-0 ${getTriStateIconClasses(airdropState)}`} />
          <span>
            {airdropState === "none" && t.filter.airdrop}
            {airdropState === "with" && t.filter.withAirdrop}
            {airdropState === "without" && t.filter.noAirdrop}
          </span>
          <TriStateDots state={airdropState} />
        </button>

        {/* Region */}
        <FilterDropdown
          icon={<Globe className="w-4 h-4 text-moic-blue shrink-0" />}
          value={filters.region}
          placeholder={t.filter.region}
          resetLabel={t.filter.noFilter}
          items={REGION_ITEMS}
          onChange={(val) => onFilterChange({ ...filters, region: val })}
          scrollHint
        />

        {/* Currency */}
        <FilterDropdown
          icon={<DollarSign className="w-4 h-4 text-moic-blue shrink-0" />}
          value={filters.currency}
          placeholder={t.filter.currency}
          items={CURRENCY_ITEMS}
          onChange={(val) => onFilterChange({ ...filters, currency: val })}
        />

        {/* Sort */}
        <FilterDropdown
          icon={<ArrowDownAZ className="w-4 h-4 text-moic-blue shrink-0" />}
          value={sort}
          placeholder={t.filter.sort}
          items={sortItems}
          onChange={(val) => onSortChange(val as SortOption)}
        />
      </div>

      {/* Row 3: Results count + clear */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-[11px] text-white/30">
          {hasActiveFilters
            ? interpolate(t.filter.filtered, { count: resultsCount })
            : interpolate(t.filter.showingAll, { count: resultsCount })}
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-medium text-white/50 hover:text-moic-blue transition-colors"
          >
            <X className="w-3 h-3" />
            {t.filter.clear}
          </button>
        )}
      </div>
    </div>
  )
}
