import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { Smartphone, Plane, Globe2, CheckCircle2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: "physical" | "esim" | "next";
  }[];
  icon: React.ReactNode;
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Tu teléfono es compatible con eSIM?",
    icon: <Smartphone className="w-12 h-12 text-primary" />,
    options: [
      { text: "Sí, es compatible", value: "next" },
      { text: "No, no es compatible", value: "physical" },
      { text: "No estoy seguro", value: "next" },
    ],
  },
  {
    id: 2,
    text: "¿Cuándo viajas a Europa?",
    icon: <Plane className="w-12 h-12 text-primary" />,
    options: [
      { text: "En menos de 3 días", value: "esim" },
      { text: "En más de 3 días", value: "next" },
    ],
  },
  {
    id: 3,
    text: "¿Prefieres tener la SIM antes de viajar?",
    icon: <Globe2 className="w-12 h-12 text-primary" />,
    options: [
      { text: "Sí, me sentiría más seguro", value: "physical" },
      { text: "No es necesario", value: "esim" },
    ],
  },
];

const SimQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<"physical" | "esim" | null>(null);
  const { toast } = useToast();

  const handleAnswer = (value: "physical" | "esim" | "next") => {
    if (value === "physical") {
      setResult("physical");
      setShowResult(true);
    } else if (value === "esim") {
      setResult("esim");
      setShowResult(true);
    } else if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setResult(null);
  };

  const getResultMessage = () => {
    if (result === "physical") {
      return {
        title: "Te recomendamos la SIM Física",
        description: "Recibirás tu SIM en tu domicilio antes de viajar, lista para usar en Europa.",
      };
    }
    return {
      title: "Te recomendamos la eSIM",
      description: "Instálala fácilmente escaneando un código QR y actívala cuando llegues a Europa.",
    };
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="relative overflow-hidden bg-gradient-to-br from-white to-brand-50/50 border-none shadow-lg">
        <CardContent className="p-6">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center space-y-4 text-center">
                {questions[currentQuestion].icon}
                <h3 className="text-2xl font-semibold text-gray-800">
                  {questions[currentQuestion].text}
                </h3>
              </div>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full p-4 text-lg hover:bg-brand-50/50 transition-all"
                    onClick={() => handleAnswer(option.value)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={restartQuiz}
                  className="text-primary hover:text-primary/80"
                >
                  Reiniciar
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <CheckCircle2 className="w-16 h-16 mx-auto text-primary" />
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {getResultMessage().title}
                </h3>
                <p className="text-gray-600">
                  {getResultMessage().description}
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <Button
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "¡Excelente elección!",
                      description: "Te mostraremos los planes disponibles.",
                    });
                  }}
                >
                  Ver planes disponibles
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={restartQuiz}
                >
                  Volver a empezar
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimQuiz;