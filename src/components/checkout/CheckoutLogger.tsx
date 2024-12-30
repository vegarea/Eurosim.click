import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Bug, CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react"
import { useCheckoutLogger } from "@/hooks/useCheckoutLogger"
import { cn } from "@/lib/utils"

export function CheckoutLogger() {
  const { logs, clearLogs } = useCheckoutLogger()

  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getAlertClass = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      default:
        return ''
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-4 right-4 h-10 w-10 rounded-full shadow-lg"
        >
          <Bug className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Logs del Checkout</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearLogs}
            >
              Limpiar logs
            </Button>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4">
          <div className="space-y-2 pr-4">
            {logs.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay logs disponibles
              </p>
            ) : (
              logs.map(log => (
                <Alert 
                  key={log.id}
                  className={cn("flex items-start gap-2", getAlertClass(log.type))}
                >
                  {getIcon(log.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {log.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {log.timestamp.toLocaleTimeString()}
                    </p>
                    {log.data && (
                      <pre className="mt-2 text-xs bg-black/5 p-2 rounded overflow-x-auto">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    )}
                  </div>
                </Alert>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}