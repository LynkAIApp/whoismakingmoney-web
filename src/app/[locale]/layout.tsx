import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { AuthProvider } from '@/lib/auth-context';
import AuthProviderComponent from '@/components/auth-provider';
import { StructuredData } from '@/components/structured-data';
import { generateHreflangAlternates } from '@/lib/hreflang';
import { getOpenGraphLocale } from '@/i18n/routing';
import type { Metadata } from 'next';

// const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whoismakingmoney.ai';
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  const hreflangAlternates = generateHreflangAlternates({ locale });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      url: hreflangAlternates.canonical,
      siteName: 'WhoIsMakingMoney.ai',
      locale: getOpenGraphLocale(locale),
      type: 'website',
      images: [
        {
          url: `${cdnUrl}/og-image.webp`,
          width: 1200,
          height: 630,
          alt: t('openGraph.images.0.alt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitter.title'),
      description: t('twitter.description'),
      images: [`${cdnUrl}/og-image.webp`],
      creator: '@whoismakingmoney',
    },
    alternates: hreflangAlternates,
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        <StructuredData type="website" locale={locale} />
        <StructuredData type="organization" locale={locale} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
          <Toaster />
          <AuthProviderComponent />
        </div>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
