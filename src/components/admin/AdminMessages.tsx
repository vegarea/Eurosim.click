
import React, { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle2, 
  ClockIcon, 
  Filter, 
  MailOpen, 
  RefreshCw, 
  Send, 
  Trash2 
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

// Definir el tipo para mensajes de contacto
type ContactMessage = {
  id: string
  name: string
  email: string
  message: string
  status: string
  created_at: string
  response?: string
  responded_at?: string
  is_archived: boolean
}

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [responseText, setResponseText] = useState("")
  const [responding, setResponding] = useState(false)
  const [activeTab, setActiveTab] = useState("todos")

  useEffect(() => {
    fetchMessages()
  }, [activeTab])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (activeTab === "nuevos") {
        query = query.eq('status', 'nuevo')
      } else if (activeTab === "respondidos") {
        query = query.eq('status', 'respondido')
      } else if (activeTab === "archivados") {
        query = query.eq('is_archived', true)
      } else if (activeTab === "todos" || activeTab === "") {
        query = query.eq('is_archived', false)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error al cargar mensajes:', error)
      toast.error('Error al cargar mensajes')
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'leido' })
        .eq('id', id)
      
      if (error) throw error
      
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status: 'leido' } : msg
      ))
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status: 'leido' })
      }
      
      toast.success('Mensaje marcado como leído')
    } catch (error) {
      console.error('Error al actualizar estado:', error)
      toast.error('Error al marcar como leído')
    }
  }
  
  const sendResponse = async () => {
    if (!selectedMessage || !responseText.trim()) return
    
    setResponding(true)
    try {
      // Enviar respuesta por email
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          to: [selectedMessage.email],
          subject: 'Respuesta a tu mensaje de contacto',
          html: `
            <h1>Hola ${selectedMessage.name},</h1>
            <p>Hemos recibido tu mensaje y queremos responderte:</p>
            <blockquote style="margin: 15px 0; padding: 10px; border-left: 4px solid #ddd; color: #666;">
              ${responseText}
            </blockquote>
            <p>Gracias por contactarnos.</p>
            <p>El equipo de EuroSim</p>
          `
        }
      })
      
      if (emailError) throw emailError
      
      // Actualizar estado en la base de datos
      const { error: dbError } = await supabase
        .from('contact_messages')
        .update({
          status: 'respondido',
          response: responseText,
          responded_at: new Date().toISOString()
        })
        .eq('id', selectedMessage.id)
      
      if (dbError) throw dbError
      
      // Actualizar estados locales
      const updatedMessage = {
        ...selectedMessage,
        status: 'respondido',
        response: responseText,
        responded_at: new Date().toISOString()
      }
      
      setSelectedMessage(updatedMessage)
      setMessages(messages.map(msg => 
        msg.id === selectedMessage.id ? updatedMessage : msg
      ))
      
      toast.success('Respuesta enviada correctamente')
      setResponseText("")
    } catch (error) {
      console.error('Error al enviar respuesta:', error)
      toast.error('Error al enviar respuesta')
    } finally {
      setResponding(false)
    }
  }
  
  const archiveMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_archived: true })
        .eq('id', id)
      
      if (error) throw error
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null)
      }
      
      fetchMessages()
      toast.success('Mensaje archivado')
    } catch (error) {
      console.error('Error al archivar mensaje:', error)
      toast.error('Error al archivar mensaje')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'nuevo':
        return <Badge variant="default" className="bg-blue-500">Nuevo</Badge>
      case 'leido':
        return <Badge variant="outline" className="text-gray-500">Leído</Badge>
      case 'respondido':
        return <Badge variant="default" className="bg-green-500">Respondido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm')
    } catch {
      return dateString
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mensajes de Contacto</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchMessages}
          className="flex items-center gap-1"
        >
          <RefreshCw className="w-4 h-4" /> Actualizar
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="nuevos">Nuevos</TabsTrigger>
          <TabsTrigger value="respondidos">Respondidos</TabsTrigger>
          <TabsTrigger value="archivados">Archivados</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid md:grid-cols-[1fr_1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Mensajes</CardTitle>
            <CardDescription>
              {loading ? 'Cargando mensajes...' : `${messages.length} mensajes`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {messages.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {loading ? 'Cargando...' : 'No hay mensajes disponibles'}
              </div>
            ) : (
              <div className="max-h-[600px] overflow-auto">
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
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div>{message.name}</div>
                          <div className="text-sm text-gray-500">{message.email}</div>
                        </TableCell>
                        <TableCell>{formatDate(message.created_at)}</TableCell>
                        <TableCell>{getStatusBadge(message.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setSelectedMessage(message)}
                              title="Ver mensaje"
                            >
                              <MailOpen className="h-4 w-4" />
                            </Button>
                            {message.status === 'nuevo' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => markAsRead(message.id)}
                                title="Marcar como leído"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => archiveMessage(message.id)}
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
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          {selectedMessage ? (
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
                  {getStatusBadge(selectedMessage.status)}
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
                      onChange={(e) => setResponseText(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={sendResponse} 
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
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <MailOpen className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">
                Selecciona un mensaje para ver los detalles
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
