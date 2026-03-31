'use client'

import { Platform } from '@/constants/mockVideos'

type TabId = Platform | 'all'

interface Tab {
  id: TabId
  label: string
  count: number
}

interface TabFilterProps {
  activeTab: TabId
  tabs: Tab[]
  onTabChange: (tab: TabId) => void
}

export function TabFilter({ activeTab, tabs, onTabChange }: TabFilterProps) {
  return (
    <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          onClick={() => onTabChange(tab.id)}
          className={[
            'flex-shrink-0 flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 active:scale-95',
            activeTab === tab.id
              ? 'bg-gray-900 text-white shadow-s'
              : 'bg-surface-primary text-fg-secondary',
          ].join(' ')}
        >
          <span className="text-body2-strong whitespace-nowrap">{tab.label}</span>
          {tab.id !== 'all' && (
            <span
              className={[
                'text-caption2-strong min-w-[18px] text-center',
                activeTab === tab.id ? 'text-white/70' : 'text-fg-tertiary',
              ].join(' ')}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
