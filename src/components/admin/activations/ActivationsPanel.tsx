import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpcomingActivations } from "./UpcomingActivations"
import { ActivationsHistory } from "./ActivationsHistory"
import { Calendar, History } from "lucide-react"

export function ActivationsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Activaciones</h2>
      
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Próximas Activaciones
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Historial de Activaciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <UpcomingActivations />
        </TabsContent>

        <TabsContent value="history">
          <ActivationsHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}