import { ChecklistCategory } from "../../../types/ChecklistTypes";

export const blogTypes: ChecklistCategory = {
  id: "blog",
  category: "Blog",
  items: [
    {
      name: "Post",
      status: "pending",
      description: "Tipos encontrados en blog-posts.md y componentes relacionados",
      locations: [
        "src/components/admin/blog/types.ts"
      ],
      currentTypes: [
        {
          name: "BlogPost",
          path: "src/components/admin/blog/types.ts",
          code: `type BlogPost = {
  id: string
  title: string
  content: string
  status: "draft" | "published"
  author: string
  created_at: Date
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
  status: Database["public"]["Enums"]["post_status"]
  author_id: string
  created_at: string
  updated_at: string | null
  published_at: string | null
  metadata: Json | null
}`
        }
      ]
    }
  ]
};