import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bug, X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  details?: any;
  timestamp: string;
}

export function CheckoutLogger() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { toast } = useToast();

  const addLog = (type: LogEntry['type'], message: string, details?: any) => {
    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      type,
      message,
      details,
      timestamp: new Date().toISOString()
    };

    setLogs(prev => [newLog, ...prev]);

    if (type === 'error') {
      toast({
        variant: "destructive",
        title: "Error en el checkout",
        description: message,
      });
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  useEffect(() => {
    // Suscribirse a eventos del formulario
    const handleFormChange = (event: any) => {
      if (event.detail?.type === 'form-state-change') {
        addLog('info', 'Form state changed:', event.detail.data);
      }
    };

    window.addEventListener('checkout-log', handleFormChange);
    return () => window.removeEventListener('checkout-log', handleFormChange);
  }, []);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'info':
        return 'text-blue-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Bug className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 z-50 h-screen w-96 bg-white shadow-xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold">Checkout Logs</h2>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={clearLogs}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-lg border bg-gray-50 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${getLogColor(log.type)}`}>
                          {log.type.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{log.message}</p>
                      {log.details && (
                        <pre className="mt-2 max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}