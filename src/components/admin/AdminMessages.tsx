
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw } from "lucide-react"
import { MessagesList } from "./messages/MessagesList"
import { MessageDetails } from "./messages/MessageDetails"
import { useContactMessages } from "./messages/useContactMessages"

export function AdminMessages() {
  const {
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
  } = useContactMessages()

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
            <MessagesList 
              messages={messages}
              loading={loading}
              onViewMessage={setSelectedMessage}
              onMarkAsRead={markAsRead}
              onArchiveMessage={archiveMessage}
            />
          </CardContent>
        </Card>
        
        <Card>
          <MessageDetails
            selectedMessage={selectedMessage}
            responseText={responseText}
            responding={responding}
            onResponseTextChange={setResponseText}
            onSendResponse={sendResponse}
          />
        </Card>
      </div>
    </div>
  )
}
