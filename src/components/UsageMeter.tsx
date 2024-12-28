import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import '/node_modules/flag-icons/css/flag-icons.min.css';

interface UsageMeterProps {
  europeGB: number;
  spainGB: number;
  isHighlighted?: boolean;
}

export function UsageMeter({ europeGB, spainGB, isHighlighted = false }: UsageMeterProps) {
  const [europeProgress, setEuropeProgress] = useState(0);
  const [spainProgress, setSpainProgress] = useState(0);

  const europeDays = Math.round((europeGB * 1024) / 700);
  const spainDays = Math.round((spainGB * 1024) / 1300);

  useEffect(() => {
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
      className={`p-4 rounded-xl backdrop-blur-sm ${
        isHighlighted 
          ? 'bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg' 
          : 'bg-white/50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Días Estimados de Uso
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <button className="inline-flex items-center justify-center">
              <Info className="h-4 w-4 text-gray-500 cursor-help" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Información sobre el uso estimado</DialogTitle>
              <DialogDescription>
                Estos datos son aproximados y están basados en un uso moderado que incluye:
                <ul className="list-disc ml-4 mt-2 space-y-1 text-sm">
                  <li>Uso frecuente de Google Maps para navegación</li>
                  <li>Redes sociales con publicación de fotos y videos</li>
                  <li>Videollamadas cortas (10-15 minutos por día)</li>
                  <li>Búsqueda frecuente de restaurantes, atracciones, etc</li>
                  <li>Uso de aplicaciones de streaming para música</li>
                </ul>
                <p className="mt-2 text-xs text-gray-500">El consumo real dependerá de tus hábitos de uso.</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {/* Medidor Europa */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-1.5"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="fi fi-eu w-4 h-4 rounded-sm shadow-sm"></span>
              <span className="text-sm font-medium">Europa</span>
            </div>
            <motion.span
              key={europeDays}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-bold text-base"
            >
              {europeDays} días
            </motion.span>
          </div>
          <Progress value={europeProgress} className="h-2" />
          <p className="text-xs text-gray-500 text-right">
            {europeGB}GB ≈ {europeDays} días de uso
          </p>
        </motion.div>

        {/* Medidor España */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-1.5"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="fi fi-es w-4 h-4 rounded-sm shadow-sm"></span>
              <span className="text-sm font-medium">España</span>
            </div>
            <motion.span
              key={spainDays}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-bold text-base"
            >
              {spainDays} días
            </motion.span>
          </div>
          <Progress value={spainProgress} className="h-2" />
          <p className="text-xs text-gray-500 text-right">
            {spainGB}GB ≈ {spainDays} días de uso
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}