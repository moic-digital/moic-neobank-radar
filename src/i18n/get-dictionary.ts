import type { Locale } from "./config"
import type { Dictionary } from "./types"

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
}

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
