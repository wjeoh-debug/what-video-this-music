'use client'

import { useEffect, useRef } from 'react'
import { VideoItem } from '@/constants/mockVideos'

interface PlayerModalProps {
  video: VideoItem
  onClose: () => void
}

export function PlayerModal({ video, onClose }: PlayerModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)

  const thumbnailStyle = {
    background: video.gradientVia
      ? `linear-gradient(135deg, ${video.gradientFrom}, ${video.gradientVia}, ${video.gradientTo})`
      : `linear-gradient(135deg, ${video.gradientFrom}, ${video.gradientTo})`,
  }

  // 모달 오픈 시 body 스크롤 방지
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

  return (
    // z-[60] → layout의 CloseButton(z-50) 위에 덮여서 배경 닫기 버튼이 눌리지 않음
    <div
      ref={backdropRef}
      id="player-modal-backdrop"
      className="fixed inset-0 z-[60] flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,0.75)', animation: 'fadeIn 0.18s ease-out' }}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose()
      }}
    >
      {/* ── 팝업 카드 ── */}
      <div
        className="relative w-full max-w-xs rounded-2xl overflow-hidden bg-[#111] shadow-2xl"
        style={{ animation: 'scaleUp 0.18s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* 닫기 버튼 (카드 우상단) */}
        <button
          id="player-modal-close"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          aria-label="닫기"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        {/* ── 비디오 영역 ── */}
        <div className="relative overflow-hidden bg-black" style={{ height: '52vh' }}>
          {/* 그라디언트 썸네일 (로딩 폴백) */}
          <div className="absolute inset-0" style={thumbnailStyle} />

          {/* iframe 플레이어: 9:16 비율로 중앙 정렬 */}
          <div
            className="absolute top-0 bottom-0 left-1/2"
            style={{ transform: 'translateX(-50%)', width: 'calc(52vh * 9 / 16)' }}
          >
            <iframe
              id={`player-iframe-${video.id}`}
              src={video.embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
              style={{ border: 'none' }}
            />
          </div>
        </div>

        {/* ── 영상 정보 & 버튼 ── */}
        <div className="px-4 pt-3 pb-4">
          {/* 제목 */}
          <p className="text-white text-body2-strong line-clamp-2 leading-snug">
            {video.title}
          </p>

          {/* 조회수 */}
          <div className="flex items-center gap-1 mt-1.5 mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/50">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span className="text-white/60 text-caption1">{video.views}</span>
          </div>

          {/* 전체 영상 보기 버튼 */}
          <button
            id={`btn-view-all-${video.id}`}
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-white text-gray-900 text-body2-strong transition-opacity active:opacity-80"
          >
            전체 영상 보기
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
