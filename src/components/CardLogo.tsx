"use client"

interface CardLogoProps {
  readonly src: string
  readonly alt: string
  readonly issuer: string
  readonly size?: "sm" | "lg"
}

export default function CardLogo({ src, alt, issuer, size = "sm" }: CardLogoProps) {
  const sizeClasses = size === "lg"
    ? "w-14 h-14 sm:w-16 sm:h-16"
    : "w-10 h-10 sm:w-11 sm:h-11"

  const textSize = size === "lg" ? "text-base" : "text-xs"

  if (!src) {
    return (
      <div className={`${sizeClasses} rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0`}>
        <span className={`${textSize} font-bold text-white/60 uppercase flex items-center justify-center w-full h-full`}>
          {issuer.slice(0, 2)}
        </span>
      </div>
    )
  }

  return (
    <div className={`${sizeClasses} rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = "none"
          const fallback = target.nextElementSibling as HTMLElement | null
          if (fallback) {
            fallback.style.display = "flex"
          }
        }}
      />
      <span
        className={`${textSize} font-bold text-white/60 uppercase items-center justify-center w-full h-full`}
        style={{ display: "none" }}
      >
        {issuer.slice(0, 2)}
      </span>
    </div>
  )
}
