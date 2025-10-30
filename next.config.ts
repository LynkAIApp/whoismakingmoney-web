import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
  },
});

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: false,
  },
  compress: false,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CDN_URL ? new URL(process.env.NEXT_PUBLIC_CDN_URL).hostname : 'cdn.imagen-veo-ai.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scdn.imagen-veo-ai.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-accordion', '@radix-ui/react-avatar', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select', '@radix-ui/react-slot', '@radix-ui/react-toast'],
    scrollRestoration: true,
  },
  generateEtags: true,
};

export default withNextIntl(withMDX(nextConfig));
