import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, Pencil, ExternalLink } from "lucide-react"
import { ArticlesFilter } from "./ArticlesFilter"
import { supabase } from "@/integrations/supabase/client"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"

interface BlogPost {
  id: string
  title: string
  status: string
  created_at: string
  views_count: number
  slug: string
}

export function ArticlesList() {
  const [dateFilter, setDateFilter] = useState("all")
  const [viewsFilter, setViewsFilter] = useState("all")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [dateFilter, viewsFilter])

  const loadPosts = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (dateFilter === 'week') {
        query = query.gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      } else if (dateFilter === 'month') {
        query = query.gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      }

      if (viewsFilter === 'high') {
        query = query.gte('views_count', 1000)
      } else if (viewsFilter === 'low') {
        query = query.lt('views_count', 1000)
      }

      const { data, error } = await query

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <ArticlesFilter
          dateFilter={dateFilter}
          viewsFilter={viewsFilter}
          onDateFilterChange={setDateFilter}
          onViewsFilterChange={setViewsFilter}
        />
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ArticlesFilter
        dateFilter={dateFilter}
        viewsFilter={viewsFilter}
        onDateFilterChange={setDateFilter}
        onViewsFilterChange={setViewsFilter}
      />

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{post.title}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.views_count.toLocaleString()} vistas
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/blog/${post.slug}`} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}