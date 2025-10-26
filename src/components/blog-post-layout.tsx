"use client";

import { useLocale } from 'next-intl';
import { ReactNode } from 'react';
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/routing';

interface BlogPostLayoutProps {
  title: string;
  publishDate: string;
  readTime: string;
  category: string;
  excerpt: string;
  tags?: string[];
  author?: string;
  coverImage?: string;
  children: ReactNode;
}

export function BlogPostLayout({
  title,
  publishDate,
  readTime,
  category,
  excerpt,
  tags,
  author,
  children,
}: BlogPostLayoutProps) {
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto w-full">
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge variant="outline" className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                {category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {(() => {
                    try {
                      const date = new Date(publishDate);
                      if (isNaN(date.getTime())) {
                        console.error('Invalid date:', publishDate);
                        return publishDate; // fallback to original string
                      }
                      return date.toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });
                    } catch (error) {
                      console.error('Date formatting error:', error);
                      return publishDate; // fallback to original string
                    }
                  })()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readTime}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {excerpt}
            </p>
            
            {author && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                By {author}
              </div>
            )}
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="max-w-none prose prose-lg dark:prose-invert prose-table:text-sm prose-th:px-3 prose-td:px-3 prose-th:py-2 prose-td:py-2 prose-headings:scroll-mt-20">
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
