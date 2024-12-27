import { Button } from "@/components/ui/button"
import { PenTool } from "lucide-react"

export function BlogHeader() {
  return (
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
  )
}