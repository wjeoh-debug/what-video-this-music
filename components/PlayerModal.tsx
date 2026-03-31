'use client'

import { useEffect, useRef } from 'react'
import { VideoItem } from '@/constants/mockVideos'
import { Button } from '@/components/ui/Button'

interface PlayerModalProps {
  video: VideoItem
  onClose: () => void
}

const PLATFORM_CONFIG = {
  youtube: {
    label: 'YouTube에서 보기',
    color: '#FF0000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  tiktok: {
    label: 'TikTok에서 보기',
    color: '#010101',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52v-3.4a4.85 4.85 0 0 1-1.01-.1z" />
      </svg>
    ),
  },
  instagram: {
    label: 'Instagram에서 보기',
    color: '#833ab4',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
}

export function PlayerModal({ video, onClose }: PlayerModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const config = PLATFORM_CONFIG[video.platform]

  // 모달 외부 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // ESC 키로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const thumbnailStyle = {
    background: video.gradientVia
      ? `linear-gradient(135deg, ${video.gradientFrom}, ${video.gradientVia}, ${video.gradientTo})`
      : `linear-gradient(135deg, ${video.gradientFrom}, ${video.gradientTo})`,
  }

  const handleExternalOpen = () => {
    window.open(video.originalUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      ref={overlayRef}
      id="player-modal-overlay"
      className="fixed inset-0 z-50 bg-black/85 flex flex-col"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      {/* 상단 컨트롤 바 */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 pt-4 pb-2">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: config.color }}
        >
          {config.icon}
          <span className="text-white text-body2-strong">{video.platform === 'youtube' ? 'YouTube Shorts' : video.platform === 'tiktok' ? 'TikTok' : 'Instagram Reels'}</span>
        </div>
        <button
          id="player-modal-close"
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      {/* 플레이어 영역 */}
      <div className="flex-1 flex items-center justify-center px-4 py-2 overflow-hidden">
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-xl"
          style={{ maxHeight: '65vh', aspectRatio: '9/16', maxWidth: '300px' }}
        >
          {/* 썸네일 배경 (로딩 중 / 에러 시 폴백) */}
          <div className="absolute inset-0" style={thumbnailStyle} />

          {/* iframe 플레이어 */}
          <iframe
            id={`player-iframe-${video.id}`}
            src={video.embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
            style={{ border: 'none' }}
          />
        </div>
      </div>

      {/* 하단 영상 정보 + CTA */}
      <div
        className="flex-shrink-0 px-4 pt-3 pb-6"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* 제목 & 크리에이터 */}
        <p className="text-white text-body2-strong line-clamp-2 leading-snug">{video.title}</p>
        <div className="flex items-center gap-2 mt-1 mb-4">
          <span className="text-white/60 text-caption1">{video.creator}</span>
          <span className="text-white/30 text-caption1">·</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/40">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <span className="text-white/60 text-caption1">{video.views}</span>
        </div>

        {/* 외부 링크 버튼 */}
        <button
          id={`btn-open-platform-${video.id}`}
          onClick={handleExternalOpen}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-gray-900 active:bg-gray-100 transition-colors"
        >
          <div
            className="flex items-center justify-center w-6 h-6 rounded-full"
            style={{ background: config.color }}
          >
            {config.icon}
          </div>
          <span className="text-body2-strong">{config.label}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
            <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
