import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, AlertCircle, Loader2 } from "lucide-react";

const StatusIcon = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case "sent":
    case "delivered":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "sending":
      return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
    case "bounced":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    default:
      return <Clock className="h-4 w-4 text-blue-500" />;
  }
};

export const EmailStatusBadge = ({ status }: { status: string }) => {
  const styles = {
    sent: "bg-green-100 text-green-800",
    delivered: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    sending: "bg-blue-100 text-blue-800",
    bounced: "bg-orange-100 text-orange-800",
    default: "bg-blue-100 text-blue-800",
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