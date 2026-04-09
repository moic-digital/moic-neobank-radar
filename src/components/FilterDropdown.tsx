"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, ArrowDown, ArrowUp } from "lucide-react"

interface DropdownOption {
  readonly value: string
  readonly label: string
  readonly hasDirection?: boolean
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
  readonly activeDirection?: "desc" | "asc"
  readonly onDirectionToggle?: () => void
}

export default function FilterDropdown({
  icon,
  value,
  placeholder,
  resetLabel,
  items,
  onChange,
  scrollHint = false,
  activeDirection,
  onDirectionToggle,
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

  function findSelectedHasDirection(): boolean {
    for (const item of items) {
      if (!isGroup(item) && item.value === value && item.hasDirection) return true
    }
    return false
  }

  const showDirectionOnButton = findSelectedHasDirection() && activeDirection !== undefined

  return (
    <div ref={ref} className="relative">
      <div className="flex">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex items-center gap-2 w-full px-3 py-2.5 sm:py-3 border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
            showDirectionOnButton ? "rounded-l-lg border-r-0" : "rounded-lg"
          } ${
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
        {showDirectionOnButton && onDirectionToggle && (
          <button
            onClick={onDirectionToggle}
            className="flex items-center justify-center px-2 py-2.5 sm:py-3 border border-moic-blue/50 rounded-r-lg bg-moic-blue/10 text-moic-blue hover:bg-moic-blue/20 transition-all cursor-pointer"
            aria-label={activeDirection === "desc" ? "Sort ascending" : "Sort descending"}
          >
            {activeDirection === "desc"
              ? <ArrowDown className="w-3.5 h-3.5" />
              : <ArrowUp className="w-3.5 h-3.5" />
            }
          </button>
        )}
      </div>

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
              <div key={item.value} className="flex items-center">
                <button
                  onClick={() => handleSelect(item.value)}
                  className={`flex-1 text-left px-3 py-2 text-xs sm:text-sm font-bold transition-colors ${
                    value === item.value
                      ? "text-moic-blue bg-moic-blue/10"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
                {item.hasDirection && value === item.value && activeDirection !== undefined && onDirectionToggle && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDirectionToggle()
                    }}
                    className="px-2 py-2 text-moic-blue hover:text-white transition-colors cursor-pointer"
                    aria-label={activeDirection === "desc" ? "Sort ascending" : "Sort descending"}
                  >
                    {activeDirection === "desc"
                      ? <ArrowDown className="w-3.5 h-3.5" />
                      : <ArrowUp className="w-3.5 h-3.5" />
                    }
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
