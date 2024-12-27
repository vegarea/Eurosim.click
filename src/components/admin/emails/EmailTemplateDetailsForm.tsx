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
import { EmailTemplate } from "./types"

interface EmailTemplateDetailsFormProps {
  formData: EmailTemplate
  setFormData: (data: EmailTemplate) => void
}

export function EmailTemplateDetailsForm({ formData, setFormData }: EmailTemplateDetailsFormProps) {
  const handleVariablesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const vars = e.target.value.split(',').map(v => v.trim()).filter(v => v)
    setFormData({ ...formData, variables: vars })
  }

  return (
    <div className="grid gap-4">
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
        <Label htmlFor="variables">Variables Disponibles (separadas por comas)</Label>
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
  )
}