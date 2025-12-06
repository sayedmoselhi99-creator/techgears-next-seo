import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "./seo-config"

export interface PageMetadataProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  type?: "website" | "article" | "profile"
  path?: string
  noindex?: boolean
}

export function generatePageMetadata(props: PageMetadataProps): Metadata {
  const url = props.path ? new URL(props.path, SITE_URL).toString() : SITE_URL

  return {
    title: props.title,
    description: props.description,
    keywords: props.keywords,
    robots: props.noindex ? "noindex, nofollow" : "index, follow",
    canonical: url,
    openGraph: {
      type: props.type || "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: props.title,
      description: props.description,
      images: props.image
        ? [
            {
              url: props.image,
              width: 1200,
              height: 630,
              alt: props.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: props.title,
      description: props.description,
      images: props.image ? [props.image] : [],
    },
  }
}
