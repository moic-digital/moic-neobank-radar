import { NextResponse } from "next/server"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  contactName: 200,
  email: 320,
  telegram: 100,
  message: 5000,
} as const

const ALLOWED_FIELDS = new Set<string>([
  "contactName",
  "email",
  "telegram",
  "message",
])

interface SubmissionPayload {
  readonly contactName: string
  readonly email: string
  readonly telegram: string
  readonly message: string
}

type ValidationResult =
  | { readonly ok: true; readonly value: SubmissionPayload }
  | { readonly ok: false; readonly error: string }

function validate(input: unknown): ValidationResult {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Invalid payload" }
  }

  const record = input as Record<string, unknown>

  for (const key of Object.keys(record)) {
    if (!ALLOWED_FIELDS.has(key)) {
      return { ok: false, error: `Unexpected field: ${key}` }
    }
  }

  const contactName = record.contactName
  const email = record.email
  const telegram = record.telegram ?? ""
  const message = record.message

  if (typeof contactName !== "string" || contactName.trim() === "") {
    return { ok: false, error: "Name is required" }
  }
  if (contactName.length > LIMITS.contactName) {
    return { ok: false, error: "Name is too long" }
  }

  if (typeof email !== "string" || email.trim() === "") {
    return { ok: false, error: "Email is required" }
  }
  if (email.length > LIMITS.email || !EMAIL_REGEX.test(email.trim())) {
    return { ok: false, error: "Invalid email" }
  }

  if (typeof telegram !== "string") {
    return { ok: false, error: "Invalid telegram" }
  }
  if (telegram.length > LIMITS.telegram) {
    return { ok: false, error: "Telegram is too long" }
  }

  if (typeof message !== "string" || message.trim() === "") {
    return { ok: false, error: "Message is required" }
  }
  if (message.length > LIMITS.message) {
    return { ok: false, error: "Message is too long" }
  }

  return {
    ok: true,
    value: {
      contactName: contactName.trim(),
      email: email.trim(),
      telegram: telegram.trim(),
      message: message.trim(),
    },
  }
}

export async function POST(request: Request) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("MAKE_WEBHOOK_URL is not configured")
    return NextResponse.json(
      { error: "Service not configured" },
      { status: 500 }
    )
  }

  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    )
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const result = validate(raw)
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.value),
    })

    if (!response.ok) {
      console.error(`Make webhook responded with ${response.status}`)
      return NextResponse.json(
        { error: "Upstream submission failed" },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Failed to forward submission:", error)
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    )
  }
}
