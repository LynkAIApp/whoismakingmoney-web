import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whoismakingmoney.ai';
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';

export const metadata: Metadata = {
  title: {
    template: '%s | WhoIsMakingMoney.ai',
    default: 'WhoIsMakingMoney.ai - Find Your Next Profitable AI Project'
  },
  description: 'Explore in-depth case studies of today\'s fastest-growing AI applications. We reverse-engineer their business models—from consumer hits to pro-level tools—giving you the blueprint to build what\'s next.',
  keywords: ['AI products', 'AI applications', 'business model analysis', 'AI tools', 'consumer AI', 'professional AI tools', 'AI success stories', 'AI project ideas', 'AI monetization'],
  authors: [{ name: 'WhoIsMakingMoney.ai Team' }],
  creator: 'WhoIsMakingMoney.ai',
  publisher: 'WhoIsMakingMoney.ai',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: appUrl,
    siteName: 'WhoIsMakingMoney.ai',
    title: 'WhoIsMakingMoney.ai: Find Your Next Profitable AI Project',
    description: 'Explore in-depth case studies of today\'s fastest-growing AI applications. We reverse-engineer their business models—from consumer hits to pro-level tools—giving you the blueprint to build what\'s next.',
    images: [
      {
        url: `${cdnUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'WhoIsMakingMoney.ai - AI Product Analysis Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Your Next Profitable AI Project | WhoIsMakingMoney.ai',
    description: 'Explore in-depth case studies of today\'s fastest-growing AI applications. We reverse-engineer their business models—from consumer hits to pro-level tools—giving you the blueprint to build what\'s next.',
    images: [`${cdnUrl}/og-image.webp`],
    creator: '@whoismakingmoney',
  },
  alternates: {
    canonical: appUrl,
    languages: {
      'en-US': appUrl,
      'zh-CN': `${appUrl}/zh`,
      'x-default': appUrl,
    },
  },
  metadataBase: new URL(appUrl),
  icons: {
    icon: [
      { url: `${cdnUrl}/favicon.svg`, type: 'image/svg+xml' },
      { url: `${cdnUrl}/icon.svg`, type: 'image/svg+xml' },
      { url: `${cdnUrl}/icon-192.svg`, sizes: '192x192', type: 'image/svg+xml' },
      { url: `${cdnUrl}/icon-512.svg`, sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: `${cdnUrl}/icon-192.svg`, sizes: '192x192', type: 'image/svg+xml' },
    ],
    shortcut: `${cdnUrl}/favicon.svg`,
  },
  other: {
    'font-display': 'swap',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)', color: '#059669' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
