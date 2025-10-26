import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { CalendarDays, Clock, ArrowRight, TrendingUp, Sparkles, Rocket, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBlogPosts } from '@/lib/content';
import { CTAScrollButton } from '@/components/cta-scroll-button';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const { supportedLocales } = await import('@/i18n/routing');

  return supportedLocales.map((locale) => ({
    locale,
  }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'homePage' });
  const blogPosts = await getBlogPosts(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {t('platformTag')}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            {t('heroDescription')}
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <CTAScrollButton>
              {t('analysisSectionTitle')}
            </CTAScrollButton>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>{t('emailTrustText')}</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="border-2 hover:border-blue-500 transition-colors bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl mb-2">{t('features.caseStudies.title')}</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                {t('features.caseStudies.description')}
              </p>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-purple-500 transition-colors bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl mb-2">{t('features.insights.title')}</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                {t('features.insights.description')}
              </p>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-green-500 transition-colors bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl mb-2">{t('features.strategies.title')}</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                {t('features.strategies.description')}
              </p>
            </CardHeader>
          </Card>
        </div>

        {/* Section Divider */}
        <div id="case-studies" className="flex items-center justify-center mb-16 scroll-mt-20">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
          <h2 className="px-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
            {t('analysisSectionTitle')}
          </h2>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          {t('analysisSectionDescription')}
        </p>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {(() => {
                        try {
                          const date = new Date(post.publishDate);
                          if (isNaN(date.getTime())) {
                            return post.publishDate; // fallback to original string
                          }
                          return date.toLocaleDateString(locale, { 
                            year: 'numeric',
                            month: 'short', 
                            day: 'numeric' 
                          });
                        } catch {
                          return post.publishDate; // fallback to original string
                        }
                      })()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
                  <Link href={`/blog/${post.slug}`} locale={locale}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link 
                  href={`/blog/${post.slug}`}
                  locale={locale}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors group"
                >
                  {t('readMore')}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for Future Posts */}
        {blogPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
              {t('comingSoon')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('comingSoonDescription')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}