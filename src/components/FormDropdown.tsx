"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface FormDropdownProps {
  readonly value: string
  readonly placeholder: string
  readonly options: readonly string[]
  readonly onChange: (value: string) => void
}

export default function FormDropdown({
  value,
  placeholder,
  options,
  onChange,
}: FormDropdownProps) {
  const [open, setOpen] = useState(false)
  const [openUpward, setOpenUpward] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleToggle() {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      setOpenUpward(spaceBelow < 120)
    }
    setOpen((prev) => !prev)
  }

  function handleSelect(val: string) {
    onChange(val)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={`flex items-center w-full px-4 py-3 bg-white/5 border rounded-xl text-sm transition-all cursor-pointer ${
          open
            ? "border-moic-blue shadow-[0_0_12px_rgba(42,96,251,0.2)]"
            : "border-white/10"
        } ${value ? "text-white" : "text-white/30"}`}
      >
        <span className="flex-1 text-left truncate">
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-white/30 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 w-full bg-moic-surface border border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 py-1 overflow-hidden ${
            openUpward ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                value === opt
                  ? "text-moic-blue bg-moic-blue/10"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
