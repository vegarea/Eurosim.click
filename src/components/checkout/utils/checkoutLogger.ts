import { toast } from "sonner"

type CheckoutStep = 
  | "payment_init" 
  | "stripe_redirect"
  | "payment_success"
  | "customer_creation"
  | "order_creation"
  | "order_items_creation"
  | "email_sent"
  | "checkout_completed"

interface CheckoutLog {
  step: CheckoutStep
  status: "success" | "error" | "warning" | "info"
  message: string
  data?: any
  error?: any
  timestamp: string
}

class CheckoutLogger {
  private logs: CheckoutLog[] = []
  
  log(
    step: CheckoutStep, 
    status: CheckoutLog["status"], 
    message: string, 
    data?: any,
    error?: any
  ) {
    const logEntry: CheckoutLog = {
      step,
      status,
      message,
      data,
      error,
      timestamp: new Date().toISOString()
    }

    this.logs.push(logEntry)
    
    // Console log con formato
    const logStyle = this.getLogStyle(status)
    console.group(`[Checkout: ${step}]`)
    console.log('%cStatus:', logStyle, status.toUpperCase())
    console.log('Message:', message)
    if (data) {
      console.log('Data:', data)
    }
    if (error) {
      console.error('Error:', error)
    }
    console.log('Timestamp:', logEntry.timestamp)
    console.groupEnd()

    // Toast para errores
    if (status === "error") {
      toast.error(message)
    }
  }

  private getLogStyle(status: CheckoutLog["status"]) {
    const styles = {
      success: 'color: #10b981; font-weight: bold;',
      error: 'color: #ef4444; font-weight: bold;',
      warning: 'color: #f59e0b; font-weight: bold;',
      info: 'color: #3b82f6; font-weight: bold;'
    }
    return styles[status]
  }

  getLogs() {
    return this.logs
  }

  clear() {
    this.logs = []
  }
}

export const checkoutLogger = new CheckoutLogger()