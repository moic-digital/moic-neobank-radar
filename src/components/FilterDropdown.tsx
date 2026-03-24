"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown } from "lucide-react"

interface DropdownOption {
  readonly value: string
  readonly label: string
}

interface DropdownGroup {
  readonly groupLabel: string
  readonly groupValue?: string
  readonly options: readonly DropdownOption[]
}

type DropdownItem = DropdownOption | DropdownGroup

function isGroup(item: DropdownItem): item is DropdownGroup {
  return "groupLabel" in item
}

interface FilterDropdownProps {
  readonly icon?: React.ReactNode
  readonly value: string
  readonly placeholder: string
  readonly resetLabel?: string
  readonly items: readonly DropdownItem[]
  readonly onChange: (value: string) => void
  readonly scrollHint?: boolean
}

export default function FilterDropdown({
  icon,
  value,
  placeholder,
  resetLabel,
  items,
  onChange,
  scrollHint = false,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const checkScrollEnd = useCallback(() => {
    const el = listRef.current
    if (!el) return
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10
    if (isAtBottom) setShowScrollHint(false)
  }, [])

  useEffect(() => {
    if (open) {
      setShowScrollHint(true)
      requestAnimationFrame(() => {
        const el = listRef.current
        if (el && el.scrollHeight <= el.clientHeight) {
          setShowScrollHint(false)
        }
      })
    }
  }, [open])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function findLabel(): string {
    for (const item of items) {
      if (isGroup(item)) {
        if (item.groupValue && item.groupValue === value) return item.groupLabel
        const match = item.options.find((o) => o.value === value)
        if (match) return match.label
      } else if (item.value === value) {
        return item.label
      }
    }
    return placeholder
  }

  function handleSelect(val: string) {
    onChange(val)
    setOpen(false)
  }

  const selectedLabel = findLabel()
  const isActive = value !== ""
  const displayResetLabel = resetLabel ?? placeholder

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 w-full px-3 py-2.5 sm:py-3 border rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
          isActive
            ? "bg-moic-blue/10 border-moic-blue/50 text-white"
            : "bg-white/5 border-white/10 text-white hover:border-white/20"
        }`}
      >
        {icon}
        <span className="truncate flex-1 text-left">{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div ref={listRef} onScroll={checkScrollEnd} className="absolute top-full mt-1 left-0 w-full min-w-[180px] bg-moic-surface border border-white/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 py-1 max-h-64 overflow-y-auto custom-scrollbar">
          {/* Reset option */}
          <button
            onClick={() => handleSelect("")}
            className={`w-full text-left px-3 py-2 text-xs sm:text-sm transition-colors ${
              value === ""
                ? "text-moic-blue bg-moic-blue/10"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            {displayResetLabel}
          </button>

          {/* Fixed scroll hint */}
          {scrollHint && (
            <span className="block px-3 py-1 text-[9px] text-white/20 tracking-wide">
              Swipe down to see more
            </span>
          )}

          <div className="h-px bg-white/5 mx-2 my-1" />

          {items.map((item) => {
            if (isGroup(item)) {
              const isGroupSelected = item.groupValue !== undefined && value === item.groupValue
              return (
                <div key={item.groupLabel}>
                  {item.groupValue ? (
                    <button
                      onClick={() => handleSelect(item.groupValue!)}
                      className={`w-full text-left px-3 pt-3 pb-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        isGroupSelected
                          ? "text-moic-blue"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {item.groupLabel}
                    </button>
                  ) : (
                    <span className="block px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                      {item.groupLabel}
                    </span>
                  )}
                  {item.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left pl-5 pr-3 py-1.5 text-xs sm:text-sm transition-colors ${
                        value === opt.value
                          ? "text-moic-blue bg-moic-blue/10"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )
            }

            return (
              <button
                key={item.value}
                onClick={() => handleSelect(item.value)}
                className={`w-full text-left px-3 py-2 text-xs sm:text-sm font-bold transition-colors ${
                  value === item.value
                    ? "text-moic-blue bg-moic-blue/10"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
