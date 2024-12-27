import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, PenTool, Calendar, Image, Settings, TrendingUp, Eye } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AdminBlog() {
  const [autoGenEnabled, setAutoGenEnabled] = useState(false)
  const [dateFilter, setDateFilter] = useState("all")
  const [viewsFilter, setViewsFilter] = useState("all")

  const mockArticles = [
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            Gestiona y automatiza la creación de contenido para el blog
          </p>
        </div>
        <Button className="gap-2">
          <PenTool className="h-4 w-4" />
          Nuevo Artículo
        </Button>
      </div>

      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="articles" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Artículos
          </TabsTrigger>
          <TabsTrigger value="automation" className="gap-2">
            <Calendar className="h-4 w-4" />
            Automatización
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las fechas</SelectItem>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={viewsFilter} onValueChange={setViewsFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por vistas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las vistas</SelectItem>
                  <SelectItem value="high">Más vistas (>1000)</SelectItem>
                  <SelectItem value="medium">Vistas medias (500-1000)</SelectItem>
                  <SelectItem value="low">Pocas vistas (<500)</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Generación Automática</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-gen">Generación automática</Label>
                <Switch
                  id="auto-gen"
                  checked={autoGenEnabled}
                  onCheckedChange={setAutoGenEnabled}
                />
              </div>

              <div className="space-y-2">
                <Label>Frecuencia de generación</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="number"
                      placeholder="7"
                      disabled={!autoGenEnabled}
                    />
                  </div>
                  <div>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      disabled={!autoGenEnabled}
                    >
                      <option value="days">Días</option>
                      <option value="weeks">Semanas</option>
                      <option value="months">Meses</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Temas principales</Label>
                <Input
                  placeholder="Europa, viajes, turismo, cultura..."
                  disabled={!autoGenEnabled}
                />
                <p className="text-sm text-muted-foreground">
                  Separa los temas con comas para variar el contenido generado
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Blog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Nombre del Blog</Label>
                <Input placeholder="Blog de Viajes" />
              </div>

              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input placeholder="Descubre los mejores destinos y consejos para viajar" />
              </div>

              <div className="space-y-2">
                <Label>Categorías principales</Label>
                <Input placeholder="Europa, Asia, América, África, Oceanía" />
                <p className="text-sm text-muted-foreground">
                  Separa las categorías con comas
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}