"use client"

import Image from "next/image"
import Lottie from "lottie-react"
import { Plus, Scale } from "lucide-react"
import animationData from "../../public/radar-iso-animation.json"
import LogoRain from "@/components/LogoRain"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useDictionary } from "@/i18n/use-dictionary"

interface HeroSectionProps {
  readonly onCompare: () => void
}

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

export default function HeroSection({ onCompare }: HeroSectionProps) {
  const { t } = useDictionary()

  function handleAddNeobank() {
    document.getElementById("add-neobank")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-[25%_50%_25%] h-auto md:h-[500px] overflow-hidden gap-0">
      {/* Left panel */}
      <div className="hidden md:block h-full overflow-hidden">
        <LogoPanel seed={7919} side="left" />
      </div>

      {/* Center content */}
      <div className="relative flex flex-col items-center justify-center py-14 sm:py-18 md:py-0 px-4">
        {/* Language Switcher */}
        <div className="absolute top-3 right-3 z-20">
          <LanguageSwitcher />
        </div>
        <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight text-center mt-4"
          style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
        >
          {t.hero.title}
        </h1>

        <div className="flex items-center gap-2.5 mt-3">
          <span className="text-white/50 text-xs sm:text-sm">{t.hero.poweredBy}</span>
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
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
          {/* Compare Cards — primary with shimmer + glow pulse */}
          <button
            onClick={onCompare}
            className="relative flex items-center gap-2 px-6 py-3 bg-moic-blue hover:bg-moic-blue/80 text-white font-semibold rounded-xl transition-colors text-sm sm:text-base cursor-pointer animate-glow-pulse overflow-hidden"
            style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
          >
            <span className="absolute inset-0 animate-shimmer pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <Scale className="w-4 h-4 relative" />
            <span className="relative">{t.hero.compareCards}</span>
          </button>

          {/* Add Your Neobank — outline with border glow */}
          <button
            onClick={handleAddNeobank}
            className="relative flex items-center gap-2 px-6 py-3 border border-moic-blue/50 text-moic-blue hover:bg-moic-blue/10 font-semibold rounded-xl transition-colors text-sm sm:text-base cursor-pointer animate-border-glow overflow-hidden"
            style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
          >
            <span className="absolute inset-0 animate-shimmer pointer-events-none bg-gradient-to-r from-transparent via-moic-blue/15 to-transparent" />
            <Plus className="w-4 h-4 relative" />
            <span className="relative">{t.hero.addYourNeobank}</span>
          </button>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden md:block h-full overflow-hidden">
        <LogoPanel seed={104729} side="right" />
      </div>
    </section>
  )
}
