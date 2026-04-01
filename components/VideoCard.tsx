'use client'

import { VideoItem } from '@/constants/mockVideos'

interface VideoCardProps {
  video: VideoItem
  onClick: () => void
}

function PlatformBadge({ platform }: { platform: VideoItem['platform'] }) {
  const config = {
    youtube: {
      bg: 'bg-[#FF0000]',
      label: 'YouTube',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    tiktok: {
      bg: 'bg-[#010101]',
      label: 'TikTok',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52v-3.4a4.85 4.85 0 0 1-1.01-.1z" />
        </svg>
      ),
    },
    instagram: {
      bg: 'bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
      label: 'Reels',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
  }

  const { bg, icon } = config[platform]

  return (
    <div className={`flex items-center justify-center ${bg} rounded-full w-6 h-6`}>
      {icon}
    </div>
  )
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const thumbnailStyle = {
    background: video.gradientVia
      ? `linear-gradient(135deg, ${video.gradientFrom}, ${video.gradientVia}, ${video.gradientTo})`
      : `linear-gradient(135deg, ${video.gradientFrom}, ${video.gradientTo})`,
  }

  return (
    <button
      id={`video-card-${video.id}`}
      onClick={onClick}
      className="relative w-full overflow-hidden rounded-xl text-left transition-transform duration-150 active:scale-[0.97] focus:outline-none"
      style={{ aspectRatio: '9/16' }}
    >
      {/* 썸네일 그라디언트 */}
      <div className="absolute inset-0" style={thumbnailStyle} />

      {/* 노이즈 텍스처 효과 */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
        }}
      />

      {/* 재생 아이콘 (중앙) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* 플랫폼 뱃지 (좌상단) */}
      <div className="absolute top-2 left-2">
        <PlatformBadge platform={video.platform} />
      </div>

      {/* 재생 시간 (우상단) */}
      <div className="absolute top-2 right-2 bg-black/60 rounded px-1.5 flex items-center" style={{ height: '18px' }}>
        <span className="text-white text-caption2-strong leading-none">{video.duration}</span>
      </div>

      {/* 하단 그라디언트 + 정보 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 pt-8">
        <p className="text-white text-body2-strong line-clamp-2 leading-snug">{video.title}</p>
        <div className="flex items-center gap-1 mt-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-white/60 flex-shrink-0">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <span className="text-white/70 text-caption2-strong">{video.views}</span>
        </div>
      </div>
    </button>
  )
}
