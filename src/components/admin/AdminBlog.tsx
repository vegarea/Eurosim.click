import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Settings } from "lucide-react"
import { BlogHeader } from "./blog/BlogHeader"
import { ArticlesList } from "./blog/ArticlesList"
import { AutomationSettings } from "./blog/AutomationSettings"

export function AdminBlog() {
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
            <Settings className="h-4 w-4" />
            Automatización
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <ArticlesList />
        </TabsContent>

        <TabsContent value="automation">
          <AutomationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}