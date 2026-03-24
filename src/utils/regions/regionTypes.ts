export type RegionNodeType = "super_region" | "region" | "sub_region" | "country"

export interface CountryNode {
  readonly label: string
  readonly type: "country"
  readonly isoAlpha2: string
  readonly isoAlpha3: string
  readonly parents: readonly string[]
}

export interface RegionNode {
  readonly label: string
  readonly type: "super_region" | "region" | "sub_region"
  readonly parents: readonly string[]
}

export type HierarchyNode = CountryNode | RegionNode

export interface ResolvedRegion {
  readonly key: string
  readonly node: HierarchyNode
}

export function isCountryNode(node: HierarchyNode): node is CountryNode {
  return node.type === "country"
}
