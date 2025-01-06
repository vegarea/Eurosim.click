import { Bot, User } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatMessageProps {
  message: Message
  index: number
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className={`flex items-start max-w-[80%] space-x-2 ${
        message.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
      }`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.role === 'user' 
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-100'
        }`}>
          {message.role === 'user' ? (
            <User className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-lg",
            message.role === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-gray-100 text-gray-900'
          )}
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  )
}