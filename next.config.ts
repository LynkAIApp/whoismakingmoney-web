import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-accordion', '@radix-ui/react-avatar', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select', '@radix-ui/react-slot', '@radix-ui/react-toast'],
    scrollRestoration: true,
  },
  generateEtags: true,
};

export default withNextIntl(nextConfig);
