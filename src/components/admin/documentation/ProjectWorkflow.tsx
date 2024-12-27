import { ListTree, ArrowRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const workflows = [
  {
    title: "Proceso de Compra",
    steps: [
      "Usuario selecciona producto (SIM/eSIM)",
      "Añade al carrito",
      "Completa información personal",
      "Realiza pago",
      "Recibe confirmación",
      "Seguimiento de envío/activación"
    ]
  },
  {
    title: "Gestión de Pedidos",
    steps: [
      "Recepción del pedido",
      "Verificación de pago",
      "Procesamiento interno",
      "Envío/Activación",
      "Seguimiento",
      "Confirmación de entrega"
    ]
  },
  {
    title: "Generación de Contenido Blog",
    steps: [
      "Planificación de contenido",
      "Generación manual/IA",
      "Revisión y edición",
      "Selección de imágenes",
      "Programación de publicación",
      "Monitoreo de engagement"
    ]
  }
]

export function ProjectWorkflow() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTree className="h-5 w-5 text-primary" />
            Flujos de Trabajo
          </CardTitle>
          <CardDescription>
            Visualización de los principales procesos del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workflows.map((workflow) => (
              <Card key={workflow.title} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{workflow.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {workflow.steps.map((step, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}