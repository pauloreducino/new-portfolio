
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import type { Post, PostWithContent } from "@/types"

const DIR = path.join(process.cwd(), "content/posts")
const EN_DIR = path.join(process.cwd(), "content/posts/en")

export function getAllPosts(): Post[] {
  if (!fs.existsSync(DIR)) return []
  return fs.readdirSync(DIR)
    .filter(f => f.endsWith(".mdx"))
    .map(f => {
      const slug = f.replace(".mdx", "")
      const src = fs.readFileSync(path.join(DIR, f), "utf-8")
      const { data, content } = matter(src)
      return {
        slug,
        title: data.title ?? "",
        titleEn: data.titleEn,
        description: data.description ?? "",
        descriptionEn: data.descriptionEn,
        date: data.date ?? "",
        tags: data.tags ?? [],
        category: data.category ?? "Geral",
        categoryEn: data.categoryEn,
        readingTime: readingTime(content).text,
        featured: data.featured ?? false,
      } as Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string, locale = "pt"): PostWithContent {
  const ptPath = path.join(DIR, `${slug}.mdx`)
  const enPath = path.join(EN_DIR, `${slug}.mdx`)

  // For EN locale, try EN-specific file first; fall back to PT file
  const hasEnFile = locale === "en" && fs.existsSync(enPath)
  const contentPath = hasEnFile ? enPath : ptPath

  const src = fs.readFileSync(contentPath, "utf-8")
  const { data, content } = matter(src)

  // Always read PT frontmatter for canonical fields; merge EN overrides
  let ptData = data
  if (hasEnFile) {
    const ptSrc = fs.readFileSync(ptPath, "utf-8")
    ptData = matter(ptSrc).data
  }

  const title = locale === "en" ? (ptData.titleEn ?? data.title ?? ptData.title ?? "") : (ptData.title ?? "")
  const description = locale === "en" ? (ptData.descriptionEn ?? data.description ?? ptData.description ?? "") : (ptData.description ?? "")
  const category = locale === "en" ? (ptData.categoryEn ?? ptData.category ?? "General") : (ptData.category ?? "Geral")

  return {
    slug,
    title,
    titleEn: ptData.titleEn,
    description,
    descriptionEn: ptData.descriptionEn,
    date: ptData.date ?? "",
    tags: ptData.tags ?? [],
    category,
    categoryEn: ptData.categoryEn,
    readingTime: readingTime(content).text,
    featured: ptData.featured ?? false,
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(DIR)) return []
  return fs.readdirSync(DIR).filter(f => f.endsWith(".mdx")).map(f => f.replace(".mdx", ""))
}
