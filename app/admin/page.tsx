"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

interface Post {
  id: string
  title: string
  slug: string
  content_html: string
  image_url: string | null
  created_at: string
  updated_at?: string
}

/* ---------- Helpers ---------- */
function generateSlug(title: string): string {
  return title
    .toString()
    .normalize("NFKD")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export default function AdminPanel() {
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [loadingAuth, setLoadingAuth] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")

  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [title, setTitle] = useState("")
  const [contentHtml, setContentHtml] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const [viewPost, setViewPost] = useState<Post | null>(null)

  // Infinite scroll
  const pageSize = 20
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  /* ---------- Auth Check ---------- */
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) router.push("/login")
      else setLoadingAuth(false)
    }
    checkAuth()
  }, [router, supabase])

  /* ---------- Load Posts ---------- */
  useEffect(() => {
    if (!loadingAuth) loadPosts(true)
  }, [loadingAuth])

  async function loadPosts(reset = false) {
    setLoading(true)
    setError("")

    const currentPage = reset ? 0 : page
    const from = currentPage * pageSize
    const to = from + pageSize - 1

    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to)

      if (error) throw error

      if (reset) {
        setPosts(data || [])
        setPage(1)
      } else {
        setPosts((prev) => [...prev, ...(data || [])])
        setPage(currentPage + 1)
      }

      setHasMore(data && data.length === pageSize)
    } catch {
      setError("Failed to load posts")
    } finally {
      setLoading(false)
    }
  }

  /* ---------- Infinite Scroll Observer ---------- */
  useEffect(() => {
    if (!hasMore || loading) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadPosts()
    })

    const sentinel = document.getElementById("scroll-sentinel")
    if (sentinel) observer.observe(sentinel)

    return () => observer.disconnect()
  }, [hasMore, loading])

  /* ---------- Save Post ---------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setStatus("")

    if (!title.trim() || !contentHtml.trim()) {
      setError("Title and content are required.")
      return
    }

    const slug = generateSlug(title)

    try {
      const payload = {
        title: title.trim(),
        slug,
        content_html: contentHtml,
        image_url: imageUrl || null,
      }

      if (editingPost) {
        const { error } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", editingPost.id)
        if (error) throw error
        setStatus("Post updated.")
      } else {
        const { error } = await supabase.from("posts").insert([payload])
        if (error) throw error
        setStatus("Post created.")
        await fetch('/api/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: "https://techgearsfinds4you.vercel.app/my-new-post" })
});

      }

      resetForm()
      loadPosts(true)
    } catch (err: any) {
      setError(err.message || "Save failed")
    }
  }

  function handleEdit(post: Post) {
    setEditingPost(post)
    setTitle(post.title)
    setContentHtml(post.content_html)
    setImageUrl(post.image_url || "")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function resetForm() {
    setEditingPost(null)
    setTitle("")
    setContentHtml("")
    setImageUrl("")
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return

    try {
      const { error } = await supabase.from("posts").delete().eq("id", id)
      if (error) throw error

      setStatus("Post deleted.")
      loadPosts(true)
    } catch {
      setError("Delete failed")
    }
  }

  if (loadingAuth)
    return <p className="text-center p-8">Checking authentication...</p>

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Top Row */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {editingPost ? "Edit Post" : "Create New Post"}
        </h1>

        {/* Logout */}
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.push("/login")
          }}
          className="px-3 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      {status && <div className="mb-4 text-green-700 bg-green-50 p-2 rounded">{status}</div>}
      {error && <div className="mb-4 text-red-700 bg-red-50 p-2 rounded">{error}</div>}

      {/* ---------- Form ---------- */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-5 rounded shadow">
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Content (HTML)</label>
          <textarea
            value={contentHtml}
            onChange={(e) => setContentHtml(e.target.value)}
            rows={12}
            className="w-full border p-2 rounded font-mono"
            required
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            {editingPost ? "Update" : "Create"}
          </button>

          {editingPost && (
            <button type="button" onClick={resetForm} className="px-3 py-2 bg-gray-300 rounded">
              Cancel
            </button>
          )}

          <button
            type="button"
            className="px-3 py-2 bg-gray-100 rounded"
            onClick={() =>
              setViewPost({
                id: "",
                title,
                slug: "",
                content_html: contentHtml,
                image_url: imageUrl,
                created_at: new Date().toISOString(),
              })
            }
          >
            Live preview
          </button>
        </div>
      </form>

      {/* ---------- Posts List ---------- */}
      <h2 className="text-xl font-semibold mb-3">All Posts</h2>

      {posts.map((p) => (
        <div key={p.id} className="flex justify-between items-start gap-4 p-4 border rounded bg-white mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {p.image_url ? (
                <img src={p.image_url} className="w-20 h-12 object-cover rounded" />
              ) : (
                <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                  No image
                </div>
              )}

              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs text-gray-500">{p.slug}</div>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-600">
              Created: {new Date(p.created_at).toLocaleString()}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-500 text-white rounded">
              Edit
            </button>
            <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">
              Delete
            </button>
            <button onClick={() => setViewPost(p)} className="px-3 py-1 bg-blue-600 text-white rounded">
              View
            </button>
          </div>
        </div>
      ))}

      <div id="scroll-sentinel" className="h-10"></div>

      {loading && <p className="text-center py-4 text-gray-500">Loading…</p>}
      {!hasMore && <p className="text-center py-4 text-gray-400">You reached the end 🎉</p>}

      {/* ---------- Preview Modal ---------- */}
      {viewPost && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50">
          <div className="bg-white w-full max-w-3xl rounded shadow-lg overflow-auto max-h-[90vh] mt-12">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">{escapeHtml(viewPost.title)}</h3>

              <button
                onClick={() => setViewPost(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Close
              </button>
            </div>

            <div className="p-4">
              {viewPost.image_url && (
                <img
                  src={viewPost.image_url}
                  className="w-full h-56 object-cover rounded mb-4"
                />
              )}
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: viewPost.content_html }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
