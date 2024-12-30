import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface CheckoutNavigationProps {
  step: number
  isFormValid: boolean
  onBack: () => void
  onSubmit: (data: any) => void
  formData: any
}

export function CheckoutNavigation({
  step,
  isFormValid,
  onBack,
  onSubmit,
  formData
}: CheckoutNavigationProps) {
  if (step === 3) return null; // No mostrar navegación en el paso de revisión

  return (
    <div className="flex justify-between mt-6">
      {step > 1 ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Atrás
        </Button>
      ) : (
        <div></div>
      )}
      
      <Button
        type="submit"
        disabled={!isFormValid}
        onClick={() => onSubmit(formData)}
      >
        Continuar
      </Button>
    </div>
  )
}