import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, getAllBlogSlugs } from '@/lib/content'
import { BlogPostLayout } from '@/components/blog-post-layout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { NewsletterCTA } from '@/components/newsletter-cta'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'

// MDX组件映射
const components = {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  Link,
  Image,
  img: Image, // 映射 img 标签到我们的自定义 Image 组件
  NewsletterCTA, // Newsletter CTA组件
  // 可以在这里添加更多的MDX组件
}

interface BlogPostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  const { supportedLocales } = await import('@/i18n/routing')
  
  const params = []
  for (const slug of slugs) {
    for (const locale of supportedLocales) {
      params.push({ slug, locale })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        'en': `/en/blog/${slug}`,
        'zh': `/zh/blog/${slug}`,
      },
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale)
  
  if (!post || post.status !== 'published') {
    notFound()
  }

  // 创建JSON-LD结构化数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "author": post.author ? {
      "@type": "Person",
      "name": post.author
    } : undefined,
    "publisher": {
      "@type": "Organization",
      "name": "WhoIsMakingMoney.ai",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_APP_URL || ''}/favicon.svg`
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://whoismakingmoney.ai/${locale}/blog/${slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length,
    "timeRequired": post.readTime,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <BlogPostLayout
        title={post.title}
        publishDate={post.publishDate}
        readTime={post.readTime}
        category={post.category}
        excerpt={post.excerpt}
        tags={post.tags}
        author={post.author}
        coverImage={post.coverImage}
      >
        <MDXRemote 
          source={post.content} 
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [],
            },
          }}
        />
      </BlogPostLayout>
    </>
  )
}
