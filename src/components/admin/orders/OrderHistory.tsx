import { OrderEvent } from "@/types/database/common"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  History, 
  User, 
  Bot, 
  Calendar,
  CreditCard,
  Truck,
  FileCheck,
  MessageSquare,
  AlertCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip } from "@/components/ui/tooltip"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <Calendar className="h-4 w-4" />
      case 'status_changed':
        return <History className="h-4 w-4" />
      case 'payment_processed':
        return <CreditCard className="h-4 w-4" />
      case 'shipping_updated':
        return <Truck className="h-4 w-4" />
      case 'document_validated':
        return <FileCheck className="h-4 w-4" />
      case 'note_added':
        return <MessageSquare className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'created':
        return 'bg-green-100 text-green-800'
      case 'status_changed':
        return 'bg-blue-100 text-blue-800'
      case 'payment_processed':
        return 'bg-purple-100 text-purple-800'
      case 'shipping_updated':
        return 'bg-amber-100 text-amber-800'
      case 'note_added':
        return 'bg-yellow-100 text-yellow-800'
      case 'document_validated':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventLabel = (type: string) => {
    switch (type) {
      case 'created':
        return 'Creación'
      case 'status_changed':
        return 'Cambio de Estado'
      case 'payment_processed':
        return 'Pago Procesado'
      case 'shipping_updated':
        return 'Envío Actualizado'
      case 'note_added':
        return 'Nota Añadida'
      case 'document_validated':
        return 'Documentación Validada'
      default:
        return type.replace('_', ' ')
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
    <TooltipProvider>
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
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="mt-1">
                  {event.metadata?.automated ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <Bot className="h-4 w-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Evento Automático</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger>
                        <User className="h-4 w-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Evento Manual</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary"
                        className={getEventBadgeColor(event.type)}
                      >
                        <span className="flex items-center gap-1">
                          {getEventIcon(event.type)}
                          {getEventLabel(event.type)}
                        </span>
                      </Badge>
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
                  {event.metadata?.details && (
                    <p className="text-sm text-gray-500">
                      {event.metadata.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}