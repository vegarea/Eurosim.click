export const blogTypes = [
  {
    name: "BlogPost",
    currentType: `interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  author: string
  status: "draft" | "published"
  publishedAt?: Date
  tags?: string[]
  images?: BlogPostImage[]
}`,
    supabaseType: `type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"] = {
  id: string
  title: string
  content: string
  excerpt: string | null
  author_id: string
  status: Database["public"]["Enums"]["post_status"]
  published_at: string | null
  tags: string[]
  metadata: Json | null
  created_at: string
  updated_at: string | null
}`,
    locations: [
      "src/components/admin/blog/ArticlesList.tsx",
      "src/components/admin/blog/BlogSettings.tsx"
    ],
    category: "component",
    status: "pending"
  },
  {
    name: "BlogPostImage",
    currentType: `interface BlogPostImage {
  id: string
  url: string
  alt_text: string
  caption?: string
  width: number
  height: number
  is_featured: boolean
}`,
    supabaseType: `type BlogPostImage = Database["public"]["Tables"]["blog_post_images"]["Row"] = {
  id: string
  post_id: string
  url: string
  thumbnail_url: string | null
  alt_text: string
  caption: string | null
  width: number
  height: number
  size_bytes: number
  mime_type: string
  is_featured: boolean
  position: number | null
  created_at: string
  updated_at: string | null
  is_ai_generated: boolean
  ai_prompt: string | null
  storage_path: string
}`,
    locations: [
      "src/components/admin/blog/ArticlesList.tsx",
      "docs/database/blog-post-images.md"
    ],
    category: "component",
    status: "pending"
  }
];