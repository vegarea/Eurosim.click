
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ContactMessage } from "./types"
import { MessageStatusBadge } from "./MessageStatusBadge"
import { MailOpen, CheckCircle2, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface MessagesListProps {
  messages: ContactMessage[]
  loading: boolean
  onViewMessage: (message: ContactMessage) => void
  onMarkAsRead: (id: string) => void
  onArchiveMessage: (id: string) => void
}

export function MessagesList({
  messages,
  loading,
  onViewMessage,
  onMarkAsRead,
  onArchiveMessage
}: MessagesListProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm')
    } catch {
      return dateString
    }
  }

  return (
    <div className="max-h-[600px] overflow-auto">
      {messages.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          {loading ? 'Cargando...' : 'No hay mensajes disponibles'}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Remitente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow 
                key={message.id}
                className={message.status === 'nuevo' ? 'font-semibold bg-blue-50' : ''}
              >
                <TableCell 
                  className="cursor-pointer"
                  onClick={() => onViewMessage(message)}
                >
                  <div>{message.name}</div>
                  <div className="text-sm text-gray-500">{message.email}</div>
                </TableCell>
                <TableCell>{formatDate(message.created_at)}</TableCell>
                <TableCell><MessageStatusBadge status={message.status} /></TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onViewMessage(message)}
                      title="Ver mensaje"
                    >
                      <MailOpen className="h-4 w-4" />
                    </Button>
                    {message.status === 'nuevo' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onMarkAsRead(message.id)}
                        title="Marcar como leído"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onArchiveMessage(message.id)}
                      title="Archivar mensaje"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
