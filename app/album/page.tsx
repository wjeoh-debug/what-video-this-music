'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { MOCK_VIDEOS, MOCK_SONG, type VideoItem } from '@/constants/mockVideos'
import { VideoCard } from '@/components/VideoCard'
import { SortFilter, type SortType } from '@/components/SortFilter'
import { PlayerModal } from '@/components/PlayerModal'

// ── 목업 데이터 ──────────────────────────────────────────────
const ALBUM = {
  title: 'How Sweet',
  artist: 'NewJeans',
  releaseDate: '2024.05.24',
  genre: '댄스팝',
  trackCount: 5,
  gradient: 'linear-gradient(135deg, #f9a8d4 0%, #e879f9 40%, #818cf8 100%)',
}

const TRACKS = [
  { id: 1, title: 'How Sweet', duration: '3:10', isTitle: true },
  { id: 2, title: 'Bubble Gum', duration: '2:58', isTitle: false },
  { id: 3, title: MOCK_SONG.title, duration: '3:08', isTitle: false },
  { id: 4, title: 'Right Now', duration: '3:25', isTitle: false },
  { id: 5, title: 'tracks...', duration: '2:44', isTitle: false },
]

const DETAILS = [
  { label: '발매일', value: '2024.05.24' },
  { label: '장르', value: 'K-Pop' },
  { label: '기획사', value: 'ADOR' },
  { label: '유통사', value: 'HYBE' },
  { label: '앨범 유형', value: 'EP' },
]

const OFFICIAL_VIDEOS = [
  {
    id: 'mv-1',
    title: "[MV] NewJeans (뉴진스) 'How Sweet'",
    views: '5,234만회',
    duration: '3:10',
    publishedAt: '2024.05.24',
    gradientFrom: '#f9a8d4',
    gradientVia: '#e879f9',
    gradientTo: '#818cf8',
    ageRating: 12,
  },
  {
    id: 'mv-2',
    title: "[MV] NewJeans (뉴진스) 'Bubble Gum'",
    views: '4,892만회',
    duration: '2:58',
    publishedAt: '2024.05.24',
    gradientFrom: '#fde68a',
    gradientVia: undefined as string | undefined,
    gradientTo: '#fb923c',
    ageRating: null as number | null,
  },
  {
    id: 'mv-3',
    title: "NewJeans (뉴진스) 'How Sweet' Performance Video",
    views: '2,841만회',
    duration: '3:12',
    publishedAt: '2024.06.01',
    gradientFrom: '#818cf8',
    gradientVia: undefined as string | undefined,
    gradientTo: '#c084fc',
    ageRating: null as number | null,
  },
]

type Tab = 'tracks' | 'info' | 'videos'
type VideoSubTab = 'all' | 'official' | 'related'

