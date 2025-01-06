import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start max-w-[85%] space-x-2 ${
        role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
      }`}>
        <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
          role === 'user' 
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-100'
        }`}>
          {role === 'user' ? (
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </div>
        <div
          className={cn(
            "p-2 sm:p-3 rounded-lg",
            role === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-gray-100 text-gray-900'
          )}
        >
          {content}
        </div>
      </div>
    </div>
  )
}