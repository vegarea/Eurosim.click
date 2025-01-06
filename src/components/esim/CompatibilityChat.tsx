import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { cn } from "@/lib/utils"
import { ChatInput } from "./chat/ChatInput"
import { ChatMessages } from "./chat/ChatMessages"

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

  const sendMessage = async (message: string) => {
    console.log("sendMessage called with:", message)
    if (!message.trim()) {
      console.log("Message is empty, returning")
      return
    }

    try {
      console.log("Setting loading state and showing chat")
      setIsLoading(true)
      setShowChat(true)
      
      const newMessages: Message[] = [...messages, { role: 'user', content: message }]
      setMessages(newMessages)
      setInput("")
      setIsTyping(true)

      console.log("Calling AI assistant")
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          role: 'compatibility_checker',
          message: message
        }
      })

      if (error) {
        console.error("Error from AI assistant:", error)
        throw error
      }

      console.log("Response received:", data)
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

  const handleSendMessage = () => {
    console.log("handleSendMessage called, input:", input)
    if (input.trim()) {
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col p-4 md:p-8">
      <div className={cn(
        "transition-all duration-500 ease-in-out",
        showChat ? "h-0 opacity-0" : "h-auto opacity-100"
      )}>
        <div className="flex flex-col items-center justify-center space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-800">
            ¿Tu teléfono es apto para eSIM?
          </h3>
        </div>
      </div>

      <div className={cn(
        "transition-all duration-500 ease-in-out",
        !showChat ? "h-0 opacity-0" : "opacity-100"
      )}>
        <ChatMessages 
          messages={messages}
          isTyping={isTyping}
        />
      </div>

      <ChatInput 
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSend={handleSendMessage}
        showChat={showChat}
        placeholder={!showChat ? "¿Cuál es el modelo de tu teléfono?" : "Escribe tu pregunta aquí"}
      />
    </div>
  )
}