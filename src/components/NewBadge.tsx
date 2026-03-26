interface NewBadgeProps {
  readonly isRecommended: boolean
}

export default function NewBadge({ isRecommended }: NewBadgeProps) {
  return (
    <div
      className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center px-1.5 py-2 rounded-full shadow-lg ${
        isRecommended
          ? "bg-gradient-to-b from-orange-500 to-amber-400"
          : "bg-gradient-to-b from-moic-blue to-moic-blue-light"
      }`}
    >
      {"NEW".split("").map((char, i) => (
        <span
          key={i}
          className="text-[9px] font-bold text-white leading-tight tracking-widest"
        >
          {char}
        </span>
      ))}
    </div>
  )
}
