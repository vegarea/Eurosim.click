import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Smartphone } from "lucide-react"
import { useEffect, useRef } from "react"

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  isLoading: boolean
  onSend: () => void
  showChat: boolean
  placeholder: string
}

export function ChatInput({ input, setInput, isLoading, onSend, showChat, placeholder }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [showChat])

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="relative flex-1">
        {!showChat && (
          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={cn(!showChat ? "pl-10" : "")}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim() && !isLoading) {
              onSend()
            }
          }}
        />
      </div>
      <Button 
        onClick={onSend}
        disabled={!input.trim() || isLoading}
        className={cn(
          "w-full md:w-auto",
          !showChat && "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          showChat ? 'Enviar' : 'Verificar'
        )}
      </Button>
    </div>
  )
}