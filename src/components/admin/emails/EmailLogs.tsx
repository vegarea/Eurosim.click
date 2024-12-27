import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react"

interface EmailLog {
  id: string
  date: string
  recipient: string
  subject: string
  status: 'success' | 'error' | 'pending' | 'warning'
  message?: string
}

// Datos de ejemplo - En una implementación real, estos vendrían de la API de Brevo
const mockLogs: EmailLog[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    recipient: 'usuario@ejemplo.com',
    subject: 'Confirmación de Pedido #123',
    status: 'success'
  },
  {
    id: '2',
    date: new Date(Date.now() - 3600000).toISOString(),
    recipient: 'otro@ejemplo.com',
    subject: 'Envío de E-SIM #456',
    status: 'error',
    message: 'Invalid email address'
  },
  {
    id: '3',
    date: new Date(Date.now() - 7200000).toISOString(),
    recipient: 'test@ejemplo.com',
    subject: 'Actualización de Envío',
    status: 'pending'
  }
]

const StatusIcon = ({ status }: { status: EmailLog['status'] }) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-orange-500" />
  }
}

const StatusBadge = ({ status }: { status: EmailLog['status'] }) => {
  const styles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    warning: 'bg-orange-100 text-orange-800'
  }

  return (
    <Badge className={`flex items-center gap-1 ${styles[status]}`}>
      <StatusIcon status={status} />
      <span className="capitalize">{status}</span>
    </Badge>
  )
}

export function EmailLogs() {
  return (
    <Card className="p-4">
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {mockLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{log.recipient}</p>
                  <StatusBadge status={log.status} />
                </div>
                <p className="text-sm text-muted-foreground">{log.subject}</p>
                {log.message && (
                  <p className="text-sm text-red-600">{log.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {new Date(log.date).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}