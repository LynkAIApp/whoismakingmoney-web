import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export async function middleware(request: NextRequest) {
  // Step 1: Handle i18n routing first
  const handleI18nRouting = createIntlMiddleware(routing);
  const response = handleI18nRouting(request);

  // Step 2: Create Supabase server client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  return response;
}

export const config = {
  // 明确排除 API 路由、Next.js 内部路由、静态文件和健康检查
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*?)'],
};
