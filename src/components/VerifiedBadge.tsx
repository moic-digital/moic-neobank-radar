import { BadgeCheck } from "lucide-react"

interface VerifiedBadgeProps {
  readonly size?: "sm" | "md"
}

export default function VerifiedBadge({ size = "sm" }: VerifiedBadgeProps) {
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5"

  return (
    <span title="Verified" className="inline-flex items-center shrink-0">
      <BadgeCheck className={`${sizeClass} text-emerald-400`} />
    </span>
  )
}
