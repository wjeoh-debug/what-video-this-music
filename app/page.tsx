'use client'

import { Suspense, useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MOCK_VIDEOS, MOCK_SONG, type Platform, type VideoItem } from '@/constants/mockVideos'
import { TabFilter } from '@/components/TabFilter'
import { VideoCard } from '@/components/VideoCard'
import { PlayerModal } from '@/components/PlayerModal'

type TabId = Platform | 'all'

const TAB_OPTIONS: { id: TabId; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'youtube', label: '유튜브' },
  { id: 'tiktok', label: '틱톡' },
  { id: 'instagram', label: '릴스' },
]

function HomeContent() {
  const searchParams = useSearchParams()
  const songTitle = searchParams.get('title') ?? MOCK_SONG.title

  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const tabs = useMemo(() =>
    TAB_OPTIONS.map((tab) => ({
      ...tab,
      count: tab.id === 'all'
        ? MOCK_VIDEOS.length
        : MOCK_VIDEOS.filter((v) => v.platform === tab.id).length,
    })),
    [],
  )

  const filteredVideos = useMemo(
    () =>
      activeTab === 'all'
        ? MOCK_VIDEOS
        : MOCK_VIDEOS.filter((v) => v.platform === activeTab),
    [activeTab],
  )

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab)
  }, [])

  const handleCardClick = useCallback((video: VideoItem) => {
    setSelectedVideo(video)
  }, [])

  const handleModalClose = useCallback(() => {
    setSelectedVideo(null)
  }, [])

  return (
    <div className="mobile-container bg-surface min-h-screen">
      {/* ── 고정 헤더 ── */}
      <div className="sticky top-0 bg-surface z-10">
        {/* 상단 바: 뒤로가기 + 타이틀 + 개수 */}
        <div className="flex items-center gap-2 px-2 pt-4 pb-3 border-b border-[var(--color-border)]">
          {/* 뒤로가기 버튼 */}
          <button
            id="btn-back"
            onClick={() => window.history.back()}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-primary active:bg-surface-secondary transition-colors"
            aria-label="뒤로가기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-fg-primary">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>

          {/* 타이틀: {곡명}이 사용된 영상 */}
          <p className="text-body2-strong text-fg-primary truncate flex-1">
            {songTitle}이 사용된 영상
          </p>

          {/* 영상 개수 */}
          <span className="flex-shrink-0 text-caption1 text-fg-tertiary">
            {filteredVideos.length}개
          </span>
        </div>

        {/* 탭 필터 */}
        <div className="pt-2">
          <TabFilter
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      {/* ── 영상 그리드 (4열) ── */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-4 gap-0.5 p-0.5">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => handleCardClick(video)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-[40px]">🎵</p>
          <p className="text-body2-strong text-fg-tertiary">영상이 없습니다</p>
        </div>
      )}

      {/* ── 플레이어 모달 ── */}
      {selectedVideo && (
        <PlayerModal video={selectedVideo} onClose={handleModalClose} />
      )}
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="mobile-container bg-surface min-h-screen" />}>
      <HomeContent />
    </Suspense>
  )
}
