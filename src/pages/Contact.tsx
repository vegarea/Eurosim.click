import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, MessageSquare } from "lucide-react";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/layouts/MainLayout";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setEmail("");
    setName("");
    setMessage("");
  };

  return (
    <MainLayout>
      <div className="min-h-screen w-full">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                ¿Cómo podemos ayudarte?
              </h1>
              <p className="text-lg text-gray-600">
                Elige la forma que prefieras para contactarnos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Button
                variant="outline"
                className="h-auto p-6 bg-gradient-to-br from-brand-50 to-white hover:shadow-lg transition-all duration-300 group"
                onClick={() => window.location.href = "/assistant"}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Bot className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Asistente Virtual</h3>
                  <p className="text-sm text-gray-600">
                    Respuestas instantáneas 24/7 a tus consultas más frecuentes
                  </p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-6 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all duration-300 group"
                onClick={() => window.open("https://wa.me/+34600000000", "_blank")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <p className="text-sm text-gray-600">
                    Chatea con nuestro equipo de soporte en tiempo real
                  </p>
                </div>
              </Button>
            </div>

            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Envíanos un mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors duration-200"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      placeholder="Tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors duration-200"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="Tu mensaje"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors duration-200 min-h-[120px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white"
                  >
                    Enviar mensaje
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
