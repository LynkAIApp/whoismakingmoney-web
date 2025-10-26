"use client";

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function GoogleAnalytics() {
  // Only load GA in production
  const shouldLoadGA = process.env.NODE_ENV === 'production';

  // Initialize dataLayer immediately to avoid any race conditions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  }, []);

  if (!shouldLoadGA) {
    return null;
  }

  return (
    <>
      {/* Load Google Analytics with lazyOnload strategy for best performance */}
      {/* This ensures GA doesn't block the initial page render */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-S55PZCQ4WL"
        strategy="lazyOnload"
      />
      <Script 
        id="google-analytics-init" 
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S55PZCQ4WL', {
              send_page_view: true
            });
          `
        }}
      />
    </>
  );
}

// Helper function to track events
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

