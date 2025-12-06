"use client"

import { useEffect } from "react"
import { initializeWebVitalsTracking } from "@/lib/web-vitals"

export default function PerformanceMonitor() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initializeWebVitalsTracking()

    // Track memory usage if available
    if ((navigator as any).deviceMemory) {
      console.log(`[v0] Device Memory: ${(navigator as any).deviceMemory}GB`)
    }

    // Track connection type if available
    if ((navigator as any).connection) {
      console.log(`[v0] Connection Type: ${(navigator as any).connection.effectiveType}`)
    }

    // Monitor for layout shifts
    if ("PerformanceObserver" in window) {
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ((entry as any).hadRecentInput) continue
            console.log(`[v0] Layout Shift: ${(entry as any).value}`)
          }
        })
        layoutShiftObserver.observe({ type: "layout-shift", buffered: true })

        return () => {
          layoutShiftObserver.disconnect()
        }
      } catch (e) {
        console.error("[v0] Performance monitoring error:", e)
      }
    }
  }, [])

  return null
}
