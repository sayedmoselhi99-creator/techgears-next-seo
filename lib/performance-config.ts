// Performance & Core Web Vitals Configuration

export const PERFORMANCE_CONFIG = {
  // Image optimization
  images: {
    quality: 75,
    formats: ["image/avif", "image/webp"],
  },

  // Font optimization
  fonts: {
    preload: true,
    display: "swap",
  },

  // Script optimization
  scripts: {
    strategy: "afterInteractive",
  },

  // Cache configuration
  cache: {
    maxAge: 3600, // 1 hour for pages
    sMaxAge: 86400, // 1 day for CDN
  },

  // Compression
  compression: {
    enabled: true,
    level: 6,
  },
}

export const CORE_WEB_VITALS_TARGETS = {
  lcp: 2500, // Largest Contentful Paint - 2.5s
  fid: 100, // First Input Delay - 100ms
  cls: 0.1, // Cumulative Layout Shift - 0.1
  ttfb: 800, // Time to First Byte - 800ms
}

export const generatePerformanceReport = () => {
  if (typeof window === "undefined") return null

  const vitals = {
    url: window.location.href,
    timestamp: new Date().toISOString(),
    metrics: {
      domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
      loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart,
      ttfb: performance.timing.responseStart - performance.timing.navigationStart,
    },
  }

  return vitals
}
