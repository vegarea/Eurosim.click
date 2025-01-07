import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, MessageCircle, X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ChatMessage } from "../esim/chat/ChatMessage"
import { TypingIndicator } from "../esim/chat/TypingIndicator"
import { useQuery } from "@tanstack/react-query"
import { useFloatingChat } from "@/hooks/useFloatingChat"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface FloatingChatProps {
  isModal?: boolean;
}

export function FloatingChat({ isModal = false }: FloatingChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { isOpen, toggleChat } = useFloatingChat()

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

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mostrar mensaje de bienvenida cuando se abre el chat
  useEffect(() => {
    if ((isOpen || isModal) && messages.length === 0 && chatSettings?.ai_welcome_message) {
      setMessages([{
        role: 'assistant',
        content: chatSettings.ai_welcome_message
      }])
    }
  }, [isOpen, isModal, chatSettings])

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true)
      
      const newMessages: Message[] = [...messages, { role: 'user', content: message }]
      setMessages(newMessages)
      setInput("")
      setIsTyping(true)

      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          role: 'sales',
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

  if (!isModal && (!chatSettings?.is_active || chatSettings?.chat_type !== 'ai')) {
    return null
  }

  const renderChatContent = () => (
    <>
      <div className="p-4 bg-primary text-white flex justify-between items-center">
        <h3 className="font-medium">Asistente Virtual</h3>
        {!isModal && (
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white/80"
            onClick={toggleChat}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div 
        ref={scrollAreaRef}
        className="flex-1 p-4 overflow-y-auto touch-pan-y space-y-4"
      >
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Escribe tu mensaje..."
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
    </>
  )

  if (isModal) {
    return renderChatContent()
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[90vw] sm:w-[400px] bg-white rounded-lg shadow-xl border overflow-hidden"
          >
            {renderChatContent()}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg",
          isOpen && "bg-primary/90 hover:bg-primary/80"
        )}
        onClick={toggleChat}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}