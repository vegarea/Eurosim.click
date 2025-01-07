import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function WhatsAppBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { data: siteSettings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

  const handleSendMessage = () => {
    if (siteSettings?.whatsapp_number && message.trim()) {
      // Limpiar el número de teléfono
      const cleanNumber = siteSettings.whatsapp_number.replace(/[\s\(\)\-\+]/g, '');
      const formattedNumber = cleanNumber.startsWith('52') ? cleanNumber : 
                             cleanNumber.startsWith('1') ? cleanNumber :
                             `52${cleanNumber}`;
      
      // Crear la URL de WhatsApp con el mensaje codificado
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
      
      // Abrir WhatsApp en una nueva pestaña
      window.open(whatsappUrl, "_blank");
      
      // Resetear el estado
      setMessage("");
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 mb-4 overflow-hidden shadow-lg">
          <div className="bg-green-500 p-4 flex items-center justify-between">
            <span className="text-white font-medium">WhatsApp Chat</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-600"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 space-y-4">
            <p className="text-sm text-gray-600">
              Escribe tu mensaje y te responderemos por WhatsApp lo antes posible.
            </p>
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-green-500 hover:bg-green-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
}