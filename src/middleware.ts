import { NextRequest, NextResponse } from "next/server"
import {
  LOCALES,
  DEFAULT_LOCALE,
  isValidLocale,
  localeFromCountry,
  localeFromAcceptLanguage,
} from "@/i18n/config"

const LOCALE_COOKIE = "NEXT_LOCALE"

const PUBLIC_FILE = /\.(.+)$/
const NEXT_INTERNAL = /^\/_next/
const API_ROUTE = /^\/api\//

function shouldSkip(pathname: string): boolean {
  return (
    PUBLIC_FILE.test(pathname) ||
    NEXT_INTERNAL.test(pathname) ||
    API_ROUTE.test(pathname) ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  )
}

function pathnameHasLocale(pathname: string): boolean {
  return LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
}

export function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale
  }

  const country = request.headers.get("cf-ipcountry") ?? ""
  const countryLocale = localeFromCountry(country)
  if (countryLocale) {
    return countryLocale
  }

  const acceptLanguage = request.headers.get("accept-language") ?? ""
  const langLocale = localeFromAcceptLanguage(acceptLanguage)
  if (langLocale) {
    return langLocale
  }

  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (shouldSkip(pathname)) {
    return NextResponse.next()
  }

  if (pathnameHasLocale(pathname)) {
    return NextResponse.next()
  }

  const locale = detectLocale(request)

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|logos|.*\\..*).*)"],
}
