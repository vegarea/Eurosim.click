
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ContactMessage } from "./types"
import { MessageStatusBadge } from "./MessageStatusBadge"
import { MailOpen, Send, RefreshCw } from "lucide-react"
import { format } from "date-fns"

interface MessageDetailsProps {
  selectedMessage: ContactMessage | null
  responseText: string
  responding: boolean
  onResponseTextChange: (text: string) => void
  onSendResponse: () => void
}

export function MessageDetails({
  selectedMessage,
  responseText,
  responding,
  onResponseTextChange,
  onSendResponse
}: MessageDetailsProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm')
    } catch {
      return dateString
    }
  }

  if (!selectedMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <MailOpen className="h-12 w-12 text-gray-300 mb-4" />
        <p className="text-gray-500 text-center">
          Selecciona un mensaje para ver los detalles
        </p>
      </div>
    )
  }

  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Mensaje de {selectedMessage.name}</CardTitle>
            <CardDescription>
              <a href={`mailto:${selectedMessage.email}`} className="text-blue-500 hover:underline">
                {selectedMessage.email}
              </a>
              <span className="mx-2">•</span>
              <span>{formatDate(selectedMessage.created_at)}</span>
            </CardDescription>
          </div>
          <MessageStatusBadge status={selectedMessage.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-md whitespace-pre-line">
          {selectedMessage.message}
        </div>
        
        {selectedMessage.response ? (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Send className="h-4 w-4" /> Respuesta enviada
              <span className="text-xs text-gray-500">
                ({selectedMessage.responded_at ? formatDate(selectedMessage.responded_at) : ''})
              </span>
            </h4>
            <div className="p-4 bg-green-50 rounded-md whitespace-pre-line">
              {selectedMessage.response}
            </div>
          </div>
        ) : (
          <>
            <h4 className="font-medium">Enviar respuesta</h4>
            <Textarea
              placeholder="Escribe tu respuesta aquí..."
              value={responseText}
              onChange={(e) => onResponseTextChange(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="flex justify-end">
              <Button 
                onClick={onSendResponse} 
                disabled={!responseText.trim() || responding}
                className="flex items-center gap-2"
              >
                {responding ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar respuesta
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </>
  )
}
