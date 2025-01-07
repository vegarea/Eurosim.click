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
      <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800 mb-4">
                ¿Cómo podemos ayudarte?
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Elige la forma que prefieras para contactarnos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <Button
                variant="outline"
                className="group relative h-auto p-8 bg-white hover:bg-gradient-to-br hover:from-brand-50 hover:to-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                onClick={() => window.location.href = "/assistant"}
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-xl bg-brand-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Bot className="h-7 w-7 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Asistente Virtual</h3>
                  <p className="text-gray-600">
                    Respuestas instantáneas 24/7 a tus consultas más frecuentes
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-100/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>

              <Button
                variant="outline"
                className="group relative h-auto p-8 bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                onClick={() => window.open("https://wa.me/+34600000000", "_blank")}
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <p className="text-gray-600">
                    Chatea con nuestro equipo de soporte en tiempo real
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </div>

            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 animate-fade-in">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
                  Envíanos un mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Input
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors duration-200 rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors duration-200 rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Tu mensaje"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] bg-gray-50/50 border-gray-200 focus:bg-white transition-colors duration-200 rounded-lg resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
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