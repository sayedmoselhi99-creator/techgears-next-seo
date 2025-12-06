import "dotenv/config";   // <-- ADD THIS LINE
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing Supabase environment variables");
  console.error("NEXT_PUBLIC_SUPABASE_URL:", SUPABASE_URL);
  console.error("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "LOADED" : "MISSING");
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "LOADED" : "MISSING");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const siteUrl = "https://techgearsfinds4you.vercel.app";

function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

async function generateSitemap() {
  try {
    console.log("⏳ Fetching posts...");
    const posts = await fetchAllPosts();

    console.log(`✅ ${posts.length} posts loaded`);

    const urls = posts
      .map((p) => {
        return `
  <url>
    <loc>${escapeXml(`${siteUrl}/post/${p.slug}`)}</loc>
    <lastmod>${new Date(p.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  ${urls}

</urlset>`;

    const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
    fs.writeFileSync(outputPath, xml);

    console.log("🎉 Sitemap created at: /public/sitemap.xml");
  } catch (err) {
    console.error("❌ Sitemap generation failed:", err);
  }
}

generateSitemap();
