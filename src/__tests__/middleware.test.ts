/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { detectLocale } from "../middleware"

function createRequest(options: {
  url?: string
  cookies?: Record<string, string>
  headers?: Record<string, string>
}): NextRequest {
  const url = options.url ?? "http://localhost:3000/"
  const request = new NextRequest(url, {
    headers: new Headers(options.headers ?? {}),
  })

  if (options.cookies) {
    for (const [key, value] of Object.entries(options.cookies)) {
      request.cookies.set(key, value)
    }
  }

  return request
}

describe("detectLocale", () => {
  it("should return cookie locale when set", () => {
    const request = createRequest({
      cookies: { NEXT_LOCALE: "pt" },
    })
    expect(detectLocale(request)).toBe("pt")
  })

  it("should ignore invalid cookie locale", () => {
    const request = createRequest({
      cookies: { NEXT_LOCALE: "fr" },
    })
    expect(detectLocale(request)).toBe("en")
  })

  it("should detect locale from CF-IPCountry header", () => {
    const request = createRequest({
      headers: { "cf-ipcountry": "BR" },
    })
    expect(detectLocale(request)).toBe("pt")
  })

  it("should detect es from Argentine IP", () => {
    const request = createRequest({
      headers: { "cf-ipcountry": "AR" },
    })
    expect(detectLocale(request)).toBe("es")
  })

  it("should fall back to Accept-Language when no country header", () => {
    const request = createRequest({
      headers: { "accept-language": "es-AR,es;q=0.9,en;q=0.8" },
    })
    expect(detectLocale(request)).toBe("es")
  })

  it("should return default locale when no signals", () => {
    const request = createRequest({})
    expect(detectLocale(request)).toBe("en")
  })

  it("should prioritize cookie over country header", () => {
    const request = createRequest({
      cookies: { NEXT_LOCALE: "es" },
      headers: { "cf-ipcountry": "BR" },
    })
    expect(detectLocale(request)).toBe("es")
  })

  it("should prioritize country over Accept-Language", () => {
    const request = createRequest({
      headers: {
        "cf-ipcountry": "MX",
        "accept-language": "pt-BR,pt;q=0.9",
      },
    })
    expect(detectLocale(request)).toBe("es")
  })
})
