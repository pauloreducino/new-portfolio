
export interface Post {
  slug: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  date: string
  tags: string[]
  readingTime: string
  category: string
  categoryEn?: string
  featured?: boolean
}
export interface PostWithContent extends Post { content: string }
