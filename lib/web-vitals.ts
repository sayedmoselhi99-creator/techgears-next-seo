"use client"

import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals"

type WebVitalMetric = {
  name: string
  value: number
  rating: "good" | "needs-improvement" | "poor"
  delta: number
  url: string
  id: string
  navigationType: string
}

const THRESHOLDS = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  fcr: { good: 1800, needsImprovement: 3000 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  ttfb: { good: 800, needsImprovement: 1800 },
}

export const initializeWebVitalsTracking = () => {
  if (typeof window === "undefined") return

  // Get Core Web Vitals
  getLCP((metric: WebVitalMetric) => {
    console.log(`[v0] LCP: ${metric.value.toFixed(2)}ms - ${metric.rating}`)
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "page_view", {
        lcp: metric.value,
        lcp_rating: metric.rating,
      })
    }
  })

  getFID((metric: WebVitalMetric) => {
    console.log(`[v0] FID: ${metric.value.toFixed(2)}ms - ${metric.rating}`)
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "page_view", {
        fid: metric.value,
        fid_rating: metric.rating,
      })
    }
  })

  getCLS((metric: WebVitalMetric) => {
    console.log(`[v0] CLS: ${metric.value.toFixed(3)} - ${metric.rating}`)
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "page_view", {
        cls: metric.value,
        cls_rating: metric.rating,
      })
    }
  })

  getTTFB((metric: WebVitalMetric) => {
    console.log(`[v0] TTFB: ${metric.value.toFixed(2)}ms - ${metric.rating}`)
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "page_view", {
        ttfb: metric.value,
        ttfb_rating: metric.rating,
      })
    }
  })

  getFCP((metric: WebVitalMetric) => {
    console.log(`[v0] FCP: ${metric.value.toFixed(2)}ms - ${metric.rating}`)
  })
}

export const getRatingStatus = (metric: string, value: number): "good" | "needs-improvement" | "poor" => {
  const thresholds = THRESHOLDS[metric as keyof typeof THRESHOLDS]
  if (!thresholds) return "poor"

  if (value <= thresholds.good) return "good"
  if (value <= thresholds.needsImprovement) return "needs-improvement"
  return "poor"
}
