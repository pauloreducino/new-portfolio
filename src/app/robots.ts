
import type { MetadataRoute } from "next"
const URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paulo-reducino.vercel.app"
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${URL}/sitemap.xml` }
}
