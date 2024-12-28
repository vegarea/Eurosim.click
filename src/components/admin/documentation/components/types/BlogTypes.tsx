import { ChecklistCategory } from "../../types/ChecklistTypes"

export const blogTypes: ChecklistCategory = {
  id: "blog",
  category: "Blog y Contenido",
  items: [
    {
      name: "BlogPost",
      status: "pending",
      description: "Tipos para las entradas del blog",
      locations: [
        "src/components/admin/blog/types.ts",
        "src/components/blog/BlogPost.tsx"
      ],
      currentTypes: [
        {
          name: "BlogPost",
          path: "src/types/blog.ts",
          code: `interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  publishDate: Date
  status: "draft" | "published"
}`
        }
      ],
      supabaseTypes: [
        {
          name: "BlogPost",
          path: "src/types/supabase.ts",
          code: `type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"] = {
  id: string
  title: string
  content: string
  author_id: string
  publish_date: string
  status: Database["public"]["Enums"]["post_status"]
  created_at: string
  updated_at: string | null
  metadata: Json | null
}`
        }
      ]
    }
  ]
}