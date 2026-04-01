'use client'

import { useState, useRef, useEffect } from 'react'

export type SortType = 'popular' | 'latest'

interface SortFilterProps {
  value: SortType
  onChange: (sort: SortType) => void
}

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신 등록순' },
]

export function SortFilter({ value, onChange }: SortFilterProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const currentLabel = SORT_OPTIONS.find((o) => o.value === value)?.label ?? '인기순'

  return (
    <div ref={ref} className="relative flex-shrink-0">
      {/* 트리거 버튼 */}
      <button
        id="btn-sort-filter"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 text-fg-secondary active:opacity-60 transition-opacity"
      >
        <span className="text-[13px] whitespace-nowrap">{currentLabel}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`text-fg-tertiary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {/* 드롭다운 */}
      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-20 min-w-[130px] bg-surface rounded-xl shadow-l border border-[var(--color-border)] overflow-hidden"
          style={{ animation: 'sortDropIn 0.15s ease-out' }}
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              id={`sort-option-${option.value}`}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={[
                'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
                option.value === value
                  ? 'text-fg-primary bg-surface-secondary'
                  : 'text-fg-secondary hover:bg-surface-primary',
              ].join(' ')}
            >
              <span className="text-body2-strong">{option.label}</span>
              {option.value === value && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-fg-primary">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes sortDropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
