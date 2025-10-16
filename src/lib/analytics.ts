// Performance monitoring and analytics configuration
// Similar to GeoGuessr-web's implementation

export const analyticsConfig = {
  // Microsoft Clarity configuration
  clarity: {
    projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
    enabled: process.env.NODE_ENV === 'production',
  },
  
  // Google Analytics configuration
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    enabled: process.env.NODE_ENV === 'production',
  },
  
  // Performance monitoring
  performance: {
    enabled: process.env.NODE_ENV === 'production',
    sampleRate: 0.1, // 10% of users
  },
};

// Bundle analysis configuration
export const bundleAnalysisConfig = {
  enabled: process.env.ANALYZE === 'true',
  bundleDir: '.next/static/chunks',
};

// Error tracking configuration
export const errorTrackingConfig = {
  enabled: process.env.NODE_ENV === 'production',
  sampleRate: 1.0, // Track all errors in production
  maxBreadcrumbs: 50,
};
