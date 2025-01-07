import { useState } from "react"
import { CompatibilityChat } from "./esim/CompatibilityChat"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Step = 'urgency' | 'compatibility' | 'recommendation';

export function SimQuiz() {
  const [currentStep, setCurrentStep] = useState<Step>('urgency')
  const [showCompatibilityChat, setShowCompatibilityChat] = useState(false)
  const [answers, setAnswers] = useState({
    isUrgent: false,
    isCompatible: null as boolean | null
  })
  const navigate = useNavigate()

  if (showCompatibilityChat) {
    return <CompatibilityChat />
  }

  const handleUrgencySelect = (isUrgent: boolean) => {
    setAnswers(prev => ({ ...prev, isUrgent }))
    setCurrentStep('compatibility')
  }

  const handleCompatibilitySelect = (option: string) => {
    if (option === 'not_sure') {
      setShowCompatibilityChat(true)
    } else {
      setAnswers(prev => ({ ...prev, isCompatible: option === 'compatible' }))
      setCurrentStep('recommendation')
    }
  }

  const getRecommendation = () => {
    // Si necesita la SIM en los próximos 3 días Y el teléfono no es compatible con eSIM
    if (answers.isUrgent && answers.isCompatible === false) {
      return {
        title: "Lo sentimos",
        description: "Para uso inmediato necesitas un teléfono compatible con eSIM. Con una SIM física el tiempo de entrega es de 3-5 días.",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-800",
        descColor: "text-yellow-600",
        route: "/sims"
      }
    }
    
    // Si necesita la SIM en los próximos 3 días Y el teléfono es compatible con eSIM
    if (answers.isUrgent && answers.isCompatible === true) {
      return {
        title: "eSIM Europa",
        description: "Activación instantánea para uso inmediato",
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        descColor: "text-green-600",
        route: "/e-sims"
      }
    }
    
    // Si no es urgente Y el teléfono es compatible con eSIM
    if (!answers.isUrgent && answers.isCompatible === true) {
      return {
        title: "eSIM Europa",
        description: "La opción más conveniente para dispositivos compatibles",
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        descColor: "text-green-600",
        route: "/e-sims"
      }
    }
    
    // Si no es urgente Y el teléfono NO es compatible con eSIM
    return {
      title: "SIM Física Europa",
      description: "Entrega en 3-5 días hábiles",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      descColor: "text-blue-600",
      route: "/sims"
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'urgency':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                ¿Cuándo necesitas la SIM?
              </DialogTitle>
              <DialogDescription className="text-center">
                Esto nos ayudará a recomendarte la mejor opción
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 mt-4">
              <button
                onClick={() => handleUrgencySelect(true)}
                className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 border flex justify-between items-center"
              >
                <span>En los próximos 3 días</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleUrgencySelect(false)}
                className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 border flex justify-between items-center"
              >
                <span>Puedo esperar más de 3 días</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </>
        )

      case 'compatibility':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                ¿Tu teléfono es compatible con eSIM?
              </DialogTitle>
              <DialogDescription className="text-center">
                Selecciona una opción para ayudarte a elegir la mejor SIM para ti
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 mt-4">
              <button
                onClick={() => handleCompatibilitySelect("compatible")}
                className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 border flex justify-between items-center"
              >
                <span>Sí, mi teléfono es compatible con eSIM</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleCompatibilitySelect("not_compatible")}
                className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 border flex justify-between items-center"
              >
                <span>No, mi teléfono no es compatible con eSIM</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleCompatibilitySelect("not_sure")}
                className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 border flex justify-between items-center"
              >
                <span>No estoy seguro</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            <div className="flex justify-start mt-6">
              <Button 
                variant="ghost"
                onClick={() => setCurrentStep('urgency')}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
            </div>
          </>
        )

      case 'recommendation':
        const recommendation = getRecommendation()
        return (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                Nuestra Recomendación
              </DialogTitle>
              <DialogDescription className="text-center">
                Basado en tus respuestas, te recomendamos:
                <div className={`mt-4 p-4 ${recommendation.bgColor} rounded-lg`}>
                  <h4 className={`font-medium ${recommendation.textColor}`}>
                    {recommendation.title}
                  </h4>
                  <p className={`text-sm ${recommendation.descColor}`}>
                    {recommendation.description}
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-between mt-6">
              <Button 
                variant="ghost"
                onClick={() => setCurrentStep('compatibility')}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate(recommendation.route)}
              >
                Ver detalles
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      {renderStep()}
    </div>
  )
}