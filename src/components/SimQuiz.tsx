import { useState } from "react"
import { CompatibilityChat } from "./esim/CompatibilityChat"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function SimQuiz() {
  const [showCompatibilityChat, setShowCompatibilityChat] = useState(false)

  if (showCompatibilityChat) {
    return <CompatibilityChat />
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
          onClick={() => setShowCompatibilityChat(false)}
          className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          Sí, mi teléfono es compatible con eSIM
        </button>
        <button
          onClick={() => setShowCompatibilityChat(false)}
          className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          No, mi teléfono no es compatible con eSIM
        </button>
        <button
          onClick={() => setShowCompatibilityChat(true)}
          className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          No estoy seguro
        </button>
      </div>
    </div>
  )
}