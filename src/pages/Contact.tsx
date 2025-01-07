import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, MessageSquare, Send } from "lucide-react";
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
      <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-brand-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
                ¿Cómo podemos ayudarte?
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Columna de botones */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full group relative h-auto p-6 bg-white hover:bg-gradient-to-br hover:from-brand-50 hover:to-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = "/assistant"}
                >
                  <div className="relative z-10 flex items-center text-left space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Bot className="h-5 w-5 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Asistente Virtual</h3>
                      <p className="text-sm text-gray-600">
                        Respuestas instantáneas 24/7
                      </p>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full group relative h-auto p-6 bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.open("https://wa.me/+34600000000", "_blank")}
                >
                  <div className="relative z-10 flex items-center text-left space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h3>
                      <p className="text-sm text-gray-600">
                        Chatea con nuestro equipo
                      </p>
                    </div>
                  </div>
                </Button>
              </div>

              {/* Columna del formulario */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
                  Envíanos un mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors duration-200"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      placeholder="Tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors duration-200"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="Tu mensaje"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[100px] bg-gray-50/50 border-gray-200 focus:bg-white transition-colors duration-200 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-10 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
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