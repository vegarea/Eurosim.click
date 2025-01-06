import { Separator } from "@/components/ui/separator"
import { GeneralSettings } from "./ai-assistant/GeneralSettings"
import { AssistantRoles } from "./ai-assistant/AssistantRoles"

export function AIAssistantSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Asistente Virtual</h2>
        <p className="text-muted-foreground">
          Configura el comportamiento y roles del asistente virtual
        </p>
      </div>
      
      <Separator />
      <GeneralSettings />
      <Separator />
      <AssistantRoles />
    </div>
  )
}