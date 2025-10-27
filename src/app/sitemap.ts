import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/content'
import { supportedLocales, localeConfig } from '@/i18n/routing'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whoismakingmoney.ai'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()
  
  // Generate static pages for all locales
  const staticPages: MetadataRoute.Sitemap = []
  
  // Loop through all locales to generate multilingual pages
  for (const locale of supportedLocales) {
    // Home page (all locales have prefix due to localePrefix: 'always')
    staticPages.push({
      url: `${appUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    })
    
    // Privacy page
    staticPages.push({
      url: `${appUrl}/${locale}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
    
    // Terms page
    staticPages.push({
      url: `${appUrl}/${locale}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  }

  // Add blog posts for all supported locales
  const blogPages: MetadataRoute.Sitemap = []
  
  for (const locale of supportedLocales) {
    try {
      const posts = await getBlogPosts(locale)
      
      for (const post of posts) {
        blogPages.push({
          url: `${appUrl}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.publishDate),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }
    } catch (error) {
      console.error(`Error fetching blog posts for locale ${locale}:`, error)
    }
  }

  return [...staticPages, ...blogPages]
}
