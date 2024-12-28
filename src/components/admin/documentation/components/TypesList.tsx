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
    <div className="border rounded-lg">
      <ScrollArea className="h-[600px]">
        <div className="w-full min-w-[1200px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] bg-white sticky left-0">Nombre del Tipo</TableHead>
                <TableHead className="min-w-[300px]">Tipo Actual</TableHead>
                <TableHead className="min-w-[300px]">Tipo Supabase</TableHead>
                <TableHead className="min-w-[200px]">Ubicación</TableHead>
                <TableHead className="w-[100px]">Categoría</TableHead>
                <TableHead className="w-[120px]">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {types.map((type, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium bg-white sticky left-0 border-r">
                    {type.name}
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
                      {type.locations.map((location, idx) => (
                        <li key={idx} className="text-gray-600 truncate hover:text-clip hover:whitespace-normal">
                          {location}
                        </li>
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