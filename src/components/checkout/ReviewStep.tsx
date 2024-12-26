import { ReviewField } from "./ReviewField"

interface ReviewStepProps {
  formData: any
  onUpdateField: (field: string, value: any) => void
}

export function ReviewStep({ formData, onUpdateField }: ReviewStepProps) {
  const fieldLabels: Record<string, string> = {
    fullName: "Nombre completo",
    birthDate: "Fecha de nacimiento",
    gender: "Género",
    passportNumber: "Número de pasaporte",
    activationDate: "Fecha de activación"
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {Object.entries(formData).map(([key, value]) => (
          <ReviewField
            key={key}
            label={fieldLabels[key]}
            value={value as string | Date}
            onUpdate={(newValue) => onUpdateField(key, newValue)}
            type={key.includes("Date") ? "date" : "text"}
          />
        ))}
      </div>
    </div>
  )
}