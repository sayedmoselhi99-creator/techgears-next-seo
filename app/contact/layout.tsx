import type React from "react"
import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/seo-config"

// Enhanced metadata for Contact page with proper SEO
export const metadata: Metadata = {
  title: "Contact Us | Tech Gears Finds4You",
  description:
    "Have questions or feedback? Contact Tech Gears Finds4You - we'd love to hear from you! Send us a message about gadget reviews, suggestions, or partnerships.",
  canonical: `${SITE_URL}/contact`,
  keywords: ["contact", "contact us", "feedback", "support", "get in touch"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    title: "Contact Us | Tech Gears Finds4You",
    description:
      "Have questions or feedback? Contact Tech Gears Finds4You - we'd love to hear from you! Send us a message about gadget reviews, suggestions, or partnerships.",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Tech Gears Finds4You",
    description: "Have questions or feedback? Contact Tech Gears Finds4You - we'd love to hear from you!",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
