import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

interface CheckoutNavigationProps {
  step: number;
  isFormValid: boolean;
  onBack: () => void;
  onSubmit: (formData: any) => void;
  formData: Record<string, any>;
}

export function CheckoutNavigation({ 
  step, 
  isFormValid, 
  onBack, 
  onSubmit,
  formData 
}: CheckoutNavigationProps) {
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    console.log("CheckoutNavigation state:", {
      step,
      isFormValid,
      formData
    });
    setCanProceed(isFormValid);
  }, [step, isFormValid, formData]);

  return (
    <div className="flex justify-between mt-8">
      {step > 1 && (
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
      )}
      {step < 4 && (
        <Button
          className="ml-auto flex items-center gap-2"
          onClick={() => canProceed && onSubmit(formData)}
          disabled={!canProceed}
        >
          Siguiente
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}