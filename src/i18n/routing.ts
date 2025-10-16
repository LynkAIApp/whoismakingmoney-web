import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// Export reusable locale configuration constants
export const supportedLocales = ['en', 'zh'] as const;
export const defaultLocale = 'en' as const;

// Language configuration for locale-specific metadata
export const localeConfig = {
  en: {
    countryCode: 'US',
    openGraphLocale: 'en_US'
  },
  zh: {
    countryCode: 'CN', 
    openGraphLocale: 'zh_CN'
  }
} as const;

// Helper functions for locale operations
export function getCountryCode(locale: string): string {
  return localeConfig[locale as keyof typeof localeConfig]?.countryCode || 'US';
}

export function getOpenGraphLocale(locale: string): string {
  return localeConfig[locale as keyof typeof localeConfig]?.openGraphLocale || 'en_US';
}


export const routing = defineRouting({
  // A list of all locales that are supported
  locales: supportedLocales,
  // Used when no locale matches
  defaultLocale: defaultLocale,
  // Always show locale prefix in URL for consistency
  localePrefix: 'always'
});

/**
 * Parse and return the best matching supported language from Accept-Language header
 * @param acceptLanguage - Accept-Language header value, format like: "zh-CN,zh;q=0.9,en;q=0.8"
 * @returns Matched language code, or default language if no match
 */
export function getLocaleFromAcceptLanguage(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale
  
  // Parse Accept-Language header, format like: "zh-CN,zh;q=0.9,en;q=0.8"
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, qValue] = lang.trim().split(';q=')
      const quality = qValue ? parseFloat(qValue) : 1.0
      const langCode = code.split('-')[0].toLowerCase() // Extract main language code
      return { code: langCode, quality }
    })
    .sort((a, b) => b.quality - a.quality) // Sort by quality value
  
  // Find first supported language
  for (const lang of languages) {
    if (supportedLocales.includes(lang.code as typeof supportedLocales[number])) {
      return lang.code as typeof supportedLocales[number]
    }
  }
  
  return defaultLocale
}

// Create navigation helpers
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);