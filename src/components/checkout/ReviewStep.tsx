import { ReviewField } from "./ReviewField"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface ReviewStepProps {
  formData: any
  onUpdateField: (field: string, value: any) => void
}

export function ReviewStep({ formData, onUpdateField }: ReviewStepProps) {
  const fieldLabels: Record<string, string> = {
    fullName: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono",
    address: "Dirección",
    city: "Ciudad",
    state: "Estado/Provincia",
    zipCode: "Código postal",
    birthDate: "Fecha de nacimiento",
    gender: "Género",
    passportNumber: "Número de pasaporte",
    activationDate: "Fecha de activación"
  }

  const genderMap: Record<string, string> = {
    M: "Masculino",
    F: "Femenino"
  }

  const formatValue = (key: string, value: any): string => {
    if (!value) return "No especificado";

    if (key.includes("Date")) {
      // Verifica si value es un objeto Date o un string de fecha
      const date = value instanceof Date ? value : new Date(value);
      return format(date, "PPP", { locale: es });
    }
    
    if (key === "gender") {
      return genderMap[value as string] || value;
    }

    return String(value);
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-700 text-sm">
          Por favor, revisa cuidadosamente tu información antes de continuar con el pago.
          La <strong>fecha de activación</strong> es especialmente importante ya que determinará cuándo podrás comenzar a usar tu servicio.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {Object.entries(formData).map(([key, value]) => {
          if (value === undefined || value === null) return null;
          
          return (
            <ReviewField
              key={key}
              label={fieldLabels[key] || key}
              value={formatValue(key, value)}
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