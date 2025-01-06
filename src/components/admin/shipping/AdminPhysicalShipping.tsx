import { ShippingTabs } from "./components/ShippingTabs"
import { ShippingSettings } from "./components/ShippingSettings"

export function AdminPhysicalShipping() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Envíos Físicos</h1>
        <p className="text-muted-foreground">
          Gestiona los envíos físicos y su configuración
        </p>
      </div>

      <ShippingSettings />
      
      <ShippingTabs />
    </div>
  )
}