import { Check, AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ChecklistItem } from "../types/ChecklistTypes"

interface TypesChecklistProps {
  items: ChecklistItem[]
  onVerifyTypes?: (categoryId: string) => void
}

export function TypesChecklist({ items, onVerifyTypes }: TypesChecklistProps) {
  const { toast } = useToast()

  const handleVerify = async (categoryId: string) => {
    if (onVerifyTypes) {
      toast({
        title: "Verificando tipos",
        description: "Analizando y documentando tipos del área seleccionada...",
      })
      onVerifyTypes(categoryId)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Verificación de Tipos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium">{category.category}</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleVerify(category.id)}
                >
                  <RefreshCw className="h-4 w-4" />
                  Verificar Tipos
                </Button>
              </div>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50"
                  >
                    {item.status === "completed" || item.status === "reviewed" ? (
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        {item.name}
                        {item.status === "reviewed" && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Verificado
                          </span>
                        )}
                      </p>
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