"use client"

import { useEffect, useState } from "react"
import PostCard from "@/components/PostCard"
import { createClient, SupabaseClient } from "@supabase/supabase-js"

type Post = {
  slug: string
  title: string
  image_url: string | null
  created_at: string
}

export default function ClientPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        const supabase: SupabaseClient = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Fetch posts
        const { data, error } = await supabase
          .from("posts")
          .select("slug, title, image_url, created_at")
          .order("created_at", { ascending: false })

        if (error) throw error

        // Cast data to Post[]
        setPosts((data || []) as Post[])
      } catch (err: any) {
        console.error("Supabase error:", err)
        setError("Failed to load posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) return <p className="text-center p-10">Loading posts...</p>
  if (error) return <p className="text-center p-10 text-red-500">{error}</p>
  if (!posts || posts.length === 0) return <p className="text-center p-10">No posts found.</p>

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
