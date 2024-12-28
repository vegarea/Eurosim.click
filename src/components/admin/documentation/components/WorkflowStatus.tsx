import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Check, AlertTriangle, Clock } from "lucide-react"
import { WorkflowStatus as Status } from "../types/WorkflowTypes"

interface WorkflowStatusProps {
  status: Status
  showIcon?: boolean
  size?: "sm" | "default"
}

export function WorkflowStatus({ status, showIcon = true, size = "default" }: WorkflowStatusProps) {
  const config = {
    working: {
      icon: Check,
      variant: "default",
      label: "Implementado",
      className: "bg-green-500 hover:bg-green-600"
    },
    reviewed: {
      icon: Clock,
      variant: "secondary",
      label: "Revisado - Pendiente Conexión",
      className: "bg-blue-100 text-blue-700 hover:bg-blue-200"
    },
    pending: {
      icon: AlertTriangle,
      variant: "destructive",
      label: "Pendiente",
      className: "bg-amber-100 text-amber-700 hover:bg-amber-200"
    }
  }

  const { icon: Icon, label, className } = config[status]

  return (
    <Badge 
      variant="default" 
      className={`${className} ${size === "sm" ? "text-xs px-2 py-0" : ""}`}
    >
      {showIcon && <Icon className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} mr-1`} />}
      {label}
    </Badge>
  )
}