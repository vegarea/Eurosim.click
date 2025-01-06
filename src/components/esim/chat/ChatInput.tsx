import { Button } from "@/components/ui/button"
import { Loader2, Smartphone } from "lucide-react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  isLoading: boolean
  onSend: () => void
  showChat: boolean
  placeholder: string
}

export function ChatInput({ 
  input, 
  setInput, 
  isLoading, 
  onSend, 
  showChat, 
  placeholder 
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [showChat])

  const handleClick = () => {
    if (input.trim()) {
      onSend()
    }
  }

  console.log("ChatInput renderizado - Estado actual:", {
    input,
    isLoading,
    showChat,
    buttonDisabled: !input.trim()
  })

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="relative flex-1">
        {!showChat && (
          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => {
            console.log("Input cambiado:", {
              nuevoValor: e.target.value,
              trimmed: e.target.value.trim(),
              longitud: e.target.value.length
            })
            setInput(e.target.value)
          }}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !showChat && "pl-10"
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              onSend()
            }
          }}
        />
      </div>
      <Button 
        onClick={handleClick}
        disabled={!input.trim()}
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