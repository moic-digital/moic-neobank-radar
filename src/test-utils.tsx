import { render, type RenderOptions } from "@testing-library/react"
import DictionaryProvider from "@/i18n/DictionaryProvider"
import en from "@/i18n/dictionaries/en.json"
import type { Dictionary } from "@/i18n/types"

function Providers({ children }: { readonly children: React.ReactNode }) {
  return (
    <DictionaryProvider dictionary={en as Dictionary} locale="en">
      {children}
    </DictionaryProvider>
  )
}

function renderWithI18n(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: Providers, ...options })
}

export { renderWithI18n }
