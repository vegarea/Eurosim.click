import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, ShoppingCart, Search, Palette, Plug, Bot, MessageCircle, Code2 } from "lucide-react"
import { CompanySettings } from "./settings/CompanySettings"
import { EcommerceSettings } from "./settings/EcommerceSettings"
import { SeoSettings } from "./settings/SeoSettings"
import { StyleSettings } from "./settings/StyleSettings"
import { IntegrationsSettings } from "./settings/IntegrationsSettings"
import { AIAssistantSettings } from "./settings/AIAssistantSettings"
import { ChatSettings } from "./settings/ChatSettings"
import { TrackingSettings } from "./settings/TrackingSettings"

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Administra la configuración general de tu aplicación
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="bg-brand-50">
          <TabsTrigger value="company" className="data-[state=active]:bg-white">
            <Building2 className="mr-2 h-4 w-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="ecommerce" className="data-[state=active]:bg-white">
            <ShoppingCart className="mr-2 h-4 w-4" />
            E-commerce
          </TabsTrigger>
          <TabsTrigger value="seo" className="data-[state=active]:bg-white">
            <Search className="mr-2 h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="style" className="data-[state=active]:bg-white">
            <Palette className="mr-2 h-4 w-4" />
            Estilo
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-white">
            <Plug className="mr-2 h-4 w-4" />
            Integraciones
          </TabsTrigger>
          <TabsTrigger value="assistant" className="data-[state=active]:bg-white">
            <Bot className="mr-2 h-4 w-4" />
            Asistente Virtual
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-white">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat Atención
          </TabsTrigger>
          <TabsTrigger value="tracking" className="data-[state=active]:bg-white">
            <Code2 className="mr-2 h-4 w-4" />
            Seguimiento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <CompanySettings />
        </TabsContent>

        <TabsContent value="ecommerce">
          <EcommerceSettings />
        </TabsContent>

        <TabsContent value="seo">
          <SeoSettings />
        </TabsContent>

        <TabsContent value="style">
          <StyleSettings />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationsSettings />
        </TabsContent>

        <TabsContent value="assistant">
          <AIAssistantSettings />
        </TabsContent>

        <TabsContent value="chat">
          <ChatSettings />
        </TabsContent>

        <TabsContent value="tracking">
          <TrackingSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}