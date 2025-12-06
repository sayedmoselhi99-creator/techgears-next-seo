/**
 * Generate dynamic sitemap for all blog posts
 * Run this script during build: node scripts/generate-dynamic-sitemap.ts
 */

import fs from "fs"
import path from "path"

const SITE_URL = "https://techgearsfinds4you.vercel.app"

interface BlogPost {
  slug: string
  title: string
  created_at: string
  updated_at: string
  image_url?: string
}

// Placeholder - In production, fetch from Supabase
const getBlogPosts = async (): Promise<BlogPost[]> => {
  // This would fetch from your Supabase database
  // For now, returning empty array
  return []
}

const generateBlogPostSitemap = (posts: BlogPost[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n'
  xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">\n'

  posts.forEach((post) => {
    xml += "  <url>\n"
    xml += `    <loc>${SITE_URL}/post/${post.slug}</loc>\n`
    xml += `    <lastmod>${post.updated_at || post.created_at}</lastmod>\n`
    xml += "    <changefreq>weekly</changefreq>\n"
    xml += "    <priority>0.7</priority>\n"

    if (post.image_url) {
      xml += "    <image:image>\n"
      xml += `      <image:loc>${post.image_url}</image:loc>\n`
      xml += `      <image:title>${post.title}</image:title>\n`
      xml += "    </image:image>\n"
    }

    xml += "  </url>\n"
  })

  xml += "</urlset>"
  return xml
}

const generateSitemap = async () => {
  try {
    console.log("📝 Generating blog post sitemap...")

    const posts = await getBlogPosts()
    const sitemap = generateBlogPostSitemap(posts)

    const outputPath = path.join(process.cwd(), "public", "sitemap-posts.xml")
    fs.writeFileSync(outputPath, sitemap)

    console.log(`✅ Sitemap generated: ${outputPath}`)
    console.log(`📊 Total posts indexed: ${posts.length}`)
  } catch (error) {
    console.error("❌ Sitemap generation failed:", error)
    process.exit(1)
  }
}

generateSitemap()
