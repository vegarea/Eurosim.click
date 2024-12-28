import { Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChecklistItem {
  id: string
  category: string
  items: Array<{
    name: string
    status: "pending" | "in_progress" | "completed"
    description: string
  }>
}

interface TypesChecklistProps {
  items: ChecklistItem[]
}

export function TypesChecklist({ items }: TypesChecklistProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Verificación de Tipos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((category) => (
            <div key={category.id}>
              <h3 className="font-medium mb-3">{category.category}</h3>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50"
                  >
                    {item.status === "completed" ? (
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}