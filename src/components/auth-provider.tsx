'use client';

import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoginForm } from '@/components/login-form';
import { useLoginModalStore } from '@/store/login-modal-store';

export default function AuthProvider() {
  const { toast } = useToast();
  const t = useTranslations('auth');
  const { isLoginModalOpen, closeLoginModal, currentImageUrl } = useLoginModalStore();

  const handleLogin = async (email: string, password: string) => {
    console.log('🔐 Login attempt:', { email, timestamp: new Date().toISOString() });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log('❌ Login failed:', { error: error.message, code: error.status });
      toast({ title: t('loginFailed'), description: t('loginFailedDescription'), variant: 'destructive' });
    } else {
      console.log('✅ Login successful:', { email, timestamp: new Date().toISOString() });
      toast({ title: t('loginSuccess') });
      closeLoginModal();
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    console.log('📝 Sign up attempt:', { email, timestamp: new Date().toISOString() });
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log('❌ Sign up failed:', { error: error.message, code: error.status });
      toast({ title: t('loginFailed'), description: t('loginFailedDescription'), variant: 'destructive' });
    } else {
      console.log('✅ Sign up successful:', { email, timestamp: new Date().toISOString() });
      toast({ title: t('signUpSuccess'), description: t('checkEmailForVerification') });
      closeLoginModal();
    }
  };

  const handleGoogleLogin = async () => {
    // 获取完整的当前路径（包括查询参数）
    let currentFullPath = window.location.pathname + window.location.search;
    
    // 如果有图片URL，将其添加到查询参数中
    if (currentImageUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('image', encodeURIComponent(currentImageUrl));
      currentFullPath = url.pathname + url.search;
    }
    
    // 构建包含next参数的redirectTo URL
    // locale将通过Accept-Language header自动检测
    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback?next=${encodeURIComponent(currentFullPath)}`;
    
    // 调试日志
    console.log('🔍 Google Login Debug (智能locale检测方案):');
    console.log('  - Current pathname:', window.location.pathname);
    console.log('  - Current search:', window.location.search);
    console.log('  - Current image URL:', currentImageUrl);
    console.log('  - Current full path:', currentFullPath);
    console.log('  - NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);
    console.log('  - Final redirectTo URL (locale auto-detected):', redirectTo);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo,
      },
    });
    if (error) {
      console.log('❌ Google login error:', error);
      toast({ title: t('loginFailed'), description: t('loginFailedDescription'), variant: 'destructive' });
    }
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-0 shadow-2xl">
        <DialogHeader className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300 text-base">
            {t('welcome_back')}
          </DialogDescription>
        </DialogHeader>
        <LoginForm
          onLogin={handleLogin}
          onSignUp={handleSignUp}
          onGoogleLogin={handleGoogleLogin}
        />
      </DialogContent>
    </Dialog>
  );
}
