import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Smartphone } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ChatMessage } from "./chat/ChatMessage"
import { TypingIndicator } from "./chat/TypingIndicator"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function CompatibilityChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true)
      setShowChat(true)
      
      const newMessages: Message[] = [...messages, { role: 'user', content: message }]
      setMessages(newMessages)
      setInput("")
      setIsTyping(true)

      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          role: 'compatibility_checker',
          message: message
        }
      })

      if (error) throw error

      const response = data.response
      const words = response.split(' ')
      let currentText = ''
      
      const tempMessages = [...newMessages]
      tempMessages.push({ role: 'assistant', content: '' })
      setMessages(tempMessages)

      for (let i = 0; i < words.length; i++) {
        currentText += words[i] + ' '
        setMessages(messages => {
          const updatedMessages = [...messages]
          updatedMessages[updatedMessages.length - 1] = {
            role: 'assistant',
            content: currentText.trim()
          }
          return updatedMessages
        })
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      
      setIsTyping(false)
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
        <div 
          ref={scrollAreaRef}
          className="flex-1 p-2 sm:p-4 border rounded-lg mb-4 overflow-y-auto h-[420px] touch-pan-y"
        >
          <div className="space-y-3 sm:space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatMessage role={message.role} content={message.content} />
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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