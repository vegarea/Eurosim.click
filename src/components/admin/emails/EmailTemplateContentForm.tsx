import { Label } from "@/components/ui/label"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { EmailTemplate } from "./types"

interface EmailTemplateContentFormProps {
  formData: EmailTemplate
  setFormData: (data: EmailTemplate) => void
}

export function EmailTemplateContentForm({ formData, setFormData }: EmailTemplateContentFormProps) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  return (
    <div className="grid gap-2">
      <Label>Contenido del Email</Label>
      <div className="min-h-[400px] border rounded-md">
        <ReactQuill 
          theme="snow"
          value={formData.content || ''}
          onChange={(content) => setFormData({ ...formData, content })}
          modules={modules}
          className="h-[350px]"
        />
      </div>
      <div className="mt-4 p-4 border rounded-md bg-muted">
        <p className="text-sm font-medium mb-2">Variables disponibles:</p>
        <div className="flex flex-wrap gap-2">
          {formData.variables.map((variable) => (
            <code key={variable} className="px-2 py-1 bg-background rounded text-sm">
              {`{${variable}}`}
            </code>
          ))}
        </div>
      </div>
    </div>
  )
}