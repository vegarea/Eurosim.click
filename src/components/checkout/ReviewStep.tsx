import { ReviewField } from "./ReviewField"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { DocumentationFormData, ShippingFormData } from "@/types/checkout.types"

interface ReviewStepProps {
  formData: Partial<DocumentationFormData & ShippingFormData>
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

  const formatValue = (key: string, value: any): string | Date => {
    if (!value) return "No especificado";

    // Para fechas, asegurarnos de que sean objetos Date
    if (key.includes("Date")) {
      if (value instanceof Date) {
        return value;
      }
      // Si es un objeto con _type: "Date", extraer el valor
      if (value._type === "Date" && value.value?.iso) {
        return new Date(value.value.iso);
      }
      // Si es un string de fecha
      return new Date(value);
    }
    
    if (key === "gender") {
      return genderMap[value as string] || value;
    }

    return String(value);
  }

  // Ordenar los campos para mostrarlos en un orden lógico
  const fieldOrder = [
    'fullName',
    'email',
    'phone',
    'address',
    'city',
    'state',
    'zipCode',
    'birthDate',
    'gender',
    'passportNumber',
    'activationDate'
  ];

  const sortedFields = Object.entries(formData)
    .sort(([keyA], [keyB]) => {
      const indexA = fieldOrder.indexOf(keyA);
      const indexB = fieldOrder.indexOf(keyB);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-700 text-sm">
          Por favor, revisa cuidadosamente tu información antes de continuar con el pago.
          La <strong>fecha de activación</strong> es especialmente importante ya que determinará cuándo podrás comenzar a usar tu servicio.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {sortedFields.map(([key, value]) => {
          if (value === undefined || value === null) return null;
          
          const formattedValue = formatValue(key, value);
          if (!formattedValue) return null;

          return (
            <ReviewField
              key={key}
              label={fieldLabels[key] || key}
              value={formattedValue}
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