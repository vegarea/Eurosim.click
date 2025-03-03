
import { Badge } from "@/components/ui/badge"

interface MessageStatusBadgeProps {
  status: string
}

export function MessageStatusBadge({ status }: MessageStatusBadgeProps) {
  switch (status) {
    case 'nuevo':
      return <Badge variant="default" className="bg-blue-500">Nuevo</Badge>
    case 'leido':
      return <Badge variant="outline" className="text-gray-500">Leído</Badge>
    case 'respondido':
      return <Badge variant="default" className="bg-green-500">Respondido</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
