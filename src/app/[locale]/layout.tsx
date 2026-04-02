import { notFound } from "next/navigation"
import { LOCALES, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import DictionaryProvider from "@/i18n/DictionaryProvider"
import CookieConsentProvider from "@/components/CookieConsentProvider"

interface LocaleLayoutProps {
  readonly children: React.ReactNode
  readonly params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!LOCALES.includes(locale as Locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as Locale)

  return (
    <DictionaryProvider dictionary={dictionary} locale={locale as Locale}>
      <CookieConsentProvider>
        {children}
      </CookieConsentProvider>
    </DictionaryProvider>
  )
}
