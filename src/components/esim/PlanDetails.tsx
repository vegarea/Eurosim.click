import { motion } from "framer-motion";
import { UsageMeter } from "@/components/UsageMeter";

interface PlanDetailsProps {
  title: string;
  description: string;
  features: string[];
  europeGB: number;
  spainGB: number;
}

export function PlanDetails({ title, description, features, europeGB, spainGB }: PlanDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <span className="text-gray-700">{feature}</span>
          </motion.div>
        ))}
      </div>

      <UsageMeter
        europeGB={europeGB}
        spainGB={spainGB}
        isHighlighted={true}
      />
    </motion.div>
  );
}