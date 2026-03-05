"use client"

import { useMemo } from "react"
import { generateRainColumns, RAIN_DURATION } from "@/lib/raindrops"
import type { RainColumn } from "@/lib/raindrops"

interface LogoRainProps {
  readonly seed: number
}

const COLUMN_VISIBILITY: readonly string[] = [
  "",                  // 0: always visible
  "",                  // 1: always visible
  "",                  // 2: always visible
  "hidden lg:block",   // 3: lg+
  "hidden lg:block",   // 4: lg+
  "hidden xl:block",   // 5: xl+
  "hidden xl:block",   // 6: xl+
  "hidden 2xl:block",  // 7: 2xl+
  "hidden 2xl:block",  // 8: 2xl+
  "hidden 2xl:block",  // 9: 2xl+
]

function RainColumnView({ column, index }: {
  readonly column: RainColumn
  readonly index: number
}) {
  const visibility = COLUMN_VISIBILITY[index] ?? ""

  return (
    <div className={`relative h-full min-w-0 flex-1 overflow-hidden ${visibility}`}>
      {column.logos.map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt=""
          width={logo.size}
          height={logo.size}
          loading="eager"
          className={`absolute left-1/2 max-w-full will-change-transform rounded-lg object-cover border border-white/10 ${column.direction === "down" ? "animate-rain-fall" : "animate-rain-rise"}`}
          style={{
            width: logo.size,
            height: logo.size,
            marginLeft: -logo.size / 2,
            top: column.direction === "down" ? -logo.size : undefined,
            bottom: column.direction === "up" ? -logo.size : undefined,
            animationDuration: `${RAIN_DURATION}s`,
            animationDelay: `${-(column.initialDelay + logo.delay)}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function LogoRain({ seed }: LogoRainProps) {
  const columns = useMemo(() => generateRainColumns(seed), [seed])

  return (
    <div className="flex h-full w-full gap-1 overflow-hidden">
      {columns.map((col, i) => (
        <RainColumnView key={`${seed}-${i}`} column={col} index={i} />
      ))}
    </div>
  )
}
