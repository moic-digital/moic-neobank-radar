"use client"

import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LOCALES, LOCALE_FLAGS, type Locale } from "@/i18n/config"
import { useDictionary } from "@/i18n/use-dictionary"

export default function LanguageSwitcher() {
  const { locale } = useDictionary()
  const pathname = usePathname()
  const router = useRouter()

  const handleChange = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return
      const segments = pathname.split("/")
      segments[1] = newLocale
      const newPath = segments.join("/")

      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`
      router.push(newPath)
    },
    [pathname, router, locale]
  )

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => handleChange(l)}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            l === locale
              ? "bg-white/10 text-white border border-white/20"
              : "text-white/40 hover:text-white/70 hover:bg-white/5"
          }`}
          aria-label={`Switch to ${l}`}
        >
          <span className="text-sm">{LOCALE_FLAGS[l]}</span>
          <span className="uppercase">{l}</span>
        </button>
      ))}
    </div>
  )
}
