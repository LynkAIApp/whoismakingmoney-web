'use client';

import { use, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';

interface ErrorContentProps {
  searchParams: { 
    error?: string; 
    next?: string; 
    error_code?: string;
    error_description?: string;
  };
}

function LoadingFallback() {
  const t = useTranslations('error');
  return <div>{t('loading')}</div>;
}

function ErrorContent({ searchParams }: ErrorContentProps) {
  const t = useTranslations('error');
  const [isRetrying, setIsRetrying] = useState(false);

  // 解析URL参数 - 优先使用searchParams，降级到URL参数
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const error = searchParams.error || urlParams.get('error');
  const errorCode = searchParams.error_code || urlParams.get('error_code');
  const errorDescription = searchParams.error_description || urlParams.get('error_description');
  const next = searchParams.next || urlParams.get('next');

  // 调试日志
  useEffect(() => {
    console.log('🔴 Authentication Error Details:', {
      error_type: error,
      error_code: errorCode,
      error_description: errorDescription,
      next: next,
      url: window.location.href
    });
  }, [error, errorCode, errorDescription, next]);

  // 重试登录功能
  const handleRetryLogin = async () => {
    setIsRetrying(true);
    try {
      // 构建重试URL
      const retryUrl = next || '/';
      const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback?next=${encodeURIComponent(retryUrl)}`;
      
      console.log('🔄 Retry Login Debug:');
      console.log('  - Original next parameter:', next);
      console.log('  - Final retry URL:', retryUrl);
      console.log('  - Final redirectTo:', redirectTo);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo }
      });
      
      if (error) {
        console.log('Retry login failed:', error);
      }
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          
          <div className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
            <p className="text-gray-600 mb-6">
              {t('description')}
            </p>
            
            <p className="text-gray-600 mb-6">
              {t('supportText')}
              <a 
                href={`mailto:${t('supportEmail')}?subject=Google Login Issue&body=Hi, I encountered an issue with Google login. Please help me resolve this.`}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {t('supportEmail')}
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:flex sm:space-y-0 sm:space-x-3 sm:justify-center">
          <button
            onClick={handleRetryLogin}
            disabled={isRetrying}
            className="w-full sm:w-auto sm:min-w-[140px] flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('loading')}
              </>
            ) : (
              <>
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('retryLogin')}
              </>
            )}
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto sm:min-w-[140px] flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t('back_home')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    error?: string; 
    next?: string; 
    error_code?: string;
    error_description?: string;
  }>;
}) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ErrorContent searchParams={use(searchParams)} />
    </Suspense>
  );
}