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

  const genderMap: Record<string, string> = {
    M: "Masculino",
    F: "Femenino"
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-700 text-sm">
          Por favor, revisa cuidadosamente tu información antes de continuar con el pago.
          Presta especial atención a la <strong>fecha de activación</strong>, ya que determinará cuándo comenzará tu servicio.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {Object.entries(formData).map(([key, value]) => {
          // Si el campo es género, transformamos el valor
          const displayValue = key === 'gender' ? genderMap[value as string] || value : value;
          
          return (
            <ReviewField
              key={key}
              label={fieldLabels[key]}
              value={displayValue as string | Date}
              onUpdate={(newValue) => onUpdateField(key, newValue)}
              type={key.includes("Date") ? "date" : "text"}
              isActivationDate={key === "activationDate"}
            />
          );
        })}
      </div>
    </div>
  )
}