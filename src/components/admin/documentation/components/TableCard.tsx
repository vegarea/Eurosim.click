import React from 'react'
import { Table2, Eye, ArrowRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import { Badge } from "@/components/ui/badge"

interface TableCardProps {
  table: {
    name: string
    description: string
    fields: string[]
    content: string
    isConnected?: boolean
  }
}

export function TableCard({ table }: TableCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Table2 className="h-4 w-4 text-primary" />
            {table.name}
          </div>
          <Badge variant={table.isConnected ? "default" : "secondary"}>
            {table.isConnected ? "Conectada" : "No conectada"}
          </Badge>
        </CardTitle>
        <CardDescription className="line-clamp-2">{table.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm font-medium">Campos principales:</div>
          <ul className="text-sm text-muted-foreground space-y-1">
            {table.fields.map((field, index) => (
              <li key={index} className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{field}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center text-sm text-primary hover:underline">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver documentación completa
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Documentación: {table.name}</DialogTitle>
                  <DialogDescription>
                    Estructura detallada y relaciones de la tabla
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                  <div className="prose prose-sm dark:prose-invert">
                    <ReactMarkdown>{table.content}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}