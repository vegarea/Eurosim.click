import { Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface CheckoutProgressProps {
  step: number;
}

export function CheckoutProgress({ step }: CheckoutProgressProps) {
  const progress = (step / 4) * 100;
  const steps = ['Información', 'Documentación', 'Revisión', 'Pago'];

  return (
    <div className="mb-8 space-y-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        {steps.map((stepName, index) => (
          <motion.div
            key={stepName}
            className={`flex items-center ${index + 1 <= step ? 'text-primary' : 'text-gray-400'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
              ${index + 1 <= step ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
              {index + 1 <= step ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className="ml-2 font-medium hidden sm:inline">{stepName}</span>
          </motion.div>
        ))}
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}