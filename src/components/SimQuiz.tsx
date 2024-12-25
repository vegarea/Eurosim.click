import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { Smartphone, Plane, Globe2, CheckCircle2, Mail, Truck, AlertCircle } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { compatibleDevices, type BrandDevices, type DeviceModel } from "../data/compatibleDevices";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: "physical" | "esim" | "next" | "check-device";
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
      { text: "No estoy seguro", value: "check-device" },
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
  const [checkingDevice, setCheckingDevice] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const { toast } = useToast();

  const handleAnswer = (value: "physical" | "esim" | "next" | "check-device") => {
    if (value === "check-device") {
      setCheckingDevice(true);
      return;
    }

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

  const handleDeviceCheck = () => {
    const brand = compatibleDevices.find(b => b.name === selectedBrand);
    const model = brand?.models.find(m => m.name === selectedModel);

    if (model?.compatible) {
      setCheckingDevice(false);
      setCurrentQuestion(prev => prev + 1);
      toast({
        title: "¡Buenas noticias!",
        description: "Tu dispositivo es compatible con eSIM.",
      });
    } else {
      setResult("physical");
      setShowResult(true);
      toast({
        title: "Dispositivo no compatible",
        description: "Te recomendamos usar una SIM física para garantizar la compatibilidad.",
        variant: "destructive",
      });
    }
  };

  const getCurrentBrandModels = () => {
    return compatibleDevices.find(brand => brand.name === selectedBrand)?.models || [];
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setResult(null);
    setCheckingDevice(false);
    setSelectedBrand("");
    setSelectedModel("");
  };

  const getResultMessage = () => {
    if (result === "physical") {
      return {
        title: "Te recomendamos la SIM Física",
        description: "Recibirás tu SIM en tu domicilio antes de viajar, lista para usar en Europa.",
        icon: <Truck className="w-16 h-16 text-primary" />,
        detail: "Entrega en 72 hrs",
      };
    }
    return {
      title: "Te recomendamos la eSIM",
      description: "Instálala fácilmente escaneando un código QR y actívala cuando llegues a Europa.",
      icon: <Mail className="w-16 h-16 text-primary" />,
      detail: "Entrega de código QR vía email",
    };
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="relative overflow-hidden bg-gradient-to-br from-white to-brand-50/50 border-none shadow-lg">
        <CardContent className="p-6">
          {!showResult ? (
            checkingDevice ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Smartphone className="w-12 h-12 text-primary" />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Verifica la compatibilidad de tu dispositivo
                  </h3>
                  <p className="text-gray-600">
                    Selecciona tu marca y modelo para verificar si es compatible con eSIM
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Marca del dispositivo</label>
                    <Select
                      value={selectedBrand}
                      onValueChange={(value) => {
                        setSelectedBrand(value);
                        setSelectedModel("");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {compatibleDevices.map((brand) => (
                          <SelectItem key={brand.name} value={brand.name}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedBrand && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Modelo</label>
                      <Select
                        value={selectedModel}
                        onValueChange={setSelectedModel}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCurrentBrandModels().map((model) => (
                            <SelectItem 
                              key={model.name} 
                              value={model.name}
                              className={model.compatible ? "" : "text-destructive"}
                            >
                              {model.name}
                              {!model.compatible && (
                                <AlertCircle className="inline-block ml-2 w-4 h-4" />
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500 mt-2">
                        Si tu modelo no aparece en la lista, selecciona "Mi modelo no está en la lista"
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setCheckingDevice(false)}
                  >
                    Volver
                  </Button>
                  <Button
                    className="w-full"
                    disabled={!selectedBrand || !selectedModel}
                    onClick={handleDeviceCheck}
                  >
                    Verificar
                  </Button>
                </div>
              </motion.div>
            ) : (
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
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              {getResultMessage().icon}
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {getResultMessage().title}
                </h3>
                <p className="text-gray-600">
                  {getResultMessage().description}
                </p>
                <p className="text-sm text-primary font-medium mt-2">
                  {getResultMessage().detail}
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
