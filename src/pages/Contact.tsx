import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, HelpCircle, MessageSquare, Search, Send, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

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
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full bg-gradient-to-b from-brand-50 to-white">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
          {/* Sección Pre-venta */}
          <div className="relative px-8 lg:px-12 py-12 bg-gradient-to-br from-brand-50/80 via-brand-100/50 to-brand-50/30 backdrop-blur-sm">
            <div className="max-w-xl mx-auto lg:mr-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
                ¿Tienes dudas? Estamos aquí para ayudarte
              </h2>
              <p className="text-base text-gray-600 mb-6 animate-fade-in delay-100">
                Elige la forma que prefieras para resolver todas tus dudas sobre nuestros servicios
              </p>

              <div className="space-y-2.5 mb-10">
                <Button 
                  variant="outline"
                  className="w-full justify-start text-gray-700 bg-white/80 hover:bg-primary hover:text-white group transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() => navigate("/assistant")}
                >
                  <Bot className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="flex-1 text-left text-sm">Asistente Virtual 24/7</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Button>

                <Button 
                  variant="outline"
                  className="w-full justify-start text-gray-700 bg-white/80 hover:bg-secondary hover:text-white group transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() => navigate("/#frequent-questions")}
                >
                  <HelpCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="flex-1 text-left text-sm">Preguntas Frecuentes</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Button>

                <Button 
                  variant="outline"
                  className="w-full justify-start text-gray-700 bg-white/80 hover:bg-green-500 hover:text-white group transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() => window.open("https://wa.me/+34600000000", "_blank")}
                >
                  <MessageSquare className="mr-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform duration-300" />
                  <span className="flex-1 text-left text-sm">Escríbenos por WhatsApp</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Button>
              </div>

              <form onSubmit={handlePreSaleSubmit} className="space-y-4 backdrop-blur-sm bg-white/40 p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                <div className="transform hover:scale-[1.01] transition-transform duration-200">
                  <Input
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm focus:bg-white transition-colors duration-200 border-gray-200 text-sm"
                  />
                </div>
                <div className="transform hover:scale-[1.01] transition-transform duration-200">
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm focus:bg-white transition-colors duration-200 border-gray-200 text-sm"
                  />
                </div>
                <div className="transform hover:scale-[1.01] transition-transform duration-200">
                  <Textarea
                    placeholder="Tu mensaje"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm focus:bg-white transition-colors duration-200 border-gray-200 min-h-[100px] text-sm"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white group text-sm">
                  <Send className="mr-2 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Enviar mensaje
                </Button>
              </form>
            </div>
          </div>

          {/* Sección Post-venta */}
          <div className="relative px-8 lg:px-12 py-12 bg-gradient-to-bl from-white via-brand-50/30 to-brand-50/10">
            <div className="max-w-xl mx-auto lg:ml-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-brand-800 to-brand-600">
                Soporte y Atención a Clientes
              </h2>
              <p className="text-base text-gray-600 mb-8 animate-fade-in delay-100">
                ¿Ya eres cliente? Aquí puedes verificar el estado de tu pedido y obtener soporte técnico
              </p>

              <form onSubmit={handleOrderSearch} className="space-y-6">
                <div className="backdrop-blur-sm bg-white/40 p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Ingresa el email que usaste en tu compra para ver el estado de tu pedido
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={orderEmail}
                      onChange={(e) => setOrderEmail(e.target.value)}
                      className="flex-1 bg-white/70 border-gray-200 focus:border-primary/50 transition-colors duration-200 text-sm"
                    />
                    <Button type="submit" variant="outline" className="shrink-0 border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 group text-sm">
                      <Search className="h-3 w-3 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Verificar
                    </Button>
                  </div>
                </div>
              </form>

              <div className="mt-8 p-5 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg animate-fade-in border border-white/50">
                <p className="text-sm text-gray-600">
                  Si necesitas ayuda adicional, no dudes en contactar con nuestro equipo de soporte a través de WhatsApp o email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}