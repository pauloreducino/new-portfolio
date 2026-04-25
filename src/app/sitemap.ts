
import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"
const URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paulo-reducino.vercel.app"
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  return [
    { url: URL, lastModified: new Date(), priority: 1 },
    { url: `${URL}/blog`, lastModified: new Date(), priority: 0.9 },
    { url: `${URL}/faq`, lastModified: new Date(), priority: 0.7 },
    ...posts.map(p => ({ url: `${URL}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.8 })),
  ]
}
