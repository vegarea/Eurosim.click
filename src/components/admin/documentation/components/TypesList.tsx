import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { orderTypes } from "./types/OrderTypes"
import { formTypes } from "./types/FormTypes"
import { adminTypes } from "./types/AdminTypes"

// Combine all type definitions
const types = [...orderTypes, ...formTypes, ...adminTypes]

export function TypesList() {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre del Tipo</TableHead>
            <TableHead className="w-[300px]">Tipo Actual</TableHead>
            <TableHead className="w-[300px]">Tipo Supabase</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {types.map((type, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{type.name}</TableCell>
              <TableCell>
                <pre className="text-xs bg-slate-50 p-2 rounded-md overflow-x-auto">
                  {type.currentType}
                </pre>
              </TableCell>
              <TableCell>
                <pre className="text-xs bg-slate-50 p-2 rounded-md overflow-x-auto">
                  {type.supabaseType}
                </pre>
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside text-sm">
                  {type.locations.map((location, idx) => (
                    <li key={idx} className="text-gray-600">{location}</li>
                  ))}
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
                  {type.status === "updated" ? "Actualizado a Supabase" : "Sin actualizar"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}