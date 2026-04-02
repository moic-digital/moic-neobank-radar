"use client"

import { createContext } from "react"
import type { Locale } from "./config"
import type { Dictionary } from "./types"

interface DictionaryContextValue {
  readonly t: Dictionary
  readonly locale: Locale
}

export const DictionaryContext = createContext<DictionaryContextValue | null>(null)

interface DictionaryProviderProps {
  readonly dictionary: Dictionary
  readonly locale: Locale
  readonly children: React.ReactNode
}

export default function DictionaryProvider({
  dictionary,
  locale,
  children,
}: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={{ t: dictionary, locale }}>
      {children}
    </DictionaryContext.Provider>
  )
}
