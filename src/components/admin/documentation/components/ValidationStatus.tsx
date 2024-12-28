import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

interface ValidationStatusProps {
  type: 'typescript' | 'documentation' | 'workflow'
  status: 'success' | 'warning' | 'error'
  message: string
  details?: string[]
}

export function ValidationStatus({ type, status, message, details }: ValidationStatusProps) {
  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    error: <XCircle className="h-4 w-4 text-red-500" />
  }

  const titles = {
    typescript: 'Validación de Tipos TypeScript',
    documentation: 'Validación de Documentación',
    workflow: 'Validación de Flujos'
  }

  const getBadgeVariant = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return 'default'
      case 'warning':
        return 'destructive'
      case 'error':
        return 'destructive'
      default:
        return 'default'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icons[status]}
          {titles[type]}
          <Badge 
            variant={getBadgeVariant(status)}
            className="ml-auto"
          >
            {status === 'success' ? 'Válido' : status === 'warning' ? 'Advertencias' : 'Error'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant={status === 'success' ? 'default' : 'destructive'}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
        {details && details.length > 0 && (
          <div className="mt-4 space-y-2">
            {details.map((detail, index) => (
              <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}