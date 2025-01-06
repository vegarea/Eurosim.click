import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, HelpCircle, MessageSquare, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const navigate = useNavigate();

  const handlePreSaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Pre-sale form submitted:", { name, email, message });
  };

  const handleOrderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching order for email:", orderEmail);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="w-full px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Sección Pre-venta */}
          <div className="bg-brand-50 p-8 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
              ¿Tienes dudas? Estamos aquí para ayudarte
            </h2>
            <p className="text-gray-600 mb-8">
              Elige la forma que prefieras para resolver todas tus dudas sobre nuestros servicios de eSIM y SIM para Europa
            </p>

            <div className="space-y-4 mb-8">
              <Button 
                variant="outline"
                className="w-full justify-start text-gray-700 hover:text-primary hover:border-primary hover:bg-white/50 group transition-all duration-300"
                onClick={() => navigate("/assistant")}
              >
                <Bot className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Asistente Virtual 24/7
              </Button>

              <Button 
                variant="outline"
                className="w-full justify-start text-gray-700 hover:text-primary hover:border-primary hover:bg-white/50 group transition-all duration-300"
                onClick={() => navigate("/#frequent-questions")}
              >
                <HelpCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Preguntas Frecuentes
              </Button>

              <Button 
                variant="outline"
                className="w-full justify-start text-gray-700 hover:text-primary hover:border-primary hover:bg-white/50 group transition-all duration-300"
                onClick={() => window.open("https://wa.me/+34600000000", "_blank")}
              >
                <MessageSquare className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                Escríbenos por WhatsApp
              </Button>
            </div>

            <form onSubmit={handlePreSaleSubmit} className="space-y-4">
              <div className="transform hover:scale-[1.01] transition-transform duration-200">
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/70 backdrop-blur-sm focus:bg-white transition-colors duration-200"
                />
              </div>
              <div className="transform hover:scale-[1.01] transition-transform duration-200">
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/70 backdrop-blur-sm focus:bg-white transition-colors duration-200"
                />
              </div>
              <div className="transform hover:scale-[1.01] transition-transform duration-200">
                <Textarea
                  placeholder="Tu mensaje"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/70 backdrop-blur-sm focus:bg-white transition-colors duration-200"
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                Enviar mensaje
              </Button>
            </form>
          </div>

          {/* Sección Post-venta */}
          <div className="border border-gray-100 p-8 rounded-2xl shadow-sm bg-gradient-to-br from-white to-brand-50/20">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
              Soporte y Atención a Clientes
            </h2>
            <p className="text-gray-600 mb-8">
              ¿Ya eres cliente? Aquí puedes verificar el estado de tu pedido y obtener soporte técnico para tu eSIM o SIM física
            </p>

            <form onSubmit={handleOrderSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingresa el email que usaste en tu compra para ver el estado de tu pedido
                </label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={orderEmail}
                    onChange={(e) => setOrderEmail(e.target.value)}
                    className="flex-1 bg-white border-gray-200 focus:border-primary/50 transition-colors duration-200"
                  />
                  <Button type="submit" variant="outline" className="shrink-0 border-primary/20 hover:border-primary hover:bg-primary/5">
                    <Search className="h-4 w-4 mr-2" />
                    Verificar pedido
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-8 p-4 bg-brand-50 rounded-lg animate-fade-in">
              <p className="text-sm text-gray-600">
                Si necesitas ayuda adicional, no dudes en contactar con nuestro equipo de soporte a través de WhatsApp o email.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}