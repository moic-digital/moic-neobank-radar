"use client"

import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/config"
import { useDictionary } from "@/i18n/use-dictionary"

export default function LanguageSwitcher() {
  const { locale } = useDictionary()
  const pathname = usePathname()
  const router = useRouter()

  const handleChange = useCallback(
    (newLocale: Locale) => {
      const segments = pathname.split("/")
      segments[1] = newLocale
      const newPath = segments.join("/")

      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`
      router.push(newPath)
    },
    [pathname, router]
  )

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-xs text-white/60 hover:text-white/80 cursor-pointer"
        aria-label="Change language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="uppercase font-medium">{locale}</span>
      </button>
      <div className="absolute right-0 top-full mt-1 min-w-[120px] bg-moic-surface border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {LOCALES.map((l) => (
          <button
            key={l}
            onClick={() => handleChange(l)}
            className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer first:rounded-t-lg last:rounded-b-lg ${
              l === locale
                ? "text-moic-blue bg-moic-blue/10"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {LOCALE_NAMES[l]}
          </button>
        ))}
      </div>
    </div>
  )
}
