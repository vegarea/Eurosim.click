import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { ChecklistItem } from "../types/ChecklistTypes"
import { orderTypes } from "./types/OrderTypes"
import { formTypes } from "./types/FormTypes"
import { adminTypes } from "./types/AdminTypes"

// Combine all type definitions
const types = [...orderTypes, ...formTypes, ...adminTypes]

export function TypesList() {
  return (
    <div className="border rounded-lg">
      <ScrollArea className="h-[600px]">
        <div className="w-full min-w-[1400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] bg-white sticky left-0">Nombre del Tipo</TableHead>
                <TableHead className="min-w-[300px]">Tipo Actual</TableHead>
                <TableHead className="min-w-[300px]">Tipo Supabase</TableHead>
                <TableHead className="min-w-[200px]">Ubicación</TableHead>
                <TableHead className="min-w-[150px]">Relaciones</TableHead>
                <TableHead className="w-[120px]">Variables Requeridas</TableHead>
                <TableHead className="w-[100px]">Categoría</TableHead>
                <TableHead className="w-[120px]">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {types.map((type: ChecklistItem, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium bg-white sticky left-0 border-r">
                    <div className="flex items-center gap-2">
                      {type.name}
                      {type.description && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{type.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <pre className="text-xs bg-slate-50 p-2 rounded-md overflow-x-auto max-w-[300px]">
                      {type.currentType}
                    </pre>
                  </TableCell>
                  <TableCell>
                    <pre className="text-xs bg-slate-50 p-2 rounded-md overflow-x-auto max-w-[300px]">
                      {type.supabaseType}
                    </pre>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-sm">
                      {type.locations?.map((location, idx) => (
                        <li key={idx} className="text-gray-600 truncate hover:text-clip hover:whitespace-normal">
                          {location}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-sm">
                      {type.relations?.map((relation, idx) => (
                        <li key={idx} className="text-gray-600">
                          {relation.type}: {relation.with}
                        </li>
                      )) || <span className="text-gray-400">Sin relaciones</span>}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-sm">
                      {type.requiredFields?.map((field, idx) => (
                        <li key={idx} className="text-gray-600">
                          {field}
                        </li>
                      )) || <span className="text-gray-400">No especificado</span>}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {type.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={type.status === "updated" ? "default" : "secondary"}
                      className={type.status === "updated" ? "bg-green-500" : ""}
                    >
                      {type.status === "updated" ? "Actualizado" : "Pendiente"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  )
}