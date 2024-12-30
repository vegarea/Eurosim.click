import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

type CheckoutLogType = 'info' | 'warning' | 'error' | 'success'

interface CheckoutLog {
  id: string
  type: CheckoutLogType
  message: string
  timestamp: Date
  data?: any
}

export function useCheckoutLogger() {
  const [logs, setLogs] = useState<CheckoutLog[]>([])
  const { toast } = useToast()

  const addLog = (type: CheckoutLogType, message: string, data?: any) => {
    const log = {
      id: crypto.randomUUID(),
      type,
      message,
      timestamp: new Date(),
      data
    }
    
    setLogs(prev => [...prev, log])
    console.log(`[Checkout ${type}]:`, message, data || '')

    if (type === 'error') {
      toast({
        title: "Error en el checkout",
        description: message,
        variant: "destructive",
      })
    }
  }

  const clearLogs = () => setLogs([])

  return {
    logs,
    addLog,
    clearLogs
  }
}