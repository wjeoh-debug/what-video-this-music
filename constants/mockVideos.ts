export type Platform = 'youtube' | 'tiktok' | 'instagram'

export interface VideoItem {
  id: string
  platform: Platform
  title: string
  creator: string
  views: string
  /** CSS linear-gradient 정의 (썸네일 플레이스홀더) */
  gradientFrom: string
  gradientTo: string
  gradientVia?: string
  /** iframe embed URL */
  embedUrl: string
  /** 외부 플랫폼 원본 URL */
  originalUrl: string
  duration: string
}

export const MOCK_SONG = {
  title: 'Supernatural',
  artist: 'NewJeans',
}

export const MOCK_VIDEOS: VideoItem[] = [
  // ── YouTube Shorts ──
  {
    id: 'yt-1',
    platform: 'youtube',
    title: '내 인생 최고의 순간 🎵 Supernatural 댄스 챌린지',
    creator: '@dancewithme_kr',
    views: '248만',
    gradientFrom: '#FF512F',
    gradientTo: '#DD2476',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0',
    originalUrl: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    duration: '0:23',
  },
  {
    id: 'yt-2',
    platform: 'youtube',
    title: 'Supernatural으로 만든 영상 ✨ 이게 진짜임',
    creator: '@moment.clips',
    views: '91만',
    gradientFrom: '#1a1a2e',
    gradientTo: '#16213e',
    gradientVia: '#0f3460',
    embedUrl: 'https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1&rel=0',
    originalUrl: 'https://www.youtube.com/shorts/9bZkp7q19f0',
    duration: '0:31',
  },
  {
    id: 'yt-3',
    platform: 'youtube',
    title: '뉴진스 Supernatural 커버댄스 | 이건 진짜 잘했다',
    creator: '@kpop_dance_studio',
    views: '53만',
    gradientFrom: '#355C7D',
    gradientTo: '#6C5B7B',
    gradientVia: '#C06C84',
    embedUrl: 'https://www.youtube.com/embed/kJQP7kiw5Fk?autoplay=1&rel=0',
    originalUrl: 'https://www.youtube.com/shorts/kJQP7kiw5Fk',
    duration: '0:57',
  },
  {
    id: 'yt-4',
    platform: 'youtube',
    title: '오늘 하루 | Supernatural 브이로그',
    creator: '@dailylife_yj',
    views: '12만',
    gradientFrom: '#11998e',
    gradientTo: '#38ef7d',
    embedUrl: 'https://www.youtube.com/embed/JGwWNGJdvx8?autoplay=1&rel=0',
    originalUrl: 'https://www.youtube.com/shorts/JGwWNGJdvx8',
    duration: '0:43',
  },

  // ── TikTok ──
  {
    id: 'tt-1',
    platform: 'tiktok',
    title: '#supernatural 이 노래 진짜 중독됨 ㅋㅋ',
    creator: '@jiwon._.vibe',
    views: '1.2M',
    gradientFrom: '#010101',
    gradientTo: '#3a1c71',
    gradientVia: '#d76d77',
    embedUrl: 'https://www.tiktok.com/embed/v2/7284523948123456789',
    originalUrl: 'https://www.tiktok.com/@jiwon._.vibe/video/7284523948123456789',
    duration: '0:17',
  },
  {
    id: 'tt-2',
    platform: 'tiktok',
    title: 'POV: 이 노래 들으면서 드라이브 가고 싶다',
    creator: '@roadtrip_kr',
    views: '876K',
    gradientFrom: '#f093fb',
    gradientTo: '#f5576c',
    embedUrl: 'https://www.tiktok.com/embed/v2/7299887654321098765',
    originalUrl: 'https://www.tiktok.com/@roadtrip_kr/video/7299887654321098765',
    duration: '0:22',
  },
  {
    id: 'tt-3',
    platform: 'tiktok',
    title: 'supernatural 댄스 챌린지 1등 노림 🔥',
    creator: '@haeun_dance',
    views: '340K',
    gradientFrom: '#4facfe',
    gradientTo: '#00f2fe',
    embedUrl: 'https://www.tiktok.com/embed/v2/7311234567890123456',
    originalUrl: 'https://www.tiktok.com/@haeun_dance/video/7311234567890123456',
    duration: '0:29',
  },
  {
    id: 'tt-4',
    platform: 'tiktok',
    title: '이 노래 들으면 자동으로 행복해짐 😊 #뉴진스',
    creator: '@feel_good_clips',
    views: '195K',
    gradientFrom: '#fa709a',
    gradientTo: '#fee140',
    embedUrl: 'https://www.tiktok.com/embed/v2/7305678901234567890',
    originalUrl: 'https://www.tiktok.com/@feel_good_clips/video/7305678901234567890',
    duration: '0:15',
  },

  // ── Instagram Reels ──
  {
    id: 'ig-1',
    platform: 'instagram',
    title: '봄날 카페 브이로그 ☕ 이 노래랑 너무 잘 어울려',
    creator: '@cafe_moments',
    views: '52만',
    gradientFrom: '#833ab4',
    gradientTo: '#fd1d1d',
    gradientVia: '#fcb045',
    embedUrl: 'https://www.instagram.com/reel/CzAbCdEfGhI/embed/',
    originalUrl: 'https://www.instagram.com/reel/CzAbCdEfGhI/',
    duration: '0:35',
  },
  {
    id: 'ig-2',
    platform: 'instagram',
    title: '고양이 영상에 supernatural 넣으면 이렇게 된다',
    creator: '@cat_lover_seoul',
    views: '28만',
    gradientFrom: '#a18cd1',
    gradientTo: '#fbc2eb',
    embedUrl: 'https://www.instagram.com/reel/CzXyZaBcDeF/embed/',
    originalUrl: 'https://www.instagram.com/reel/CzXyZaBcDeF/',
    duration: '0:21',
  },
  {
    id: 'ig-3',
    platform: 'instagram',
    title: '한강 피크닉 🧺 영원히 이 순간이었으면',
    creator: '@seoulvibes_official',
    views: '14만',
    gradientFrom: '#ffecd2',
    gradientTo: '#fcb69f',
    embedUrl: 'https://www.instagram.com/reel/CzMnOpQrStU/embed/',
    originalUrl: 'https://www.instagram.com/reel/CzMnOpQrStU/',
    duration: '0:28',
  },
  {
    id: 'ig-4',
    platform: 'instagram',
    title: 'GRWM 이 노래 들으면서 준비하기 💄',
    creator: '@beauty_by_miso',
    views: '8.2만',
    gradientFrom: '#2af598',
    gradientTo: '#009efd',
    embedUrl: 'https://www.instagram.com/reel/CzVwXyZaAbB/embed/',
    originalUrl: 'https://www.instagram.com/reel/CzVwXyZaAbB/',
    duration: '0:44',
  },
]
