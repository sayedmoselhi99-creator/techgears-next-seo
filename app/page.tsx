import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Tech Gears Finds4You - Budget-Friendly Gadgets & Honest Reviews",
  description:
    "Discover the best budget-friendly gadgets, honest reviews, and smart tech recommendations. Your source for affordable tech deals on Amazon.",
  keywords: [
    "tech gadgets",
    "budget electronics",
    "tech reviews",
    "affordable technology",
    "smart devices",
    "gadget recommendations",
    "best tech deals",
    "Amazon gadgets",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techgearsfinds4you.vercel.app",
    title: "Tech Gears Finds4You - Budget-Friendly Gadgets & Honest Reviews",
    description:
      "Discover the best budget-friendly gadgets, honest reviews, and smart tech recommendations. Your source for affordable tech deals on Amazon.",
    images: [
      {
        url: "https://techgearsfinds4you.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Tech Gears Finds4You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Gears Finds4You - Budget-Friendly Gadgets & Honest Reviews",
    description: "Discover the best budget-friendly gadgets, honest reviews, and smart tech recommendations.",
    images: ["https://techgearsfinds4you.vercel.app/logo.png"],
  },
}

export default function Home() {
  return <ClientPage />
}
