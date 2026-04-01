'use client'

import { useEffect, useRef } from 'react'
import { VideoItem } from '@/constants/mockVideos'

interface PlayerModalProps {
  video: VideoItem
  onClose: () => void
  onViewAll?: () => void
}

export function PlayerModal({ video, onClose, onViewAll }: PlayerModalProps) {
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
    <div
      ref={backdropRef}
      id="player-modal-backdrop"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', animation: 'fadeIn 0.18s ease-out' }}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose()
      }}
    >
      {/* ── 팝업 카드 ── */}
      <div
        className="relative rounded-2xl overflow-hidden bg-[#111] shadow-2xl"
        style={{
          animation: 'scaleUp 0.18s ease-out',
          /* 너비 = min(96dvh × 9/16, 92vw): 9:16 비율 완벽 유지 */
          width: 'min(calc(96dvh * 9 / 16), 92vw)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── 비디오 영역: 높이 = 전체 - 하단 정보(140px) ── */}
        <div
          className="relative w-full bg-black"
          style={{ height: 'min(calc(96dvh - 140px), calc(92vw * 16 / 9 - 140px))' }}
        >
          {/* 그라디언트 썸네일 (로딩 폴백) */}
          <div className="absolute inset-0" style={thumbnailStyle} />

          {/* iframe: 절대 위치로 비디오 영역 전체 채우기 */}
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

        {/* ── 영상 정보 & 버튼: flex-none으로 항상 노출 ── */}
        <div className="flex-none px-4 pt-3 pb-4 bg-[#111]">
          {/* 제목 */}
          <p className="text-white text-body2-strong line-clamp-2 leading-snug">
            {video.title}
          </p>

          {/* 크리에이터 + 조회수 (한 줄) */}
          <div className="flex items-center justify-between mt-1.5 mb-3">
            {/* 닉네임 */}
            <div className="flex items-center gap-1 min-w-0">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-white/50 flex-shrink-0">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
              <span className="text-white/70 text-caption1 truncate">{video.creator}</span>
            </div>
            {/* 조회수 */}
            <div className="flex items-center gap-1 flex-shrink-0 ml-2">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-white/50">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              <span className="text-white/60 text-caption1">{video.views}</span>
            </div>
          </div>

          {/* 하단 버튼 2개 */}
          <div className="flex gap-2">
            <button
              id={`btn-view-all-${video.id}`}
              onClick={() => { onClose(); onViewAll?.() }}
              className="flex-1 py-3 rounded-xl bg-white text-gray-900 text-body2-strong transition-opacity active:opacity-80"
            >
              전체 영상 보기
            </button>
            <button
              id={`btn-close-modal-${video.id}`}
              onClick={onClose}
              className="flex-none px-5 py-3 rounded-xl border border-white/30 text-white text-body2-strong transition-opacity active:opacity-60"
            >
              닫기
            </button>
          </div>
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
