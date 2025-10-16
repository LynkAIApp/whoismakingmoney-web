import { MetadataRoute } from 'next'

// const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whoismakingmoney.ai'
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WhoIsMakingMoney.ai - AI Product Analysis Platform',
    short_name: 'WhoIsMakingMoney.ai',
    description: 'Explore in-depth case studies of today\'s fastest-growing AI applications. We reverse-engineer their business models—from consumer hits to pro-level tools—giving you the blueprint to build what\'s next.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    icons: [
      {
        src: `${cdnUrl}/icon-192.svg`,
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: `${cdnUrl}/icon-512.svg`,
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
    categories: ['business', 'productivity', 'education'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
}
