import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { TrackingScripts } from "../tracking/TrackingScripts"
import { FloatingChat } from "../chat/FloatingChat"
import { WhatsAppBubble } from "../chat/WhatsAppBubble"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

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
    <div className="min-h-screen flex flex-col">
      <TrackingScripts />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {chatSettings?.chat_type === 'ai' ? (
        <FloatingChat />
      ) : chatSettings?.chat_type === 'whatsapp' ? (
        <WhatsAppBubble />
      ) : null}
    </div>
  )
}