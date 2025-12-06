// Google Analytics 4 Configuration
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && GA_ID) {
    window.gtag?.("config", GA_ID, {
      page_path: url,
    })
  }
}

export const event = (action: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && GA_ID) {
    window.gtag?.("event", action, params)
  }
}

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && GA_ID) {
    window.gtag?.("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackPostView = (postSlug: string, postTitle: string) => {
  trackEvent("post", "view", postSlug)
  pageview(`/post/${postSlug}`)
}
