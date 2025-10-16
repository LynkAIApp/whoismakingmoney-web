import Script from 'next/script'
import { getTranslations } from 'next-intl/server'

interface StructuredDataProps {
  type: 'website' | 'organization' | 'article'
  locale: string
  data?: Record<string, unknown>
}

export async function StructuredData({ type, locale, data }: StructuredDataProps) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whoismakingmoney.ai';
  
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: t('siteName'),
          url: `${siteUrl}/${locale}`,
          description: t('description'),
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/${locale}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: t('siteName'),
            url: `${siteUrl}/${locale}`,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/icon-512.svg`,
              width: 512,
              height: 512
            }
          }
        }
      
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: t('siteName'),
          url: `${siteUrl}/${locale}`,
          logo: `${siteUrl}/icon-512.svg`,
          description: t('description'),
          sameAs: [
            'https://twitter.com/whoismakingmoney'
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@whoismakingmoney.ai',
            contactType: 'customer service'
          }
        }
      
      case 'article':
        if (!data) return {};
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          author: {
            '@type': 'Organization',
            name: t('siteName')
          },
          publisher: {
            '@type': 'Organization',
            name: t('siteName'),
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/icon-512.svg`
            }
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url
          }
        }
      
      default:
        return data
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  )
}
