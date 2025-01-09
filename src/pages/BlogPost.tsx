import { useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import { MainLayout } from "@/components/layouts/MainLayout"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Eye } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { SEO } from "@/components/SEO"

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_post_images(*)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          navigate('/blog')
        }
        throw error
      }

      // Incrementar el contador de vistas
      await supabase
        .from('blog_posts')
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', data.id)

      return data
    },
  })

  const featuredImage = post?.blog_post_images?.find(img => img.is_featured)?.url

  return (
    <MainLayout>
      <SEO 
        title={post?.seo_title || post?.title || 'Blog Post'}
        description={post?.seo_description || post?.excerpt || ''}
        image={featuredImage || '/og-image.png'}
        type="article"
      />
      <article className="container mx-auto py-12 px-4 max-w-4xl">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-96" />
          </div>
        ) : post ? (
          <>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.views_count} vistas
              </span>
            </div>

            {featuredImage && (
              <img
                src={featuredImage}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-lg mb-8"
              />
            )}

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </>
        ) : null}
      </article>
    </MainLayout>
  )
}