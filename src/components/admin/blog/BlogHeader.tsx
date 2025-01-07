import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BlogHeader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog</CardTitle>
        <CardDescription>
          Gestiona el contenido del blog generado automáticamente
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* Aquí podrías añadir estadísticas generales del blog si lo deseas */}
      </CardContent>
    </Card>
  )
}