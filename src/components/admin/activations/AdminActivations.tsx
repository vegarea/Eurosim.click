import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpcomingActivations } from "./UpcomingActivations"
import { ActivationsHistory } from "./ActivationsHistory"
import { Card } from "@/components/ui/card"

export function AdminActivations() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Activaciones</h2>
        <p className="text-muted-foreground">
          Gestiona las activaciones programadas y el historial de activaciones
        </p>
      </div>

      <Card>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger 
              value="upcoming" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-500"
            >
              Próximas Activaciones
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-500"
            >
              Historial de Activaciones
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="p-6">
            <UpcomingActivations />
          </TabsContent>
          <TabsContent value="history" className="p-6">
            <ActivationsHistory />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}