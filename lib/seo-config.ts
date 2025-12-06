export const SITE_URL = "https://techgearsfinds4you.vercel.app"
export const SITE_NAME = "Tech Gears Finds4You"
export const SITE_DESCRIPTION =
  "Discover budget-friendly gadgets, honest reviews, and smart tech that makes life simpler"

export const DEFAULT_KEYWORDS = [
  "tech gadgets",
  "budget electronics",
  "tech reviews",
  "affordable technology",
  "smart devices",
  "tech recommendations",
  "gadget reviews",
]

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  github: "https://github.com",
}

// SEO utilities
export const generateCanonicalUrl = (path: string) => {
  return new URL(path, SITE_URL).toString()
}

export const generateOpenGraphTags = (metadata: {
  title: string
  description: string
  image?: string
  type?: string
  url?: string
}) => {
  return {
    "og:site_name": SITE_NAME,
    "og:title": metadata.title,
    "og:description": metadata.description,
    "og:image": metadata.image || `${SITE_URL}/logo.png`,
    "og:type": metadata.type || "website",
    "og:url": metadata.url || SITE_URL,
  }
}

export const generateTwitterTags = (metadata: {
  title: string
  description: string
  image?: string
}) => {
  return {
    "twitter:card": "summary_large_image",
    "twitter:title": metadata.title,
    "twitter:description": metadata.description,
    "twitter:image": metadata.image || `${SITE_URL}/logo.png`,
  }
}
