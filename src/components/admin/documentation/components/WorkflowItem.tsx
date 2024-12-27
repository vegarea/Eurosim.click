import { Check, X, ChevronDown, Eye } from "lucide-react"
import { useState } from "react"
import { WorkflowItem as WorkflowItemType } from "../types/WorkflowTypes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface WorkflowItemProps {
  item: WorkflowItemType;
}

export function WorkflowItem({ item }: WorkflowItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 space-y-2 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-gray-500">{item.id}</span>
          <span className="font-medium">{item.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {item.status === 'working' ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <X className="h-5 w-5 text-red-500" />
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">{item.id}</span>
                  {item.title}
                </DialogTitle>
                <DialogDescription>
                  Detalles técnicos y estado de implementación
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Descripción</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                
                {item.components && (
                  <div>
                    <h4 className="font-medium mb-2">Componentes Relacionados</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {item.components.map((component, index) => (
                        <li key={index}>{component}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.database && (
                  <div>
                    <h4 className="font-medium mb-2">Tablas de Base de Datos</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {item.database.map((table, index) => (
                        <li key={index}>{table}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.details && (
                  <div>
                    <h4 className="font-medium mb-2">Detalles Técnicos</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.details}</p>
                  </div>
                )}

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Estado</h4>
                  <div className="flex items-center gap-2">
                    {item.status === 'working' ? (
                      <>
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-green-600">Funcionando</span>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 text-red-500" />
                        <span className="text-sm text-red-600">Pendiente</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-600">{item.description}</p>
          {item.details && (
            <div className="text-sm bg-gray-50 p-2 rounded border text-gray-600">
              {item.details}
            </div>
          )}
        </div>
      )}
    </div>
  )
}