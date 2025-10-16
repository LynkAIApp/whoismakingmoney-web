import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAnalysisContent } from '@/lib/content';
import { LockedCard } from '@/components/ui/locked-card';

export const dynamic = 'force-dynamic'

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'main' });
  
  // 获取分析内容
  const analysisContent = await getAnalysisContent(locale);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>

        <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              {/* Main Title */}
              <div className="mb-8">
                <div className="inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/20 mb-6">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Product Analysis Platform
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                  <span className="block">{t('heroTitle')}</span>
                </h1>
                <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mt-4 sm:text-2xl">
                  {t('heroSubtitle')}
                </h2>
              </div>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                {t('latestAnalysisDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Latest Analysis Section */}
      {analysisContent && (
        <section className="py-16 bg-gray-50/80 dark:bg-slate-800/90">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('latestAnalysisTitle')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('latestAnalysisDescription')}
              </p>
            </div>
            
            <MDXRemote 
              source={analysisContent.content} 
              components={{
                LockedCard,
              }}
            />
          </div>
        </section>
      )}
    </main>
  );
}
