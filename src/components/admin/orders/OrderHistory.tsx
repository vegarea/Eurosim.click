import { OrderEvent } from "./types"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { History, User, Bot } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface OrderHistoryProps {
  events?: OrderEvent[]
}

export function OrderHistory({ events = [] }: OrderHistoryProps) {
  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEventIcon = (event: OrderEvent) => {
    if (event.metadata?.automated) {
      return <Bot className="h-4 w-4" />
    }
    return <User className="h-4 w-4" />
  }

  const getEventBadgeColor = (type: OrderEvent['type']) => {
    switch (type) {
      case 'created':
        return 'bg-green-100 text-green-800'
      case 'status_changed':
        return 'bg-blue-100 text-blue-800'
      case 'payment_processed':
        return 'bg-purple-100 text-purple-800'
      case 'automated_update':
        return 'bg-gray-100 text-gray-800'
      case 'note_added':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-gray-500" />
            Historial del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-4">
            No hay eventos registrados para este pedido
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-gray-500" />
          Historial del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div 
              key={event.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="mt-1">
                {getEventIcon(event)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary"
                      className={getEventBadgeColor(event.type)}
                    >
                      {event.type.replace('_', ' ')}
                    </Badge>
                    {event.user_name && (
                      <span className="text-sm font-medium">
                        {event.user_name}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(event.created_at)}
                  </span>
                </div>
                <p className="text-gray-700">{event.description}</p>
                {event.metadata?.oldStatus && event.metadata?.newStatus && (
                  <p className="text-sm text-gray-500">
                    Cambio de estado: {event.metadata.oldStatus} → {event.metadata.newStatus}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}