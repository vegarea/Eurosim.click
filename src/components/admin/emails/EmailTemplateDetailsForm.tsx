import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EmailTemplate } from "./types"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

interface EmailTemplateDetailsFormProps {
  formData: EmailTemplate
  setFormData: (data: EmailTemplate) => void
}

export function EmailTemplateDetailsForm({ formData, setFormData }: EmailTemplateDetailsFormProps) {
  const [newCcEmail, setNewCcEmail] = useState("")

  const handleVariablesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const vars = e.target.value.split(',').map(v => v.trim()).filter(v => v)
    setFormData({ ...formData, variables: vars })
  }

  const getVariablesString = () => {
    if (Array.isArray(formData.variables)) {
      return formData.variables.join(', ')
    }
    return ''
  }

  const handleAddCcEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newCcEmail) {
      e.preventDefault()
      const currentCcEmails = Array.isArray(formData.cc_emails) ? formData.cc_emails : []
      if (!currentCcEmails.includes(newCcEmail)) {
        setFormData({
          ...formData,
          cc_emails: [...currentCcEmails, newCcEmail]
        })
        setNewCcEmail("")
      }
    }
  }

  const handleRemoveCcEmail = (emailToRemove: string) => {
    const currentCcEmails = Array.isArray(formData.cc_emails) ? formData.cc_emails : []
    setFormData({
      ...formData,
      cc_emails: currentCcEmails.filter(email => email !== emailToRemove)
    })
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
        <Label htmlFor="cc_emails">Emails en Copia (CC)</Label>
        <Input
          id="cc_emails"
          value={newCcEmail}
          onChange={(e) => setNewCcEmail(e.target.value)}
          onKeyDown={handleAddCcEmail}
          placeholder="Escribe un email y presiona Enter"
          type="email"
        />
        {Array.isArray(formData.cc_emails) && formData.cc_emails.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.cc_emails.map((email) => (
              <Badge key={email} variant="secondary" className="flex items-center gap-1">
                {email}
                <button
                  type="button"
                  onClick={() => handleRemoveCcEmail(email)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
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
            <SelectItem value="payment_failed">Pago Fallido</SelectItem>
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
          value={getVariablesString()}
          onChange={handleVariablesChange}
          placeholder="nombre_cliente, numero_pedido, etc..."
        />
        <p className="text-sm text-muted-foreground">
          Estas variables serán reemplazadas con datos reales al enviar el email
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
        />
        <Label htmlFor="is_active">Plantilla Activa</Label>
      </div>
    </div>
  )
}