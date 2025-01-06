import { GeneralSettings } from "./ai-assistant/GeneralSettings"
import { RolesList } from "./ai-assistant/RolesList"

export function AIAssistantSettings() {
  return (
    <div className="space-y-6">
      <GeneralSettings />
      <RolesList />
    </div>
  )
}