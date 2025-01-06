import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Smartphone } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { cn } from "@/lib/utils"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function CompatibilityChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true)
      setShowChat(true)
      
      const newMessages: Message[] = [...messages, { role: 'user' as const, content: message }]
      setMessages(newMessages)
      setInput("")

      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          role: 'compatibility_checker',
          message: message
        }
      })

      if (error) throw error

      setMessages([...newMessages, { role: 'assistant' as const, content: data.response }])
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className={cn(
        "transition-all duration-500 ease-in-out",
        showChat ? "h-0 opacity-0" : "h-auto opacity-100"
      )}>
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <h3 className="text-xl font-medium text-center text-gray-800">
            ¿Quieres saber si tu teléfono es compatible?
          </h3>
          <div className="w-full max-w-md space-y-4">
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Coloca el modelo de tu móvil"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input.trim() && !isLoading) {
                    sendMessage(input.trim())
                  }
                }}
              />
            </div>
            <Button 
              onClick={() => input.trim() && sendMessage(input.trim())}
              disabled={!input.trim() || isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                "Verificar Compatibilidad"
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className={cn(
        "transition-all duration-500 ease-in-out",
        !showChat ? "h-0 opacity-0" : "h-[500px] opacity-100"
      )}>
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
            placeholder="Haz una pregunta al asistente"
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
              'Enviar'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}