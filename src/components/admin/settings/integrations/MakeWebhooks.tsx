import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Webhook } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WebhookItem } from "./WebhookItem"

interface MakeWebhooksProps {
  onTest: (webhookName: string) => void;
  onSave: () => void;
}

export function MakeWebhooks({ onTest, onSave }: MakeWebhooksProps) {
  return (
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
              <WebhookItem
                label="Nuevo Pedido"
                description="Se activa cuando se crea un nuevo pedido"
                onTest={() => onTest("nuevo pedido")}
              />
              <WebhookItem
                label="Cambio de Estado"
                description="Se activa cuando cambia el estado de un pedido"
                onTest={() => onTest("cambio de estado")}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Blog Webhooks */}
          <AccordionItem value="blog">
            <AccordionTrigger>Webhooks del Blog</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <WebhookItem
                label="Nuevo Artículo"
                description="Se activa cuando se publica un nuevo artículo en el blog"
                onTest={() => onTest("nuevo artículo")}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Shipping Webhooks */}
          <AccordionItem value="shipping">
            <AccordionTrigger>Webhooks de Envíos</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <WebhookItem
                label="Envío de SIM Física"
                description="Se activa cuando se genera un envío físico"
                onTest={() => onTest("envío físico")}
              />
              <WebhookItem
                label="Envío de eSIM"
                description="Se activa cuando se envía un QR de eSIM"
                onTest={() => onTest("envío eSIM")}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Customers Webhooks */}
          <AccordionItem value="customers">
            <AccordionTrigger>Webhooks de Clientes</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <WebhookItem
                label="Nuevo Cliente"
                description="Se activa cuando se registra un nuevo cliente"
                onTest={() => onTest("nuevo cliente")}
              />
              <WebhookItem
                label="Actualización de Cliente"
                description="Se activa cuando se actualiza la información de un cliente"
                onTest={() => onTest("actualización cliente")}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button onClick={onSave} className="mt-6">
          Guardar todos los webhooks
        </Button>
      </CardContent>
    </Card>
  )
}