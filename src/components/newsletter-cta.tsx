"use client";

import { Button } from '@/components/ui/button';
import { trackEvent } from './google-analytics';
import { Lock, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth-context';
import { useLoginModalStore } from '@/store/login-modal-store';

interface NewsletterCTAProps {
  className?: string;
}

export function NewsletterCTA({ className }: NewsletterCTAProps) {
  const { user } = useAuth();
  const { openLoginModal } = useLoginModalStore();
  const t = useTranslations('newsletter');

  // If user is already logged in, don't show the CTA
  if (user) {
    return null;
  }

  const handleSignInClick = () => {
    // Track the click event
    trackEvent('newsletter_cta_click', {
      location: 'blog_post_end',
    });

    // Open login modal
    openLoginModal();
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-8 shadow-lg ${className}`}>
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          {t('title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('description')}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button 
          onClick={handleSignInClick}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 w-full sm:w-auto min-w-[200px] text-white"
        >
          <Lock className="mr-2 h-5 w-5" />
          {t('signInButton')}
        </Button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-md">
          {t('benefit')}
        </p>
      </div>
    </div>
  );
}
