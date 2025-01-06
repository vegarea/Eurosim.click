import { Bot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-2">
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  )
}