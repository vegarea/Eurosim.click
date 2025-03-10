import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, MessageCircle, Send } from "lucide-react";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/layouts/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { WhatsAppModal } from "@/components/chat/WhatsAppModal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FloatingChat } from "@/components/chat/FloatingChat";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, message }
      });

      if (error) throw error;

      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      // Limpiar el formulario
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      toast({
        title: "Error al enviar el mensaje",
        description: "Por favor, intenta nuevamente más tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen w-full bg-gradient-to-br from-brand-50/50 via-white to-brand-50/30">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                  ¿Cómo podemos ayudarte?
                </h1>
                <p className="mt-2 text-gray-600 text-lg">
                  Estamos aquí para hacer tu experiencia más fácil y agradable
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <Button
                  variant="outline"
                  className="w-full group relative h-auto p-6 bg-white hover:bg-gradient-to-br hover:from-brand-50 hover:to-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsAIModalOpen(true)}
                >
                  <div className="relative z-10 flex items-center text-left space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-brand-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Bot className="h-6 w-6 text-brand-600" />
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
                  className="w-full group relative h-auto p-6 bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsWhatsAppModalOpen(true)}
                >
                  <div className="relative z-10 flex items-center text-left space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-green-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h3>
                      <p className="text-sm text-gray-600">
                        Chatea con nuestro equipo
                      </p>
                    </div>
                  </div>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100/50 p-6 md:p-8"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
                  Envíanos un mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Input
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      placeholder="Tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="Tu mensaje"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] bg-gray-50/50 border-gray-200 focus:bg-white transition-colors duration-200 resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    disabled={isLoading}
                  >
                    <Send className="w-4 h-4" />
                    {isLoading ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Modales */}
      <WhatsAppModal 
        open={isWhatsAppModalOpen} 
        onOpenChange={setIsWhatsAppModalOpen} 
      />

      <Dialog open={isAIModalOpen} onOpenChange={setIsAIModalOpen}>
        <DialogContent className="p-0 max-w-[500px] bg-white">
          <DialogTitle className="sr-only">Asistente Virtual</DialogTitle>
          <div className="h-[600px] flex flex-col">
            <FloatingChat isModal={true} />
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}