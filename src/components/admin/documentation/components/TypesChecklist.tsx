import React from 'react'
import { Check, AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ChecklistItem } from "../types/ChecklistTypes"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface TypesChecklistProps {
  items: ChecklistItem[]
  onVerifyTypes?: (categoryId: string) => void
}

export function TypesChecklist({ items, onVerifyTypes }: TypesChecklistProps) {
  const { toast } = useToast()

  const handleVerify = async (categoryId: string) => {
    if (onVerifyTypes) {
      console.log('Verificando y actualizando tipos para categoría:', categoryId);
      
      toast({
        title: "Actualizando tipos",
        description: "Convirtiendo tipos al formato Supabase...",
      })
      
      onVerifyTypes(categoryId)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="default" className="bg-green-500">
            Actualizado a Supabase
          </Badge>
        );
      case 'reviewed':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Verificado - Pendiente Actualizar
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            Pendiente Revisión
          </Badge>
        );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Verificación de Tipos</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
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
                    Verificar y Actualizar Tipos
                  </Button>
                </div>
                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-2 p-4 rounded-lg bg-white border"
                    >
                      {item.status === "completed" ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{item.name}</p>
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        
                        {item.currentType && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700">Tipo Actual:</p>
                            <pre className="mt-1 p-2 bg-gray-50 rounded text-sm overflow-x-auto">
                              {item.currentType}
                            </pre>
                          </div>
                        )}
                        
                        {item.supabaseType && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-green-700">Tipo Supabase Actualizado:</p>
                            <pre className="mt-1 p-2 bg-green-50 rounded text-sm overflow-x-auto">
                              {item.supabaseType}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}