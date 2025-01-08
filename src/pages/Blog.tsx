import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { MainLayout } from "@/components/layouts/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Eye } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

export default function Blog() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          excerpt,
          slug,
          published_at,
          views_count,
          featured_image_id,
          blog_post_images!inner(url)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) throw error
      return data
    },
  })

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : (
            posts?.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {post.blog_post_images?.[0]?.url && (
                    <img 
                      src={post.blog_post_images[0].url} 
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <CardContent className="p-4">
                    <CardTitle className="mb-2 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.views_count} vistas
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}