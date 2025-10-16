import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getLocaleFromAcceptLanguage } from '@/i18n/routing'

// Google OAuth Callback Handler
// Supabase配置: http://localhost:3000/api/auth/google/callback/**
// URL格式: /api/auth/google/callback?next=/some/path
// Locale检测：自动从Accept-Language header检测用户语言偏好，默认值为en
// 这样提供最自然的用户体验，无需手动传递locale参数

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider: _provider } = await params;
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const error_param = searchParams.get('error')
  const error_description = searchParams.get('error_description')
  
  const locale = getLocaleFromAcceptLanguage(request.headers.get('accept-language'))
  
  // 调试日志
  console.log('🔍 Google Callback Debug (Accept-Language检测):')
  console.log('  - Request URL:', request.url)
  console.log('  - Provider:', _provider)
  console.log('  - Accept-Language header:', request.headers.get('accept-language'))
  console.log('  - Detected locale:', locale)
  console.log('  - Next parameter:', next)
  console.log('  - Code present:', !!code)
  console.log('  - NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL)
  
  // 检查是否有 OAuth 错误参数
  if (error_param) {
    console.log('OAuth Error:', {
      error: error_param,
      description: error_description,
      url: request.url,
      originalNext: next
    })
    // 将原始的next参数和错误信息传递到错误页面，以便重试时能回到原始页面
    const errorParams = new URLSearchParams({
      error: error_param,
      next: next
    });
    
    if (error_description) {
      errorParams.set('error_description', error_description);
    }
    
    const errorUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/auth/error?${errorParams.toString()}`
    console.log('  - Redirecting to locale-specific error URL with original next:', errorUrl)
    return NextResponse.redirect(errorUrl)
  }

  // 检查是否有授权码
  if (!code) {
    console.log('No authorization code received:', {
      url: request.url,
      searchParams: Object.fromEntries(searchParams.entries()),
      originalNext: next
    })
    
    const errorParams = new URLSearchParams({
      error: 'no_code',
      next: next,
      error_code: 'NO_AUTH_CODE',
      error_description: 'No authorization code received from OAuth provider'
    });
    
    const errorUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/auth/error?${errorParams.toString()}`
    console.log('  - Redirecting to locale-specific no-code error URL with detailed error info:', errorUrl)
    return NextResponse.redirect(errorUrl)
  }

  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.log('Supabase auth error:', {
        error: error.message,
        code: error.status,
        url: request.url,
        originalNext: next
      })
      
      // 构建详细的错误参数，包含具体的错误信息
      const errorParams = new URLSearchParams({
        error: 'supabase_error',
        next: next,
        error_code: error.status?.toString() || 'unknown',
        error_description: error.message || 'Unknown Supabase error'
      });
      
      const errorUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/auth/error?${errorParams.toString()}`
      console.log('  - Redirecting to locale-specific supabase error URL with detailed error info:', errorUrl)
      return NextResponse.redirect(errorUrl)
    }

    if (data?.user) {
      console.log('Authentication successful for user:', data.user.email)
      
      // 直接重定向到next参数指定的页面，如果没有则重定向到locale首页
      const redirectPath = next || `/${locale}`
      const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}${redirectPath}`
      console.log('  - Redirecting directly to:', successUrl)
      console.log('  - Next parameter was:', next)
      console.log('  - Final redirect path:', redirectPath)
      return NextResponse.redirect(successUrl)
    } else {
      console.log('No user data received after successful auth')
      
      const errorParams = new URLSearchParams({
        error: 'no_user_data',
        next: next,
        error_code: 'NO_USER_DATA',
        error_description: 'No user data received after successful authentication'
      });
      
      const errorUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/auth/error?${errorParams.toString()}`
      console.log('  - Redirecting to locale-specific no-user-data error URL with detailed error info:', errorUrl)
      return NextResponse.redirect(errorUrl)
    }
  } catch (err) {
    console.log('Unexpected error during authentication:', err)
    
    const errorParams = new URLSearchParams({
      error: 'unexpected_error',
      next: next,
      error_code: 'UNEXPECTED_ERROR',
      error_description: err instanceof Error ? err.message : 'An unexpected error occurred during authentication'
    });
    
    const errorUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/auth/error?${errorParams.toString()}`
    console.log('  - Redirecting to locale-specific unexpected-error URL with detailed error info:', errorUrl)
    return NextResponse.redirect(errorUrl)
  }
}
