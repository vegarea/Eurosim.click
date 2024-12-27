import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plug } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function IntegrationsSettings() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios en integraciones se han guardado correctamente.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plug className="h-5 w-5" />
          Integraciones
        </CardTitle>
        <CardDescription>
          Configura las integraciones con servicios externos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="brevo-api-key">API Key de Brevo</Label>
          <Input
            id="brevo-api-key"
            type="password"
            placeholder="Ingresa tu API key de Brevo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zapier-webhook">Webhook de Zapier</Label>
          <Input
            id="zapier-webhook"
            placeholder="https://hooks.zapier.com/..."
          />
        </div>
        <Button onClick={handleSave}>Guardar cambios</Button>
      </CardContent>
    </Card>
  )
}