function sortVideos(videos: VideoItem[], sort: SortType): VideoItem[] {
  return [...videos].sort((a, b) => {
    if (sort === 'popular') return b.viewCount - a.viewCount
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

// ── 수록곡 행 ────────────────────────────────────────────────
function TrackRow({
  track,
  isPlaying,
  onClick,
}: {
  track: (typeof TRACKS)[0]
  isPlaying: boolean
  onClick: () => void
}) {
  return (
    <div
      id={`track-row-${track.id}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="w-full flex items-center gap-3 px-4 py-3 active:bg-[var(--color-surface-primary)] transition-colors cursor-pointer"
    >
      <div className="w-6 flex-shrink-0 flex items-center justify-center">
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-4">
            <span className="w-[3px] bg-[#5868ff] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite]" style={{ height: '60%' }} />
            <span className="w-[3px] bg-[#5868ff] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_0.2s]" style={{ height: '100%' }} />
            <span className="w-[3px] bg-[#5868ff] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_0.4s]" style={{ height: '40%' }} />
          </div>
        ) : (
          <span className={`text-[13px] font-medium ${track.isTitle ? 'text-[#5868ff]' : 'text-[var(--color-text-tertiary)]'}`}>
            {track.id}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={`text-[14px] font-medium truncate ${isPlaying ? 'text-[#5868ff]' : 'text-[var(--color-text-primary)]'}`}>
            {track.title}
          </span>
          {track.isTitle && (
            <span className="flex-shrink-0 text-[10px] font-semibold text-[#5868ff] border border-[#5868ff] rounded px-1 leading-4">
              TITLE
            </span>
          )}
        </div>
        <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">{ALBUM.artist}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[12px] text-[var(--color-text-tertiary)]">{track.duration}</span>
        <button
          id={`track-more-${track.id}`}
          onClick={(e) => e.stopPropagation()}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[var(--color-surface-primary)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-text-tertiary)]">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ── 공식 영상 카드 (16:9 전체 너비) ──────────────────────────
function OfficialVideoCard({ video }: { video: (typeof OFFICIAL_VIDEOS)[0] }) {
  const thumbnailStyle = {
    background: video.gradientVia
      ? `linear-gradient(135deg, ${video.gradientFrom}, ${video.gradientVia}, ${video.gradientTo})`
      : `linear-gradient(135deg, ${video.gradientFrom}, ${video.gradientTo})`,
  }
  return (
    <div id={`official-video-${video.id}`} className="px-4 py-3 cursor-pointer active:opacity-80 transition-opacity">
      <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <div className="absolute inset-0" style={thumbnailStyle} />
        {/* 재생 아이콘 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* 연령 등급 */}
        {video.ageRating && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
            <span className="text-[10px] font-bold text-black leading-none">{video.ageRating}</span>
          </div>
        )}
        {/* 재생시간 */}
        <div className="absolute bottom-2 right-2 bg-black/70 rounded px-1.5 py-0.5">
          <span className="text-white text-[11px] font-medium">{video.duration}</span>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-[14px] font-medium text-[var(--color-text-primary)] line-clamp-2 leading-snug">{video.title}</p>
        <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">{video.views} · {video.publishedAt}</p>
      </div>
    </div>
  )
}

// ── 피드 블록 생성 (공식 3개 + 짧은 영상 4개 반복) ──────────────
type FeedBlock =
  | { type: 'official'; id: string; items: typeof OFFICIAL_VIDEOS }
  | { type: 'shorts'; id: string; items: VideoItem[] }

function buildFeedBlocks(blockCount: number): FeedBlock[] {
  const blocks: FeedBlock[] = []
  for (let i = 0; i < blockCount; i++) {
    blocks.push({ type: 'official', id: `official-${i}`, items: OFFICIAL_VIDEOS })
    const start = (i * 4) % MOCK_VIDEOS.length
    blocks.push({
      type: 'shorts',
      id: `shorts-${i}`,
      items: Array.from({ length: 4 }, (_, j) => MOCK_VIDEOS[(start + j) % MOCK_VIDEOS.length]),
    })
  }
  return blocks
}

// ── 영상 탭 전체 컨텐츠 ───────────────────────────────────────
function VideosTabContent() {
  const [videoSubTab, setVideoSubTab] = useState<VideoSubTab>('all')
  const [sortType, setSortType] = useState<SortType>('popular')
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [allBlockCount, setAllBlockCount] = useState(2)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const sortedVideos = useMemo(() => sortVideos(MOCK_VIDEOS, sortType), [sortType])
  const allFeedBlocks = useMemo(() => buildFeedBlocks(allBlockCount), [allBlockCount])

  // 인피니티 스크롤 — 전체 탭일 때만 동작
  useEffect(() => {
    if (videoSubTab !== 'all') return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAllBlockCount((c) => c + 2) },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [videoSubTab])

  const handleClose = useCallback(() => setSelectedVideo(null), [])

  const VIDEO_SUB_TABS: { id: VideoSubTab; label: string }[] = [
    { id: 'all', label: '전체' },
    { id: 'official', label: '공식 영상' },
    { id: 'related', label: '짧은 영상' },
  ]

  return (
    <div>
      {/* 하위 탭: 전체 | 공식 영상 | 짧은 영상 + 정렬 필터 */}
      <div className="flex items-center border-b border-[var(--color-border)] px-4">
        <div className="flex flex-1">
          {VIDEO_SUB_TABS.map((tab) => (
            <button
              key={tab.id}
              id={`video-sub-tab-${tab.id}`}
              onClick={() => setVideoSubTab(tab.id)}
              className={`py-2.5 mr-5 text-[14px] font-medium transition-colors relative whitespace-nowrap ${
                videoSubTab === tab.id ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'
              }`}
            >
              {tab.label}
              {videoSubTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-text-primary)] rounded-full" />
              )}
            </button>
          ))}
        </div>
        {/* 정렬 필터: 짧은 영상 탭일 때만 표시 */}
        {videoSubTab === 'related' && (
          <div className="flex-shrink-0 pb-1">
            <SortFilter value={sortType} onChange={setSortType} />
          </div>
        )}
      </div>

      {/* ── 전체 탭: 공식 3 + 짧은 영상 4 반복 믹스 피드 ── */}
      {videoSubTab === 'all' && (
        <div className="pt-1">
          {allFeedBlocks.map((block) =>
            block.type === 'official' ? (
              <div key={block.id}>
                {block.items.map((v) => (
                  <OfficialVideoCard key={`${block.id}-${v.id}`} video={v} />
                ))}
              </div>
            ) : (
              <div key={block.id}>
                <div className="h-[1px] bg-[var(--color-border)] mx-4 my-2" />
                <div className="grid grid-cols-4" style={{ gap: '5px', padding: '0 5px 2px' }}>
                  {block.items.map((video, idx) => (
                    <VideoCard
                      key={`${block.id}-${idx}`}
                      video={video}
                      onClick={() => setSelectedVideo(video)}
                    />
                  ))}
                </div>
                <div className="h-[1px] bg-[var(--color-border)] mx-4 mt-2" />
              </div>
            )
          )}
          {/* 인피니티 스크롤 센티넬 */}
          <div ref={sentinelRef} className="h-10 flex items-center justify-center">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-[var(--color-text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-[var(--color-text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-[var(--color-text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      {/* ── 공식 영상 탭 ── */}
      {videoSubTab === 'official' && (
        <div className="pt-1">
          {OFFICIAL_VIDEOS.map((v) => (
            <OfficialVideoCard key={v.id} video={v} />
          ))}
        </div>
      )}

      {/* ── 짧은 영상 탭 ── */}
      {videoSubTab === 'related' && (
        <div className="pt-1">
          <div className="grid grid-cols-4" style={{ gap: '5px', padding: '5px' }}>
            {sortedVideos.map((video) => (
              <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
            ))}
          </div>
        </div>
      )}

      {/* 플레이어 모달 */}
      {selectedVideo && <PlayerModal video={selectedVideo} onClose={handleClose} />}
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────
export default function AlbumPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('tracks')
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  const MAIN_TABS: { id: Tab; label: string }[] = [
    { id: 'tracks', label: '수록곡' },
    { id: 'info', label: '상세정보' },
    { id: 'videos', label: '영상' },
  ]

  return (
    <div
      className="mobile-container min-h-screen"
      style={{
        background: '#0d0d0d',
        '--color-surface-bg': '#0d0d0d',
        '--color-surface-primary': 'rgba(255,255,255,0.08)',
        '--color-surface-secondary': 'rgba(255,255,255,0.12)',
        '--color-surface-tertiary': 'rgba(255,255,255,0.12)',
        '--color-text-primary': '#ffffff',
        '--color-text-secondary': 'rgba(255,255,255,0.70)',
        '--color-text-tertiary': 'rgba(255,255,255,0.45)',
        '--color-text-disabled': 'rgba(255,255,255,0.30)',
        '--color-border': 'rgba(255,255,255,0.12)',
        '--color-border-subtle': 'rgba(255,255,255,0.06)',
      } as React.CSSProperties}
    >

      {/* ── 최상단 바: 뒤로가기(좌) + 더보기(우) */}
      <div className="flex items-center justify-between px-2 pt-4 pb-2">
        <button
          id="btn-album-back"
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-surface-primary)] transition-colors"
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-text-primary)]">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <button
          id="btn-album-more"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-surface-primary)] transition-colors"
          aria-label="더보기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-text-primary)]">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* ── 앨범 정보: 중앙 정렬 텍스트 */}
      <div className="text-center px-6 pt-1 pb-4">
        <h1 className="text-[20px] font-bold text-[var(--color-text-primary)] leading-tight">{ALBUM.title}</h1>
        <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">{ALBUM.artist}</p>
        <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">{ALBUM.releaseDate} · {ALBUM.genre}</p>
      </div>

      {/* ── 앨범 커버: 150×150 고정, 중앙 배치, 우하단 재생 버튼 */}
      <div className="flex justify-center pb-5">
        <div className="relative" style={{ width: 150, height: 150 }}>
          <img
            src="/images/album-nwjns.png"
            alt={`${ALBUM.title} 앨범 커버`}
            className="w-full h-full rounded-xl shadow-xl object-cover"
          />
          {/* 우하단 재생 버튼 */}
          <button
            id="btn-album-cover-play"
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform active:scale-95"
            aria-label="재생"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>



      {/* ── 메인 탭: 수록곡 | 상세정보 | 영상 */}
      <div className="flex border-b border-[var(--color-border)]">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 text-[14px] font-medium transition-colors relative ${
              activeTab === tab.id ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[var(--color-text-primary)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── 탭 컨텐츠 */}
      {activeTab === 'tracks' && (
        <div className="divide-y divide-[var(--color-border)]">
          {TRACKS.map((track) => (
            <TrackRow
              key={track.id}
              track={track}
              isPlaying={playingTrack === track.id}
              onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
            />
          ))}
        </div>
      )}

      {activeTab === 'info' && (
        <div className="px-4 py-5">
          <div className="space-y-4">
            {DETAILS.map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-[13px] text-[var(--color-text-tertiary)]">{label}</span>
                <span className="text-[13px] text-[var(--color-text-primary)] font-medium">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
            <p className="text-[12px] text-[var(--color-text-tertiary)] leading-relaxed">
              본 음원은 저작권법의 보호를 받습니다. 무단 복제 및 배포를 금합니다.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'videos' && <VideosTabContent />}
    </div>
  )
}
