'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  DollarSign,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Header() {
  const t = useTranslations('main');
  const tHeader = useTranslations('Header');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/40 dark:border-gray-800/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3"
              aria-label={tHeader('homePage')}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {t('appName')}
                </span>
              </div>
              <span className="sr-only">{tHeader('homePage')}</span>
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? tHeader('closeMenu') : tHeader('openMenu')}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {mobileMenuOpen ? tHeader('closeMenu') : tHeader('openMenu')}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
