import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useResendLogs } from "@/components/admin/emails/hooks/useResendLogs";

const ITEMS_PER_PAGE = 8;

export function EmailLogsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useResendLogs(currentPage, ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Logs de Email (Resend)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Logs de Email (Resend)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-red-500">
            Error al cargar los logs de Resend: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Logs de Email (Resend)</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {data?.data.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{log.to[0]}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      log.status === 'sent' 
                        ? 'bg-green-100 text-green-800'
                        : log.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {log.status}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2"
                      asChild
                    >
                      <a
                        href={`https://resend.com/emails/${log.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Ver en Resend <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.subject}</p>
                  {log.error && (
                    <p className="text-sm text-red-600">{log.error.message}</p>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <PaginationPrevious />
                  </Button>
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <PaginationNext />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}