import { FloatingChat } from "../chat/FloatingChat"
import { WhatsAppBubble } from "../chat/WhatsAppBubble"
import { Footer } from "../Footer"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { TrackingScripts } from "../tracking/TrackingScripts"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { data: chatSettings } = useQuery({
    queryKey: ['chat-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_settings')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TrackingScripts />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      {chatSettings?.chat_type === 'ai' ? (
        <FloatingChat />
      ) : chatSettings?.chat_type === 'whatsapp' ? (
        <WhatsAppBubble />
      ) : null}
    </div>
  )
}