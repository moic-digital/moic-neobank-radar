"use client"

import { useContext } from "react"
import { DictionaryContext } from "./DictionaryProvider"
import type { Dictionary } from "./types"
import type { Locale } from "./config"

interface UseDictionaryReturn {
  readonly t: Dictionary
  readonly locale: Locale
}

export function useDictionary(): UseDictionaryReturn {
  const context = useContext(DictionaryContext)
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider")
  }
  return context
}
