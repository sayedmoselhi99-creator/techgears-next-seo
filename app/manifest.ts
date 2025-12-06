import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tech Gears Finds4You - Budget Gadgets & Reviews",
    short_name: "Tech Gears Finds4You",
    description: "Discover budget-friendly gadgets, honest reviews, and smart tech that makes life simpler",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/logo.png",
        sizes: "540x720",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
    categories: ["productivity", "shopping", "technology"],
  }
}
