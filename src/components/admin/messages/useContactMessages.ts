
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { ContactMessage } from "./types"
import { toast } from "sonner"

export function useContactMessages() {
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

  return {
    messages,
    loading,
    selectedMessage,
    responseText,
    responding,
    activeTab,
    setSelectedMessage,
    setResponseText,
    setActiveTab,
    fetchMessages,
    markAsRead,
    sendResponse,
    archiveMessage
  }
}
