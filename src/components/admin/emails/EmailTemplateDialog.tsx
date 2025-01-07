import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailTemplate } from "./types"
import { EmailTemplateDetailsForm } from "./EmailTemplateDetailsForm"
import { EmailTemplateContentForm } from "./EmailTemplateContentForm"

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
    variables: [],
    content: "",
    is_active: true,
    carrier_id: null
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
        variables: [],
        content: "",
        is_active: true,
        carrier_id: null
      })
    }
  }, [template])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {template ? "Editar Plantilla" : "Nueva Plantilla"}
            </DialogTitle>
            <DialogDescription>
              Configura los detalles y el contenido de la plantilla de email
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="mt-4">
            <TabsList>
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="content">Contenido del Email</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <EmailTemplateDetailsForm 
                formData={formData}
                setFormData={setFormData}
              />
            </TabsContent>

            <TabsContent value="content">
              <EmailTemplateContentForm 
                formData={formData}
                setFormData={setFormData}
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
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