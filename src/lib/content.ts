import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Legal文档相关类型定义
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

// Analysis相关类型定义
export interface AnalysisDocFrontmatter {
  title: string;
  description?: string;
}

export interface AnalysisDoc {
  frontmatter: AnalysisDocFrontmatter;
  content: string;
}

/**
 * 获取分析内容的MDX内容，按 locale 优先，缺失回退 en
 */
export async function getAnalysisContent(locale: string): Promise<AnalysisDoc | null> {
  const baseDir = path.join(process.cwd(), 'src', 'content', 'analysis');
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

  return {
    frontmatter: {
      title: data.title as string,
      description: data.description as string || undefined,
    },
    content,
  };
}
