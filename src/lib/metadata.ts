
import type { Metadata } from "next"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paulo-reducino.vercel.app"
const NAME = "Paulo Reducino"
const DESC = "Desenvolvedor Full-Stack especializado em Next.js, TypeScript e aplicações web de alta performance."

export const baseMetadata: Metadata = {
  title: { default: `${NAME} | Desenvolvedor Full-Stack`, template: `%s | ${NAME}` },
  description: DESC,
  metadataBase: new URL(SITE_URL),
  keywords: ["desenvolvedor full-stack","next.js","typescript","react","frontend","backend","SEO","performance web"],
  authors: [{ name: NAME }],
  openGraph: { title: NAME, description: DESC, url: SITE_URL, siteName: NAME, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title: NAME, description: DESC },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export function postMeta(post: { title: string; description: string; slug: string }): Metadata {
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, url: `${SITE_URL}/blog/${post.slug}`, type: "article" },
  }
}
