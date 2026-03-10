"use client"

import Image from "next/image"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import LogoRain from "@/components/LogoRain"

function LogoPanel({ seed, side }: {
  readonly seed: number
  readonly side: "left" | "right"
}) {
  return (
    <div className="relative overflow-hidden h-full">
      <LogoRain seed={seed} />

      {/* Fade toward center */}
      {side === "left" && (
        <div className="absolute inset-y-0 right-0 w-16 lg:w-24 bg-gradient-to-l from-moic-navy to-transparent pointer-events-none" />
      )}
      {side === "right" && (
        <div className="absolute inset-y-0 left-0 w-16 lg:w-24 bg-gradient-to-r from-moic-navy to-transparent pointer-events-none" />
      )}

      {/* Top/bottom fade */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-moic-navy to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-moic-navy to-transparent pointer-events-none" />
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative grid grid-cols-1 md:grid-cols-[25%_50%_25%] h-auto md:h-[420px] overflow-hidden gap-0">
      {/* Left panel */}
      <div className="hidden md:block h-full overflow-hidden">
        <LogoPanel seed={7919} side="left" />
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center py-14 sm:py-18 md:py-0 px-4">
        <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]">
          <DotLottieReact
            src="/radar-iso 2.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight text-center mt-4"
          style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
        >
          Neobank Radar
        </h1>

        <div className="flex items-center gap-2.5 mt-3">
          <span className="text-white/50 text-xs sm:text-sm">Powered by</span>
          <a href="https://www.moicdigital.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/logos/moic-logo.png"
              alt="MOIC"
              width={80}
              height={32}
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </a>
        </div>

        <p className="text-white/40 text-sm sm:text-base text-center max-w-xl mx-auto mt-4 leading-relaxed">
          Compare fees, perks and find the perfect digital bank for your financial moment.
        </p>
      </div>

      {/* Right panel */}
      <div className="hidden md:block h-full overflow-hidden">
        <LogoPanel seed={104729} side="right" />
      </div>
    </section>
  )
}
