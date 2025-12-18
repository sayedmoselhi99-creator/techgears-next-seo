import type { Metadata } from "next"
import { createServerClient } from "@supabase/ssr"
import PostClient from "./PostClient"
import { generateCanonicalUrl } from "@/lib/seo-config"

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  )

  const { data: post } = await supabase
    .from("posts")
    .select("title, description, content_html, image_url, created_at, updated_at")
    .eq("slug", params.slug)
    .single()

  if (!post) {
    return {}
  }

  const cleanText = post.content_html?.replace(/<[^>]+>/g, "") || ""
  const description =
    post.description ||
    cleanText.slice(0, 160) + (cleanText.length > 160 ? "..." : "")

  const canonicalUrl = generateCanonicalUrl(`/post/${params.slug}`)

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description,
      images: post.image_url ? [post.image_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.image_url ? [post.image_url] : [],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  return <PostClient slug={params.slug} />
}
