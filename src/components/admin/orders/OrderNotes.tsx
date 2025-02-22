import { useState } from "react"
import { UIOrder } from "@/types/ui/orders"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface OrderNotesProps {
  order: UIOrder
  onAddNote?: (text: string) => void
}

export function OrderNotes({ order, onAddNote }: OrderNotesProps) {
  const [newNote, setNewNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) {
      toast.error("La nota no puede estar vacía")
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('order_events')
        .insert({
          order_id: order.id,
          type: 'note_added',
          description: newNote.trim(),
          metadata: {
            automated: false
          }
        })

      if (error) throw error

      setNewNote("")
      onAddNote?.(newNote.trim())
      toast.success("Nota añadida correctamente")
    } catch (error) {
      console.error('Error al añadir nota:', error)
      toast.error("Error al añadir la nota")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Filtrar eventos que son notas
  const noteEvents = (order.events || [])
    .filter(event => event.type === 'note_added')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-gray-500" />
          Notas del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Añadir una nota..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[80px]"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-10 w-10"
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <div className="mt-6 space-y-4">
          {noteEvents.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No hay notas para este pedido
            </p>
          )}
          
          {noteEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-gray-50 p-4 rounded-lg space-y-2"
            >
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium">
                  {event.user_id ? 'Admin' : 'Sistema'}
                </span>
                <span>{formatDateTime(event.created_at)}</span>
              </div>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}