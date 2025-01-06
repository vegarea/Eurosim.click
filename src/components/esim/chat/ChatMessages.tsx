import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatePresence } from "framer-motion"
import { ChatMessage } from "./ChatMessage"
import { TypingIndicator } from "./TypingIndicator"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
  isTyping: boolean
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll suave al último mensaje
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  return (
    <ScrollArea className="flex-1 p-4 border rounded-lg mb-4 h-[500px]">
      <div className="space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} index={index} />
          ))}
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
      </div>
      <div ref={scrollRef} />
    </ScrollArea>
  )
}