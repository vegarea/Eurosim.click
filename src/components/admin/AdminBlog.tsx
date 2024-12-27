import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, PenTool, Calendar, Image, Settings } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function AdminBlog() {
  const [autoGenEnabled, setAutoGenEnabled] = useState(false)

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
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="relative h-24 w-32 overflow-hidden rounded-lg bg-muted">
                    <Image className="absolute inset-0 m-auto h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold">Los mejores lugares para visitar en Europa #{i}</h3>
                    <p className="text-sm text-muted-foreground">
                      Publicado hace {i} días
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </CardContent>
              </Card>
            ))}
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