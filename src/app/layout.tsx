import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whoismakingmoney.ai';
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';

export const metadata: Metadata = {
  title: {
    template: '%s | WhoIsMakingMoney.ai',
    default: 'WhoIsMakingMoney.ai'
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
