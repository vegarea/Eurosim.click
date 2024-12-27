import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"

interface EmailTemplate {
  id: string
  name: string
  subject: string
  status: "payment_pending" | "processing" | "shipped" | "delivered" | "cancelled"
  description: string
  type: "physical" | "esim" | "both"
  variables: string[]
}

interface EmailTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: EmailTemplate | null
  onSave: (template: EmailTemplate) => void
}

export function EmailTemplateDialog({
  open,
  onOpenChange,
  template,
  onSave,
}: EmailTemplateDialogProps) {
  const [formData, setFormData] = useState<EmailTemplate>({
    id: "",
    name: "",
    subject: "",
    status: "processing",
    description: "",
    type: "both",
    variables: []
  })

  useEffect(() => {
    if (template) {
      setFormData(template)
    } else {
      setFormData({
        id: crypto.randomUUID(),
        name: "",
        subject: "",
        status: "processing",
        description: "",
        type: "both",
        variables: []
      })
    }
  }, [template])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleVariablesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const vars = e.target.value.split(',').map(v => v.trim()).filter(v => v)
    setFormData({ ...formData, variables: vars })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {template ? "Editar Plantilla" : "Nueva Plantilla"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre de la Plantilla</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Asunto del Email</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Producto</Label>
              <Select
                value={formData.type}
                onValueChange={(value: EmailTemplate["type"]) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">SIM Física</SelectItem>
                  <SelectItem value="esim">E-SIM</SelectItem>
                  <SelectItem value="both">Ambos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Estado Relacionado</Label>
              <Select
                value={formData.status}
                onValueChange={(value: EmailTemplate["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payment_pending">Pago Pendiente</SelectItem>
                  <SelectItem value="processing">En Preparación</SelectItem>
                  <SelectItem value="shipped">En Tránsito</SelectItem>
                  <SelectItem value="delivered">Entregado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="variables">
                Variables Disponibles (separadas por comas)
              </Label>
              <Textarea
                id="variables"
                value={formData.variables.join(', ')}
                onChange={handleVariablesChange}
                placeholder="nombre_cliente, numero_pedido, etc..."
              />
              <p className="text-sm text-muted-foreground">
                Estas variables serán reemplazadas con datos reales al enviar el email
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}