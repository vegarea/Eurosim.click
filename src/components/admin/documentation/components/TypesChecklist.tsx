import { Check, AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ChecklistItem } from "../types/ChecklistTypes"
import { Badge } from "@/components/ui/badge"

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
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{category.category}</h3>
                  {category.items.every(item => item.status === "reviewed") && (
                    <Badge variant="success" className="bg-green-100 text-green-800">
                      Verificado ✓
                    </Badge>
                  )}
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
                    className={`flex items-start gap-2 p-2 rounded-lg ${
                      item.status === "reviewed" ? "bg-green-50" : "hover:bg-gray-50"
                    }`}
                  >
                    {item.status === "reviewed" ? (
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{item.name}</p>
                        {item.status === "reviewed" && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Verificado
                          </Badge>
                        )}
                      </div>
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