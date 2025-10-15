import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 WhoIsMakingMoney.ai. {t('allRightsReserved')}
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              {t('privacyPolicy')}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              {t('termsOfService')}
            </Link>
            <a
              href="mailto:support@whoismakingmoney.ai"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              {t('contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
