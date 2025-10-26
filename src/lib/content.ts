import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { supportedLocales } from '@/i18n/routing';

// Blog相关类型定义
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  tags: string[];
  featured?: boolean;
  status: 'published' | 'draft';
  author?: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  interactive?: boolean;
  dataSource?: string;
  content: string;
}

export interface BlogMetadata {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  tags: string[];
  featured?: boolean;
  status: 'published' | 'draft';
  author?: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  interactive?: boolean;
  dataSource?: string;
}

/**
 * 获取所有博客文章的元数据
 * @param locale 语言代码
 * @returns 博客文章元数据数组
 */
export async function getBlogPosts(locale: string): Promise<BlogMetadata[]> {
  const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog', 'posts');
  
  try {
    const folders = await fs.readdir(postsDirectory);
    const posts: BlogMetadata[] = [];
    
    for (const folder of folders) {
      const folderPath = path.join(postsDirectory, folder);
      const stat = await fs.stat(folderPath);
      
      if (stat.isDirectory()) {
        // 尝试读取对应语言的文件，如果不存在则使用英文版本
        const localeFile = path.join(folderPath, `${locale}.mdx`);
        const fallbackFile = path.join(folderPath, 'en.mdx');
        
        let filePath = localeFile;
        try {
          await fs.access(localeFile);
        } catch {
          try {
            await fs.access(fallbackFile);
            filePath = fallbackFile;
          } catch {
            continue; // 如果两个文件都不存在，跳过这个文章
          }
        }
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        // 只返回已发布的文章
        if (data.status === 'published') {
          posts.push({
            slug: folder,
            title: data.title,
            excerpt: data.excerpt,
            category: data.category,
            readTime: data.readTime,
            publishDate: data.publishDate,
            tags: data.tags || [],
            featured: data.featured,
            status: data.status,
            author: data.author,
            coverImage: data.coverImage,
            seoTitle: data.seo?.title || data.title,
            seoDescription: data.seo?.description || data.excerpt,
            interactive: data.interactive,
            dataSource: data.dataSource,
          });
        }
      }
    }
    
    // 按发布日期排序（最新的在前）
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

/**
 * 获取单个博客文章的完整内容
 * @param slug 文章slug
 * @param locale 语言代码
 * @returns 博客文章对象或null
 */
export async function getBlogPost(slug: string, locale: string): Promise<BlogPost | null> {
  const postFilePath = path.join(process.cwd(), 'src', 'content', 'blog', 'posts', slug, `${locale}.mdx`);
  let fallbackFilePath = '';
  
  console.log(`[getBlogPost] Attempting to access: ${postFilePath}`);

  try {
    await fs.access(postFilePath);
    console.log(`[getBlogPost] Successfully accessed: ${postFilePath}`);
  } catch (error) {
    console.error(`[getBlogPost] Failed to access ${postFilePath}. Error:`, error);
    // 如果指定语言的文件不存在，回退到英文
    if (locale !== 'en') {
      fallbackFilePath = path.join(process.cwd(), 'src', 'content', 'blog', 'posts', slug, 'en.mdx');
      console.log(`[getBlogPost] Fallback: Attempting to access ${fallbackFilePath}`);
      try {
        await fs.access(fallbackFilePath);
        console.log(`[getBlogPost] Fallback: Successfully accessed ${fallbackFilePath}`);
      } catch (fallbackError) {
        console.error(`[getBlogPost] Fallback: Failed to access ${fallbackFilePath}. Error:`, fallbackError);
        return null; // 如果英文文件也不存在，返回null
      }
    } else {
      return null;
    }
  }
  
  try {
    const fileToRead = fallbackFilePath || postFilePath;
    console.log(`[getBlogPost] Reading file: ${fileToRead}`);
    const fileContent = await fs.readFile(fileToRead, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      readTime: data.readTime,
      publishDate: data.publishDate,
      tags: data.tags || [],
      featured: data.featured,
      status: data.status,
      author: data.author,
      coverImage: data.coverImage,
      seoTitle: data.seo?.title || data.title,
      seoDescription: data.seo?.description || data.excerpt,
      interactive: data.interactive,
      dataSource: data.dataSource,
      content,
    };
  } catch (error) {
    console.error(`[getBlogPost] Error reading or parsing blog post ${slug}:`, error);
    return null;
  }
}

/**
 * 获取所有博客文章的slug列表（用于静态生成）
 * @returns slug数组
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog', 'posts');
  
  try {
    const folders = await fs.readdir(postsDirectory);
    const slugs: string[] = [];
    
    for (const folder of folders) {
      const folderPath = path.join(postsDirectory, folder);
      const stat = await fs.stat(folderPath);
      
      if (stat.isDirectory()) {
        slugs.push(folder);
      }
    }
    
    return slugs;
  } catch (error) {
    console.error('Error reading blog slugs:', error);
    return [];
  }
}

// -------------------- Legal (Terms & Privacy) --------------------

export interface LegalDocFrontmatter {
  title: string;
  description?: string;
  lastUpdated?: string;
}

export interface LegalDoc {
  frontmatter: LegalDocFrontmatter;
  content: string;
}

/**
 * 获取支持的语言（基于 messages/*.json 文件名）
 */
export async function getSupportedMessageLocales(): Promise<string[]> {
  return Array.from(supportedLocales);
}

/**
 * 读取法律文档（terms/privacy）的 MDX 内容，按 locale 优先，缺失回退 en
 */
export async function getLegalDocument(type: 'terms' | 'privacy', locale: string): Promise<LegalDoc | null> {
  const baseDir = path.join(process.cwd(), 'src', 'content', 'legal', type);
  const localeFile = path.join(baseDir, `${locale}.mdx`);
  const fallbackFile = path.join(baseDir, 'en.mdx');

  let fileToRead = localeFile;
  try {
    await fs.access(fileToRead);
  } catch {
    if (locale !== 'en') {
      try {
        await fs.access(fallbackFile);
        fileToRead = fallbackFile;
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }

  const fileContent = await fs.readFile(fileToRead, 'utf8');
  const { data, content } = matter(fileContent);

  // Format date based on locale
  const formatDate = (dateString: string, locale: string) => {
    const date = new Date(dateString);
    const localeMap: Record<string, string> = {
      'zh': 'zh-CN',
      'en': 'en-US',
      'fr': 'fr-FR',
      'es': 'es-ES',
      'de': 'de-DE',
      'it': 'it-IT',
      'pt': 'pt-PT',
      'ru': 'ru-RU',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
    };
    
    const targetLocale = localeMap[locale] || 'en-US';
    
    return date.toLocaleDateString(targetLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return {
    frontmatter: {
      title: data.title as string,
      description: (data.seo?.description as string) || (data.description as string) || undefined,
      lastUpdated: data.lastUpdated ? formatDate(data.lastUpdated, locale) : undefined,
    },
    content,
  };
}