import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plug, Webhook } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"

export function IntegrationsSettings() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios en integraciones se han guardado correctamente.",
    })
  }

  const handleTestWebhook = (webhookName: string) => {
    toast({
      title: "Webhook probado",
      description: `Se ha enviado una prueba al webhook de ${webhookName}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Email Integration */}
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
          <Button onClick={handleSave}>Guardar cambios</Button>
        </CardContent>
      </Card>

      {/* Automation Webhooks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Automatizaciones con Make
          </CardTitle>
          <CardDescription>
            Configura webhooks para automatizar acciones con Make
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Orders Webhooks */}
            <AccordionItem value="orders">
              <AccordionTrigger>Webhooks de Pedidos</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nuevo Pedido</Label>
                      <p className="text-sm text-muted-foreground">
                        Se activa cuando se crea un nuevo pedido
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Input placeholder="URL del webhook de Make" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestWebhook("nuevo pedido")}
                  >
                    Probar webhook
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cambio de Estado</Label>
                      <p className="text-sm text-muted-foreground">
                        Se activa cuando cambia el estado de un pedido
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Input placeholder="URL del webhook de Make" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestWebhook("cambio de estado")}
                  >
                    Probar webhook
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Shipping Webhooks */}
            <AccordionItem value="shipping">
              <AccordionTrigger>Webhooks de Envíos</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Envío de SIM Física</Label>
                      <p className="text-sm text-muted-foreground">
                        Se activa cuando se genera un envío físico
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Input placeholder="URL del webhook de Make" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestWebhook("envío físico")}
                  >
                    Probar webhook
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Envío de eSIM</Label>
                      <p className="text-sm text-muted-foreground">
                        Se activa cuando se envía un QR de eSIM
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Input placeholder="URL del webhook de Make" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestWebhook("envío eSIM")}
                  >
                    Probar webhook
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Customers Webhooks */}
            <AccordionItem value="customers">
              <AccordionTrigger>Webhooks de Clientes</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nuevo Cliente</Label>
                      <p className="text-sm text-muted-foreground">
                        Se activa cuando se registra un nuevo cliente
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Input placeholder="URL del webhook de Make" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestWebhook("nuevo cliente")}
                  >
                    Probar webhook
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Actualización de Cliente</Label>
                      <p className="text-sm text-muted-foreground">
                        Se activa cuando se actualiza la información de un cliente
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Input placeholder="URL del webhook de Make" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestWebhook("actualización cliente")}
                  >
                    Probar webhook
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button onClick={handleSave} className="mt-6">
            Guardar todos los webhooks
          </Button>
        </CardContent>
      </Card>

      {/* Zapier Integration */}
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
          <Button onClick={handleSave}>Guardar cambios</Button>
        </CardContent>
      </Card>
    </div>
  )
}