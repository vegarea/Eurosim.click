import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, XCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import { useEmailLogs } from "./hooks/useEmailLogs";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const StatusIcon = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case "sent":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "queued":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "sending":
      return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
    default:
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    sent: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    queued: "bg-yellow-100 text-yellow-800",
    sending: "bg-blue-100 text-blue-800",
    default: "bg-orange-100 text-orange-800",
  };

  const statusKey = status.toLowerCase() as keyof typeof styles;
  const styleClass = styles[statusKey] || styles.default;

  return (
    <Badge className={`flex items-center gap-1 ${styleClass}`}>
      <StatusIcon status={status} />
      <span className="capitalize">{status}</span>
    </Badge>
  );
};

export function EmailLogs() {
  const { data: logs, isLoading, error } = useEmailLogs();

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-[500px] text-red-500">
          Error al cargar los logs de email
        </div>
      </Card>
    );
  }

  if (!logs?.length) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-[500px] text-muted-foreground">
          No hay logs de envío disponibles
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{log.recipient}</p>
                  <StatusBadge status={log.status} />
                </div>
                <p className="text-sm text-muted-foreground">{log.subject}</p>
                {log.error && (
                  <p className="text-sm text-red-600">{log.error}</p>
                )}
                {log.cc_emails && Array.isArray(log.cc_emails) && log.cc_emails.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    CC: {log.cc_emails.join(", ")}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {format(new Date(log.created_at), "PPpp", { locale: es })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}