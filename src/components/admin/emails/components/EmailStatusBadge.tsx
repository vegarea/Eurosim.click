import { Badge } from "@/components/ui/badge";

const STATUS_STYLES = {
  'delivered': 'bg-green-100 text-green-800 hover:bg-green-100',
  'sent': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  'failed': 'bg-red-100 text-red-800 hover:bg-red-100',
  'bounced': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  'complained': 'bg-red-100 text-red-800 hover:bg-red-100',
  'opened': 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  'clicked': 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100',
} as const;

type EmailStatus = keyof typeof STATUS_STYLES;

export function EmailStatusBadge({ status }: { status: string }) {
  const statusKey = status.toLowerCase() as EmailStatus;
  const style = STATUS_STYLES[statusKey] || 'bg-gray-100 text-gray-800 hover:bg-gray-100';

  return (
    <Badge variant="secondary" className={style}>
      {status}
    </Badge>
  );
}