import { useState } from "react"
import { CompatibilityChat } from "./esim/CompatibilityChat"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function SimQuiz() {
  const [showCompatibilityChat, setShowCompatibilityChat] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  if (showCompatibilityChat) {
    return <CompatibilityChat />
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    if (option === "not_sure") {
      setShowCompatibilityChat(true)
    }
  }

  if (selectedOption && selectedOption !== "not_sure") {
    return (
      <div className="space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Recomendación de SIM
          </DialogTitle>
          <DialogDescription className="text-center">
            {selectedOption === "compatible" ? (
              <>
                ¡Excelente! Tu dispositivo es compatible con eSIM. Te recomendamos:
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">eSIM Europa</h4>
                  <p className="text-sm text-green-600">Activación instantánea y sin complicaciones</p>
                </div>
              </>
            ) : (
              <>
                No hay problema. Tenemos una solución perfecta para ti:
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">SIM Física Europa</h4>
                  <p className="text-sm text-blue-600">Compatible con todos los dispositivos</p>
                </div>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <Button 
            onClick={() => setSelectedOption(null)}
            variant="outline"
            className="mr-2"
          >
            Volver
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Ver detalles
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-center">
          ¿Tu teléfono es compatible con eSIM?
        </DialogTitle>
        <DialogDescription className="text-center">
          Selecciona una opción para ayudarte a elegir la mejor SIM para ti
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-3">
        <button
          onClick={() => handleOptionSelect("compatible")}
          className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 border"
        >
          Sí, mi teléfono es compatible con eSIM
        </button>
        <button
          onClick={() => handleOptionSelect("not_compatible")}
          className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 border"
        >
          No, mi teléfono no es compatible con eSIM
        </button>
        <button
          onClick={() => handleOptionSelect("not_sure")}
          className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 border"
        >
          No estoy seguro
        </button>
      </div>
    </div>
  )
}