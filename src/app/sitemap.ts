import { MetadataRoute } from 'next'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whoismakingmoney.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()
  
  return [
    {
      url: appUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${appUrl}/zh`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${appUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${appUrl}/zh/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${appUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${appUrl}/zh/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
