"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"
import SchemaMarkup from "@/components/SchemaMarkup"
import { generateBlogPostSchema } from "@/lib/schema-generator"
import { generateCanonicalUrl } from "@/lib/seo-config"

export default function PostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    async function loadPost() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single()

      setPost(data)
    }

    loadPost()
  }, [slug])

  if (!post) return <p className="text-center p-8">Loading...</p>

  const cleanText = post.content_html?.replace(/<[^>]+>/g, "") || ""
  const description =
    post.description ||
    cleanText.slice(0, 160) + (cleanText.length > 160 ? "..." : "")

  const canonicalUrl = generateCanonicalUrl(`/post/${slug}`)

  const blogSchema = generateBlogPostSchema({
    title: post.title,
    description,
    image: post.image_url,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: "Tech Gears Finds4You",
    url: canonicalUrl,
  })

  return (
    <>
      <SchemaMarkup schema={blogSchema} />

      <article className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-lg shadow-sm">
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="rounded mb-6 mx-auto"
          />
        )}

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />

        <Link href="/" className="inline-block mt-8 text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </article>
    </>
  )
}
