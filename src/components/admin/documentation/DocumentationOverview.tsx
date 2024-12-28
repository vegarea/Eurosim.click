import { FolderOpen, FileText } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DocumentationOverview() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            Resumen del Proyecto
          </CardTitle>
          <CardDescription>
            Vista general de la estructura y componentes del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Características Principales</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Gestión de productos (SIMs físicas y eSIMs)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Sistema de pedidos y pagos
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Blog con generación automática de contenido
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Sistema de envíos y tracking
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Gestión de clientes y documentación
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Automatización de correos electrónicos
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tecnologías Utilizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Frontend: React + TypeScript + Tailwind
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Backend: Supabase (PostgreSQL + Auth)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Pagos: Stripe + PayPal
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • IA: OpenAI para generación de contenido
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Email: SendGrid/SMTP para notificaciones
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    • Integración con APIs de carriers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}