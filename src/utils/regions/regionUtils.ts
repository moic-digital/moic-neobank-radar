import { REGION_ALIASES } from "./regionAliases"
import { REGION_HIERARCHY } from "./regionHierarchy"
import type { HierarchyNode, ResolvedRegion } from "./regionTypes"

/**
 * Strips accents, lowercases, removes special chars (keeps spaces and hyphens),
 * collapses whitespace, and trims.
 */
export function normalizeKey(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Resolves a raw string (country name, ISO code, alias, region name)
 * to its canonical key and full hierarchy node metadata.
 * Returns null if the value cannot be resolved.
 */
export function resolveRegion(raw: string): ResolvedRegion | null {
  const normalized = normalizeKey(raw)
  if (!normalized) return null

  const canonicalKey = REGION_ALIASES[normalized]
  if (canonicalKey) {
    const node = REGION_HIERARCHY[canonicalKey]
    if (node) {
      return { key: canonicalKey, node }
    }
  }

  const underscored = normalized.replace(/[\s-]+/g, "_")
  const node = REGION_HIERARCHY[underscored]
  if (node) {
    return { key: underscored, node }
  }

  return null
}

/**
 * Returns true if the raw value matches the filterKey via:
 * 1. Direct match (same canonical key)
 * 2. Card region is a child of filter (e.g., card="Germany", filter="Europe")
 * 3. Card region is an ancestor of filter (e.g., card="LATAM", filter="Brazil")
 *
 * Examples:
 *   matchesFilter("Germany", "eea")       → true  (Germany is inside EEA)
 *   matchesFilter("LATAM", "Brazil")       → true  (Brazil is inside LATAM)
 *   matchesFilter("Europe", "France")      → true  (France is inside Europe)
 *   matchesFilter("Germany", "apac")       → false
 */
export function matchesFilter(raw: string, filterKey: string): boolean {
  const normalizedFilter = normalizeKey(filterKey)
  const resolvedFilter = REGION_ALIASES[normalizedFilter] ?? normalizedFilter.replace(/[\s-]+/g, "_")

  if (resolvedFilter === "global") return true

  const normalizedRaw = normalizeKey(raw)
  const resolvedRaw = REGION_ALIASES[normalizedRaw] ?? normalizedRaw
  if (resolvedRaw === "global" || resolvedRaw === "worldwide") return true

  const resolved = resolveRegion(raw)
  if (!resolved) return false

  if (resolved.key === resolvedFilter) return true

  // Card is a child of filter (e.g., card="Germany", filter="Europe")
  if (resolved.node.parents.includes(resolvedFilter)) return true

  // Card is an ancestor of filter (e.g., card="LATAM", filter="Brazil")
  const resolvedFilterNode = REGION_HIERARCHY[resolvedFilter]
  if (resolvedFilterNode && resolvedFilterNode.parents.includes(resolved.key)) return true

  return false
}

/**
 * Returns all direct children (country or region keys) of a given region key.
 */
export function getChildren(regionKey: string): readonly string[] {
  return Object.entries(REGION_HIERARCHY)
    .filter(([, node]) => node.parents.includes(regionKey))
    .map(([key]) => key)
}

/**
 * Returns which raw values could not be resolved to any known region or country.
 * Useful for QA logging when importing spreadsheet data.
 */
export function listUnknown(values: readonly string[]): readonly string[] {
  return values.filter((v) => resolveRegion(v) === null)
}

/**
 * Checks if a card's regions string matches a selected filter.
 * This is the main function used by the filter UI.
 *
 * The card's regions field is comma-separated (e.g., "EEA, UK, US").
 * The selectedRegion is a single filter value (e.g., "EEA", "United States", "APAC").
 *
 * Returns true if ANY of the card's region segments match the filter
 * directly or via hierarchy ancestry.
 */
export function matchesRegion(
  cardRegions: string,
  selectedRegion: string
): boolean {
  if (!selectedRegion) return true
  if (!cardRegions) return false

  const normalizedFilter = normalizeKey(selectedRegion)
  if (normalizedFilter === "global" || normalizedFilter === "worldwide") {
    return true
  }

  const segments = cardRegions.split(",").map((s) => s.trim()).filter(Boolean)

  if (segments.some((seg) => {
    const normalized = normalizeKey(seg)
    return normalized === "global" || normalized === "worldwide"
  })) {
    return true
  }

  return segments.some((segment) => matchesFilter(segment, selectedRegion))
}

/**
 * Returns all hierarchy nodes of a specific type.
 */
export function getNodesByType(
  type: HierarchyNode["type"]
): ReadonlyArray<readonly [string, HierarchyNode]> {
  return Object.entries(REGION_HIERARCHY).filter(([, node]) => node.type === type)
}
