import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface CheckoutNavigationProps {
  step: number
  isFormValid: boolean
  onBack: () => void
  onSubmit: () => void
  formId: string
}

export function CheckoutNavigation({
  step,
  isFormValid,
  onBack,
  onSubmit,
  formId
}: CheckoutNavigationProps) {
  if (step === 3) return null;

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
        form={formId}
        disabled={!isFormValid}
      >
        Continuar
      </Button>
    </div>
  )
}