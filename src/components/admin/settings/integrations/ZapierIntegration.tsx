import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Webhook } from "lucide-react"

interface ZapierIntegrationProps {
  onSave: () => void;
}

export function ZapierIntegration({ onSave }: ZapierIntegrationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="h-5 w-5" />
          Zapier
        </CardTitle>
        <CardDescription>
          Configura la integración con Zapier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="zapier-webhook">Webhook de Zapier</Label>
          <Input
            id="zapier-webhook"
            placeholder="https://hooks.zapier.com/..."
          />
        </div>
        <Button onClick={onSave}>Guardar cambios</Button>
      </CardContent>
    </Card>
  )
}