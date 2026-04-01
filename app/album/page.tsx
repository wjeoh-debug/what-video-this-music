'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MOCK_VIDEOS, MOCK_SONG } from '@/constants/mockVideos'
import { VideoSwipeSection } from '@/components/VideoSwipeSection'

// ── 목업 데이터 ──────────────────────────────────────────────
const ALBUM = {
  title: 'How Sweet',
  artist: 'NewJeans',
  releaseDate: '2024.05.24',
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

type Tab = 'tracks' | 'info'

// ── 수록곡 탭 ────────────────────────────────────────────────
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
      {/* 트랙 번호 / 재생 중 표시 */}
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

      {/* 타이틀 + 타이틀곡 뱃지 */}
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

      {/* 재생시간 + ... */}
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

// ── 메인 페이지 ──────────────────────────────────────────────
export default function AlbumPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('tracks')
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  const handleViewAll = () => {
    router.push('/')
  }

  return (
    <div className="mobile-container bg-[var(--color-surface-bg)] min-h-screen">

      {/* ── 헤더 (뒤로가기 + 더보기) */}
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

      {/* ── 앨범 커버 + 정보 */}
      <div className="flex gap-4 px-4 pb-5 pt-1">
        {/* 커버 이미지 */}
        <div
          className="flex-shrink-0 w-24 h-24 rounded-xl shadow-lg overflow-hidden"
          style={{ background: ALBUM.gradient }}
        >
          <div className="w-full h-full flex items-center justify-center opacity-30">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col justify-center gap-0.5 min-w-0">
          <p className="text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider">Album</p>
          <h1 className="text-[18px] font-bold text-[var(--color-text-primary)] leading-tight truncate">{ALBUM.title}</h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] truncate">{ALBUM.artist}</p>
          <p className="text-[12px] text-[var(--color-text-tertiary)]">{ALBUM.releaseDate} · {ALBUM.trackCount}곡</p>
        </div>
      </div>

      {/* ── 플레이 버튼 영역 */}
      <div className="flex gap-2 px-4 pb-5">
        <button
          id="btn-album-play-all"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-[var(--color-text-primary)] text-white text-[13px] font-semibold transition-opacity active:opacity-80"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          전체 재생
        </button>
        <button
          id="btn-album-shuffle"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] text-[13px] font-semibold transition-colors active:bg-[var(--color-surface-primary)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-text-secondary)]">
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
          </svg>
          셔플 재생
        </button>
      </div>

      {/* ── 탭 메뉴 */}
      <div className="flex border-b border-[var(--color-border)]">
        {(['tracks', 'info'] as Tab[]).map((tab) => (
          <button
            key={tab}
            id={`tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-[14px] font-medium transition-colors relative ${
              activeTab === tab
                ? 'text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-tertiary)]'
            }`}
          >
            {tab === 'tracks' ? '수록곡' : '상세 정보'}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[var(--color-text-primary)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── 탭 컨텐츠 */}
      {activeTab === 'tracks' ? (
        <div>
          {/* 수록곡 목록 */}
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

          {/* 구분선 */}
          <div className="h-[1px] bg-[var(--color-border)] mx-4 mt-2" />

          {/* ✨ 이 음악으로 만든 영상 - 가로 스와이프 섹션 */}
          <VideoSwipeSection
            videos={MOCK_VIDEOS}
            onViewAll={handleViewAll}
          />
        </div>
      ) : (
        /* 상세 정보 탭 */
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
    </div>
  )
}
