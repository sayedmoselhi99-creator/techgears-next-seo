"use client"

import { useEffect, useState } from "react"
import PostCard from "@/components/PostCard"
import { createBrowserClient } from "@supabase/ssr"

export default function ClientPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )

        const { data, error } = await supabase
          .from("posts")
          .select("slug, title, image_url, created_at")
          .order("created_at", { ascending: false })

        if (error) throw error

        setPosts(data || [])
      } catch (err) {
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
