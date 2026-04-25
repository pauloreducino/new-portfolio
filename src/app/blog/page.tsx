import { getAllPosts } from "@/lib/posts"
import { BlogContent } from "@/components/sections/BlogContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos sobre Next.js, TypeScript, IA e desenvolvimento web de alta performance.",
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogContent posts={posts} />
}
