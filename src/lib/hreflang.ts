/**
 * Hreflang configuration utility for multi-language SEO
 */

import { supportedLocales, getCountryCode } from '@/i18n/routing';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whoismakingmoney.ai';

export interface HreflangConfig {
  locale: string;
  path?: string;
}

/**
 * Generate hreflang alternates for a given locale and path
 */
export function generateHreflangAlternates({ locale, path = '' }: HreflangConfig) {
  // const currentPath = path ? `/${path}` : '';
  const localeUrl = getLocaleUrl(locale, path);
  
  // Generate language alternates dynamically from supportedLocales
  const languageAlternates = supportedLocales.reduce((acc, lang) => {
    const countryCode = getCountryCode(lang);
    const langUrl = getLocaleUrl(lang, path);
    acc[`${lang}-${countryCode}`] = langUrl;
    return acc;
  }, {} as Record<string, string>);
  
  return {
    canonical: localeUrl,
    languages: {
      'x-default': getLocaleUrl('en', path), // Default to English
      ...languageAlternates,
    },
  };
}

/**
 * Get all supported locales
 */
export function getSupportedLocales() {
  return supportedLocales;
}

/**
 * Get locale-specific URL
 */
export function getLocaleUrl(locale: string, path: string = '') {
  const basePath = path ? `/${path}` : '';
  return `${appUrl}/${locale}${basePath}`;
}
