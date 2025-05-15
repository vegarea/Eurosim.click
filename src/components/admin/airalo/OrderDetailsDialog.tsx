
import { useState, useEffect } from "react";
import { useAiraloClient } from "@/hooks/useAiraloClient";
import { AiraloOrder } from "@/types/airalo/api-types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, FileText, QrCode, Smartphone } from "lucide-react";

interface OrderDetailsDialogProps {
  open: boolean;
  orderId?: string;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({ open, orderId, onOpenChange }: OrderDetailsDialogProps) {
  const { getOrder } = useAiraloClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<AiraloOrder | null>(null);

  useEffect(() => {
    if (open && orderId) {
      loadOrderDetails(orderId);
    } else {
      setOrderDetails(null);
    }
  }, [open, orderId]);

  const loadOrderDetails = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const order = await getOrder(id);
      setOrderDetails(order);
    } catch (err) {
      setError("No se pudieron cargar los detalles del pedido");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString("es-ES");
  };

  const statusBadgeVariant = (status: string): "default" | "outline" | "secondary" | "destructive" => {
    switch (status) {
      case "activated":
        return "default";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const statusLabel = (status: string): string => {
    switch (status) {
      case "activated":
        return "Activado";
      case "failed":
        return "Fallido";
      case "pending":
        return "Pendiente";
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Pedido</DialogTitle>
          <DialogDescription>
            {orderDetails ? `Pedido #${orderDetails.code}` : "Cargando detalles del pedido..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : orderDetails ? (
          <Tabs defaultValue="info">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="installation">Instalación</TabsTrigger>
              <TabsTrigger value="qrcode">Código QR</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">ID de Pedido</h4>
                  <p className="text-base">{orderDetails.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Código</h4>
                  <p className="text-base">{orderDetails.code}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Estado</h4>
                  <Badge variant={statusBadgeVariant(orderDetails.status)}>
                    {statusLabel(orderDetails.status)}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Fecha de Creación</h4>
                  <p className="text-base">{formatDate(orderDetails.created_at)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">ICCID</h4>
                  <p className="text-base font-mono">{orderDetails.iccid || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Fecha de Expiración</h4>
                  <p className="text-base">{formatDate(orderDetails.expired_at)}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Detalles del Paquete</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Paquete</h4>
                    <p className="text-base">{orderDetails.package?.name || "N/A"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Datos</h4>
                    <p className="text-base">{orderDetails.package?.data || "N/A"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Validez</h4>
                    <p className="text-base">{orderDetails.package?.day || "N/A"} días</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Precio</h4>
                    <p className="text-base">
                      {orderDetails.package?.price
                        ? `${orderDetails.package.currency} ${orderDetails.package.price.toFixed(2)}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {orderDetails.description && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Descripción</h4>
                    <p className="text-base">{orderDetails.description}</p>
                  </div>
                </>
              )}

              {orderDetails.brand_settings_name && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Marca Personalizada</h4>
                    <p className="text-base">{orderDetails.brand_settings_name}</p>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="installation" className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5" />
                <h3 className="text-lg font-medium">Instrucciones de Instalación</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-medium flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Instalación por Código QR
                  </h4>
                  
                  <div className="mt-2 p-4 border rounded-md bg-muted/30">
                    {orderDetails.qrcode_installation ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: orderDetails.qrcode_installation }}
                        className="prose prose-sm max-w-none"
                      />
                    ) : (
                      <p className="text-muted-foreground">No hay instrucciones disponibles</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Instalación Manual
                  </h4>
                  
                  <div className="mt-2 p-4 border rounded-md bg-muted/30">
                    {orderDetails.manual_installation ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: orderDetails.manual_installation }}
                        className="prose prose-sm max-w-none"
                      />
                    ) : (
                      <p className="text-muted-foreground">No hay instrucciones disponibles</p>
                    )}
                  </div>
                </div>

                {orderDetails.direct_apple_installation_url && (
                  <Button variant="outline" className="w-full">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Instalación Directa iOS (17.4+)
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="qrcode" className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="h-5 w-5" />
                <h3 className="text-lg font-medium">Código QR de Activación</h3>
              </div>

              <div className="flex flex-col items-center justify-center p-6 border rounded-md">
                {orderDetails.qrcode_url ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-4 rounded-md">
                      <img 
                        src={orderDetails.qrcode_url} 
                        alt="Código QR de activación de eSIM" 
                        width={200} 
                        height={200} 
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-2 text-center">
                      <p className="text-sm text-muted-foreground">
                        Escanea el código QR para activar tu eSIM
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" variant="outline">
                          Descargar QR
                        </Button>
                        <Button size="sm" variant="outline">
                          Enviar por Email
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No hay código QR disponible para este pedido.
                  </p>
                )}
              </div>

              {orderDetails.lpa && orderDetails.matching_id && (
                <div className="mt-4 p-4 border rounded-md space-y-2">
                  <h4 className="text-sm font-medium">Instalación Manual</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">SM-DP+ Address</p>
                      <p className="text-sm font-mono bg-muted/30 p-2 rounded">{orderDetails.lpa}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Activation Code</p>
                      <p className="text-sm font-mono bg-muted/30 p-2 rounded">{orderDetails.matching_id}</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
