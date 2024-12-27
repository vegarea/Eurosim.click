import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plug } from "lucide-react"

interface EmailIntegrationProps {
  onSave: () => void;
}

export function EmailIntegration({ onSave }: EmailIntegrationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plug className="h-5 w-5" />
          Email Marketing
        </CardTitle>
        <CardDescription>
          Configura las integraciones con servicios de email
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
        <Button onClick={onSave}>Guardar cambios</Button>
      </CardContent>
    </Card>
  )
}