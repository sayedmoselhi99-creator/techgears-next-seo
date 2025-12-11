import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo-config"
import { createClient } from "@supabase/supabase-js"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: posts, error } = await supabase
    .from("posts")
    .select("slug, created_at")

  if (error) {
    console.error("Sitemap Supabase error:", error)
    return []
  }

  // helper to return YYYY-MM-DD
  const formatDate = (date: string | Date) =>
    new Date(date).toISOString().split("T")[0]

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: post.created_at
      ? formatDate(post.created_at)
      : formatDate(new Date()),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: formatDate(new Date()),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: formatDate(new Date()),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: formatDate(new Date()),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: formatDate(new Date()),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: formatDate(new Date()),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: formatDate(new Date()),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: formatDate(new Date()),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ]

  return [...staticPages, ...blogPages]
}
