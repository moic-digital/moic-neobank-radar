"use client"

import { useState, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import type { FaqCategory } from "@/types/faq"
import { useDictionary } from "@/i18n/use-dictionary"

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  readonly question: string
  readonly answer: string
  readonly isOpen: boolean
  readonly onToggle: (question: string) => void
}) {
  const slug = toSlug(question)
  const buttonId = `faq-btn-${slug}`
  const panelId = `faq-panel-${slug}`

  return (
    <div className="border border-white/6 rounded-lg overflow-hidden transition-colors hover:border-white/12">
      <button
        id={buttonId}
        onClick={() => onToggle(question)}
        className="w-full flex items-center justify-between gap-4 px-5 py-3.5 text-left cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="text-sm font-medium text-white/80">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-moic-blue/70 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-relaxed text-white/50">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function FaqCategoryAccordion({
  category,
  isOpen,
  onToggleCategory,
  openItems,
  onToggleItem,
}: {
  readonly category: FaqCategory
  readonly isOpen: boolean
  readonly onToggleCategory: (title: string) => void
  readonly openItems: ReadonlySet<string>
  readonly onToggleItem: (question: string) => void
}) {
  const slug = toSlug(category.title)
  const buttonId = `faq-cat-btn-${slug}`
  const panelId = `faq-cat-panel-${slug}`

  return (
    <div className="border border-white/8 rounded-xl overflow-hidden transition-colors hover:border-white/15">
      <button
        id={buttonId}
        onClick={() => onToggleCategory(category.title)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="text-sm sm:text-base font-semibold text-white/90">
          {category.title}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/30">
            {category.items.length}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-moic-blue shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 space-y-1.5">
            {category.items.map((item) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.has(item.question)}
                onToggle={onToggleItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface FaqSectionProps {
  readonly categories: readonly FaqCategory[]
}

export default function FaqSection({ categories }: FaqSectionProps) {
  const { t } = useDictionary()
  const [openCategories, setOpenCategories] = useState<ReadonlySet<string>>(new Set())
  const [openItems, setOpenItems] = useState<ReadonlySet<string>>(new Set())

  const handleToggleCategory = useCallback((title: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
  }, [])

  const handleToggleItem = useCallback((question: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(question)) {
        next.delete(question)
      } else {
        next.add(question)
      }
      return next
    })
  }, [])

  return (
    <section id="faq" className="px-4 sm:px-6 md:px-8 py-16 sm:py-20 bg-moic-navy">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-center mb-3 font-[family-name:var(--font-display)]">
          {t.faq.title}
        </h2>
        <p className="text-white/40 text-sm sm:text-base text-center mb-12 max-w-lg mx-auto">
          {t.faq.subtitle}
        </p>

        <div className="space-y-3">
          {categories.map((category) => (
            <FaqCategoryAccordion
              key={category.title}
              category={category}
              isOpen={openCategories.has(category.title)}
              onToggleCategory={handleToggleCategory}
              openItems={openItems}
              onToggleItem={handleToggleItem}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
