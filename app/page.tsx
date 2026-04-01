'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MOCK_VIDEOS, MOCK_SONG, type Platform, type VideoItem } from '@/constants/mockVideos'
import { TabFilter } from '@/components/TabFilter'
import { VideoCard } from '@/components/VideoCard'
import { PlayerModal } from '@/components/PlayerModal'
import { SortFilter, type SortType } from '@/components/SortFilter'

type TabId = Platform | 'all'

const PAGE_SIZE = 20

const TAB_OPTIONS: { id: TabId; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'youtube', label: '유튜브' },
  { id: 'tiktok', label: '틱톡' },
  { id: 'instagram', label: '릴스' },
]

function sortVideos(videos: VideoItem[], sort: SortType): VideoItem[] {
  return [...videos].sort((a, b) => {
    if (sort === 'popular') return b.viewCount - a.viewCount
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

function HomeContent() {
  const searchParams = useSearchParams()
  const songTitle = searchParams.get('title') ?? MOCK_SONG.title

  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [sortType, setSortType] = useState<SortType>('popular')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const sentinelRef = useRef<HTMLDivElement>(null)

  // 탭/정렬 변경 시 페이지 초기화
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [activeTab, sortType])

  // Intersection Observer — 무한 스크롤
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + PAGE_SIZE)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const tabs = useMemo(
    () =>
      TAB_OPTIONS.map((tab) => ({
        ...tab,
        count:
          tab.id === 'all'
            ? MOCK_VIDEOS.length
            : MOCK_VIDEOS.filter((v) => v.platform === tab.id).length,
      })),
    [],
  )

  // 탭 필터 → 정렬 → 페이지네이션
  const allFiltered = useMemo(() => {
    const filtered =
      activeTab === 'all' ? MOCK_VIDEOS : MOCK_VIDEOS.filter((v) => v.platform === activeTab)
    return sortVideos(filtered, sortType)
  }, [activeTab, sortType])

  const visibleVideos = useMemo(
    () => allFiltered.slice(0, visibleCount),
    [allFiltered, visibleCount],
  )

  const hasMore = visibleCount < allFiltered.length

  const handleTabChange = useCallback((tab: TabId) => setActiveTab(tab), [])
  const handleSortChange = useCallback((sort: SortType) => setSortType(sort), [])
  const handleCardClick = useCallback((video: VideoItem) => setSelectedVideo(video), [])
  const handleModalClose = useCallback(() => setSelectedVideo(null), [])

  return (
    <div className="mobile-container bg-surface min-h-screen">

      {/* ── 고정 헤더 ── */}
      <div className="sticky top-0 bg-surface z-10">

        {/* 상단 바: 뒤로가기 + 타이틀 */}
        <div className="flex items-center gap-2 px-2 pt-4 pb-3 border-b border-[var(--color-border)]">
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
          <p className="text-body2-strong text-fg-primary truncate flex-1">
            {songTitle}이 사용된 영상
          </p>
        </div>

        {/* 탭 필터 + 정렬 필터 */}
        <div className="flex items-center pt-2 pb-1">
          <div className="flex-1 min-w-0">
            <TabFilter activeTab={activeTab} tabs={tabs} onTabChange={handleTabChange} />
          </div>
          <div className="flex-shrink-0 pr-3 pl-1">
            <SortFilter value={sortType} onChange={handleSortChange} />
          </div>
        </div>
      </div>

      {/* ── 영상 그리드 (4열, 5px 여백) ── */}
      {visibleVideos.length > 0 ? (
        <>
          <div
            className="grid grid-cols-4"
            style={{ gap: '5px', padding: '5px' }}
          >
            {visibleVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleCardClick(video)}
              />
            ))}
          </div>

          {/* 인피니티 스크롤 센티넬 */}
          <div ref={sentinelRef} className="h-8 flex items-center justify-center">
            {hasMore && (
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-fg-tertiary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-fg-tertiary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-fg-tertiary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>
        </>
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
