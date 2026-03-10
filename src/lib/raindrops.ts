import { cardLogos } from "@/data/logos"

export const RAIN_DURATION = 18
const RAIN_DISTANCE = 700
const COLUMN_COUNT = 10
const LOGO_SIZE = 44
const GAP = 4
const SPEED = RAIN_DISTANCE / RAIN_DURATION

export interface ColumnLogo {
  readonly src: string
  readonly size: number
  readonly delay: number
}

export interface RainColumn {
  readonly logos: readonly ColumnLogo[]
  readonly initialDelay: number
  readonly direction: "down" | "up"
}

function seededRng(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function lerp(min: number, max: number, t: number): number {
  return min + (max - min) * t
}

const ALL_LOGO_SRCS: readonly string[] = Object.values(cardLogos)

function seededShuffle(arr: readonly string[], rng: () => number): string[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

function generateColumn(rng: () => number): readonly ColumnLogo[] {
  const logos: ColumnLogo[] = []
  let cumulativeDelay = 0
  const timePerLogo = (LOGO_SIZE + GAP) / SPEED

  let shuffled = seededShuffle(ALL_LOGO_SRCS, rng)
  let cursor = 0

  while (cumulativeDelay + timePerLogo < RAIN_DURATION) {
    if (cursor >= shuffled.length) {
      shuffled = seededShuffle(ALL_LOGO_SRCS, rng)
      cursor = 0
    }

    logos.push({
      src: shuffled[cursor],
      size: LOGO_SIZE,
      delay: parseFloat(cumulativeDelay.toFixed(1)),
    })

    cursor += 1
    cumulativeDelay += timePerLogo
  }

  return logos
}

export function generateRainColumns(seed: number): readonly RainColumn[] {
  const rng = seededRng(seed)

  return Array.from({ length: COLUMN_COUNT }, (_, i) => ({
    logos: generateColumn(rng),
    initialDelay: parseFloat(lerp(0, 3, rng()).toFixed(1)),
    direction: (i % 2 === 0 ? "down" : "up") as "down" | "up",
  }))
}
