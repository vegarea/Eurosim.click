
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AiraloConfig } from "./AiraloConfig"
import { AiraloProducts } from "./AiraloProducts"
import { AiraloOrders } from "./AiraloOrders"
import { AiraloReports } from "./AiraloReports"
import { Globe } from "lucide-react"

export function AdminAiralo() {
  const [activeTab, setActiveTab] = useState("config")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Globe className="h-8 w-8 text-brand-500" />
            Integración Airalo
          </h2>
          <p className="text-muted-foreground">
            Gestiona la integración con Airalo para la provisión de eSIMs internacionales
          </p>
        </div>
      </div>

      <Tabs defaultValue="config" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="config">Configuración</TabsTrigger>
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="space-y-4">
          <AiraloConfig />
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <AiraloProducts />
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <AiraloOrders />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <AiraloReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}
