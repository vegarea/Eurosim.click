import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

interface WhatsAppModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WhatsAppModal({ open, onOpenChange }: WhatsAppModalProps) {
  const [message, setMessage] = useState("")

  const { data: chatSettings } = useQuery({
    queryKey: ['chat-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_settings')
        .select('*')
        .single()
      
      if (error) throw error
      return data
    }
  })

  const handleSendMessage = () => {
    if (chatSettings?.whatsapp_number && message.trim()) {
      const cleanNumber = chatSettings.whatsapp_number.replace(/[\s\(\)\-\+]/g, '')
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`
      window.open(whatsappUrl, "_blank")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enviar mensaje por WhatsApp</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder={chatSettings?.whatsapp_message || "Escribe tu mensaje..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && message.trim()) {
                  handleSendMessage()
                }
              }}
            />
          </div>
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            Enviar mensaje
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}