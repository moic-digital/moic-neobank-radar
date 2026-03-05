import { cardLogos } from "@/data/logos"

export const RAIN_DURATION = 18
const RAIN_DISTANCE = 700
const COLUMN_COUNT = 10
const LOGO_GAP_PX = 10
const EXTRA_DELAY_MIN = 0.2
const EXTRA_DELAY_MAX = 1.0
const SPEED = RAIN_DISTANCE / RAIN_DURATION
const SIZE_MIN = 36
const SIZE_MAX = 50

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

function generateColumn(rng: () => number): readonly ColumnLogo[] {
  const logos: ColumnLogo[] = []
  let cumulativeDelay = 0
  const maxSizeTime = (SIZE_MAX + LOGO_GAP_PX) / SPEED

  while (cumulativeDelay + maxSizeTime < RAIN_DURATION) {
    const logoIndex = Math.floor(rng() * ALL_LOGO_SRCS.length)
    const size = Math.round(lerp(SIZE_MIN, SIZE_MAX, rng()))
    const extraDelay = lerp(EXTRA_DELAY_MIN, EXTRA_DELAY_MAX, rng())
    const minTimeToPass = (size + LOGO_GAP_PX) / SPEED

    logos.push({
      src: ALL_LOGO_SRCS[logoIndex],
      size,
      delay: parseFloat(cumulativeDelay.toFixed(1)),
    })

    cumulativeDelay += minTimeToPass + extraDelay
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
