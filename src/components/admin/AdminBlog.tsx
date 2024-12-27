import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Settings } from "lucide-react"
import { BlogHeader } from "./blog/BlogHeader"
import { ArticlesList } from "./blog/ArticlesList"
import { AutomationSettings } from "./blog/AutomationSettings"
import { BlogSettings } from "./blog/BlogSettings"

export function AdminBlog() {
  const [autoGenEnabled, setAutoGenEnabled] = useState(false)

  return (
    <div className="space-y-6">
      <BlogHeader />

      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="articles" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Artículos
          </TabsTrigger>
          <TabsTrigger value="automation" className="gap-2">
            <Calendar className="h-4 w-4" />
            Automatización
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <ArticlesList />
        </TabsContent>

        <TabsContent value="automation">
          <AutomationSettings
            autoGenEnabled={autoGenEnabled}
            onAutoGenChange={setAutoGenEnabled}
          />
        </TabsContent>

        <TabsContent value="settings">
          <BlogSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}