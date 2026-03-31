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

function MusicNoteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity={0.9}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  )
}

function HomeContent() {
  const searchParams = useSearchParams()
  const songTitle = searchParams.get('title') ?? MOCK_SONG.title
  const songArtist = searchParams.get('artist') ?? MOCK_SONG.artist

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
        {/* 곡 정보 */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-[var(--color-border)]">
          {/* 앨범 아트 플레이스홀더 */}
          <div
            className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center shadow-s"
            style={{ background: 'linear-gradient(135deg, #5868ff, #9ab2ff)' }}
          >
            <MusicNoteIcon />
          </div>

          {/* 곡 제목 / 아티스트 */}
          <div className="min-w-0 flex-1">
            <p className="text-body2-strong text-fg-primary truncate">{songTitle}</p>
            <p className="text-caption1 text-fg-secondary truncate">{songArtist}</p>
          </div>
        </div>

        {/* 섹션 타이틀 */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <p className="text-body2-strong text-fg-primary">이 음악이 사용된 영상</p>
          <p className="text-caption1 text-fg-tertiary">{filteredVideos.length}개</p>
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

      {/* ── 영상 그리드 ── */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-2 gap-1.5 p-2">
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
