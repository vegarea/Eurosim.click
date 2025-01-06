import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function CompatibilityChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true)
      
      // Agregar mensaje del usuario al chat
      const newMessages = [...messages, { role: 'user', content: message }]
      setMessages(newMessages)
      setInput("")

      // Llamar al asistente a través de la Edge Function
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          role: 'compatibility_checker',
          message: message
        }
      })

      if (error) throw error

      // Agregar respuesta del asistente
      setMessages([...newMessages, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea className="flex-1 p-4 border rounded-lg mb-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted max-w-[80%] p-3 rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          placeholder="Coloca el modelo de tu móvil"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim() && !isLoading) {
              sendMessage(input.trim())
            }
          }}
        />
        <Button 
          onClick={() => input.trim() && sendMessage(input.trim())}
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Buscar'
          )}
        </Button>
      </div>
    </div>
  )
}