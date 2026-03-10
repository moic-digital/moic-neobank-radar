"use client"

import { useMemo } from "react"
import { cardLogos } from "@/data/logos"

interface LogoRainProps {
  readonly seed: number
}

const ALL_LOGOS = Object.values(cardLogos)
const COLUMN_COUNT = 10

const COLUMN_VISIBILITY: readonly string[] = [
  "",
  "",
  "",
  "hidden lg:block",
  "hidden lg:block",
  "hidden xl:block",
  "hidden xl:block",
  "hidden 2xl:block",
  "hidden 2xl:block",
  "hidden 2xl:block",
]

const SCROLL_SPEEDS: readonly string[] = [
  "70s", "80s", "76s", "84s", "72s",
  "88s", "74s", "82s", "78s", "86s",
]

function seededShuffle(arr: readonly string[], seed: number): string[] {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647
    const j = s % (i + 1)
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

function ScrollColumn({ logos, direction, speed, visibility }: {
  readonly logos: readonly string[]
  readonly direction: "up" | "down"
  readonly speed: string
  readonly visibility: string
}) {
  const items = [...logos, ...logos]

  return (
    <div className={`flex-1 min-w-0 overflow-hidden ${visibility}`}>
      <div
        className={`flex flex-col gap-1 will-change-transform ${
          direction === "up" ? "animate-scroll-up-1" : "animate-scroll-down-1"
        }`}
        style={{
          animationDuration: speed,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {items.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="eager"
            className="w-full aspect-square rounded-md object-cover border border-white/10 shrink-0"
          />
        ))}
      </div>
    </div>
  )
}

export default function LogoRain({ seed }: LogoRainProps) {
  const columns = useMemo(() =>
    Array.from({ length: COLUMN_COUNT }, (_, i) =>
      seededShuffle(ALL_LOGOS, seed + i * 7919)
    ),
    [seed]
  )

  return (
    <div className="flex h-full w-full gap-1 overflow-hidden">
      {columns.map((logos, i) => (
        <ScrollColumn
          key={`${seed}-${i}`}
          logos={logos}
          direction={i % 2 === 0 ? "up" : "down"}
          speed={SCROLL_SPEEDS[i]}
          visibility={COLUMN_VISIBILITY[i] ?? ""}
        />
      ))}
    </div>
  )
}
