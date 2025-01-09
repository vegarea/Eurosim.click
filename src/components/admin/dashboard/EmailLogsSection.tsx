import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, XCircle, Clock, AlertCircle, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react"

const StatusIcon = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case "sent":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "queued":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "sending":
      return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
    default:
      return <AlertCircle className="h-4 w-4 text-orange-500" />
  }
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    sent: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    queued: "bg-yellow-100 text-yellow-800",
    sending: "bg-blue-100 text-blue-800",
    default: "bg-orange-100 text-orange-800",
  }

  const statusKey = status.toLowerCase() as keyof typeof styles
  const styleClass = styles[statusKey] || styles.default

  return (
    <Badge className={`flex items-center gap-1 ${styleClass}`}>
      <StatusIcon status={status} />
      <span className="capitalize">{status}</span>
    </Badge>
  )
}

const ITEMS_PER_PAGE = 8

export function EmailLogsSection() {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: logs, isLoading, error } = useQuery({
    queryKey: ["emailLogs", currentPage],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from("email_logs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1)

      if (error) throw error
      return { logs: data || [], total: count || 0 }
    },
  })

  if (isLoading) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Logs de Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Logs de Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-red-500">
            Error al cargar los logs de email
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalPages = Math.ceil((logs?.total || 0) / ITEMS_PER_PAGE)

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Logs de Email</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {logs?.logs.map((log) => (
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
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(log.created_at), "PPpp", { locale: es })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  )
}