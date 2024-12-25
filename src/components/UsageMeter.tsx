import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Globe2, MapPin } from 'lucide-react';

interface UsageMeterProps {
  europeGB: number;
  spainGB: number;
  isHighlighted?: boolean;
}

export function UsageMeter({ europeGB, spainGB, isHighlighted = false }: UsageMeterProps) {
  const [europeProgress, setEuropeProgress] = useState(0);
  const [spainProgress, setSpainProgress] = useState(0);

  // Cálculo de días basado en uso promedio
  const europeDays = Math.round((europeGB * 1024) / 700); // Asumiendo 700MB por día en Europa
  const spainDays = Math.round((spainGB * 1024) / 1300); // Asumiendo 1.3GB por día en España

  useEffect(() => {
    // Animación de progreso
    const timer = setTimeout(() => {
      setEuropeProgress(Math.min((europeDays / 30) * 100, 100));
      setSpainProgress(Math.min((spainDays / 120) * 100, 100));
    }, 200);

    return () => clearTimeout(timer);
  }, [europeDays, spainDays]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl backdrop-blur-sm ${
        isHighlighted 
          ? 'bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg' 
          : 'bg-white/50'
      }`}
    >
      <h3 className="text-lg font-semibold mb-6 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        Días Estimados de Uso
      </h3>

      <div className="space-y-6">
        {/* Medidor Europa */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-primary" />
              <span className="font-medium">Europa</span>
            </div>
            <motion.span
              key={europeDays}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-bold text-lg"
            >
              {europeDays} días
            </motion.span>
          </div>
          <Progress value={europeProgress} className="h-3" />
          <p className="text-sm text-gray-500 text-right">
            {europeGB}GB ≈ {europeDays} días de uso
          </p>
        </motion.div>

        {/* Medidor España */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="font-medium">España</span>
            </div>
            <motion.span
              key={spainDays}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-bold text-lg"
            >
              {spainDays} días
            </motion.span>
          </div>
          <Progress value={spainProgress} className="h-3" />
          <p className="text-sm text-gray-500 text-right">
            {spainGB}GB ≈ {spainDays} días de uso
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}