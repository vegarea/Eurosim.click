import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, TrendingUp, Image } from "lucide-react"
import { ArticlesFilter } from "./ArticlesFilter"
import { useState } from "react"

interface Article {
  id: number
  title: string
  publishedAt: string
  views: number
  image: string
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Los mejores lugares para visitar en Europa #1",
    publishedAt: "2024-04-10",
    views: 1250,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Guía completa: Viajando por Italia",
    publishedAt: "2024-04-08",
    views: 850,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Top 10 destinos históricos en España",
    publishedAt: "2024-04-05",
    views: 2100,
    image: "/placeholder.svg"
  }
]

export function ArticlesList() {
  const [dateFilter, setDateFilter] = useState("all")
  const [viewsFilter, setViewsFilter] = useState("all")

  return (
    <div className="space-y-4">
      <ArticlesFilter
        dateFilter={dateFilter}
        viewsFilter={viewsFilter}
        onDateFilterChange={setDateFilter}
        onViewsFilterChange={setViewsFilter}
      />

      <div className="grid gap-4">
        {mockArticles.map((article) => (
          <Card key={article.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="relative h-24 w-32 overflow-hidden rounded-lg bg-muted">
                <Image className="absolute inset-0 m-auto h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{article.title}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {article.views.toLocaleString()} vistas
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {article.views > 1000 ? "Tendencia" : "Normal"}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Editar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}