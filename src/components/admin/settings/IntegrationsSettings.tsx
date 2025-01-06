import { useToast } from "@/components/ui/use-toast"
import { EmailIntegration } from "./integrations/EmailIntegration"
import { MakeWebhooks } from "./integrations/MakeWebhooks"
import { ZapierIntegration } from "./integrations/ZapierIntegration"
import { AIAssistantSettings } from "./integrations/AIAssistantSettings"

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
      <AIAssistantSettings />
      <EmailIntegration onSave={handleSave} />
      <MakeWebhooks onTest={handleTestWebhook} onSave={handleSave} />
      <ZapierIntegration onSave={handleSave} />
    </div>
  )
}