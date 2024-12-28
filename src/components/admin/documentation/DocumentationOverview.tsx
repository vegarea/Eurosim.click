import { FolderOpen, FileText } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ValidationStatus } from "./components/ValidationStatus"

export function DocumentationOverview() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            Estado del Proyecto
          </CardTitle>
          <CardDescription>
            Vista general de la estructura, validaciones y estado de implementación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <ValidationStatus 
              type="typescript"
              status="warning"
              message="Se encontraron algunas discrepancias en los tipos"
              details={[
                "El tipo Order en TypeScript no coincide exactamente con la tabla orders",
                "Faltan algunas propiedades en la interfaz Customer",
                "Revisar mapeo de enums en payment_status"
              ]}
            />
            
            <ValidationStatus 
              type="documentation"
              status="success"
              message="La documentación está actualizada y es consistente"
              details={[
                "Todas las tablas están documentadas correctamente",
                "Las relaciones están documentadas y son válidas",
                "Las políticas RLS están documentadas y configuradas"
              ]}
            />
            
            <ValidationStatus 
              type="workflow"
              status="warning"
              message="Algunos flujos requieren atención"
              details={[
                "El flujo de pagos necesita actualización de tipos",
                "Validar integraciones con proveedores de pago",
                "Revisar manejo de errores en flujo de documentación"
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}