import { Link } from "react-router-dom"
import { User, Mail, Phone, MapPin, CreditCard, Calendar, Flag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Customer } from "@/types/database/customers"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface CustomerDetailsModalProps {
  customer: Customer | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerDetailsModal({ customer, isOpen, onOpenChange }: CustomerDetailsModalProps) {
  if (!customer) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalles del Cliente
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Información Básica</TabsTrigger>
            <TabsTrigger value="shipping">Dirección de Envío</TabsTrigger>
            <TabsTrigger value="documentation">Documentación UE</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Información de Contacto</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  {customer.created_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Registrado el {format(new Date(customer.created_at), "PPP", { locale: es })}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Preferencias</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-gray-500" />
                    <span>Idioma preferido: {customer.preferred_language || "No especificado"}</span>
                  </div>
                </div>
              </div>

              {customer.marketing_preferences && (
                <div className="space-y-2">
                  <h3 className="font-medium">Preferencias de Marketing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <Badge variant={customer.marketing_preferences.email_marketing ? "default" : "secondary"}>
                          {customer.marketing_preferences.email_marketing ? "Activado" : "Desactivado"}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-2">Email Marketing</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <Badge variant={customer.marketing_preferences.sms_marketing ? "default" : "secondary"}>
                          {customer.marketing_preferences.sms_marketing ? "Activado" : "Desactivado"}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-2">SMS Marketing</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            {customer.default_shipping_address ? (
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{(customer.default_shipping_address as any).street}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Ciudad</label>
                    <p>{(customer.default_shipping_address as any).city || "No especificada"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Estado</label>
                    <p>{(customer.default_shipping_address as any).state || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Código Postal</label>
                    <p>{(customer.default_shipping_address as any).postal_code || "No especificado"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No hay información de envío disponible
              </div>
            )}
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4">
            {customer.passport_number ? (
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span>Pasaporte: {customer.passport_number}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Fecha de Nacimiento</label>
                    <p>{customer.birth_date ? format(new Date(customer.birth_date), "PPP", { locale: es }) : "No especificada"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Género</label>
                    <p>{customer.gender === 'M' ? 'Masculino' : customer.gender === 'F' ? 'Femenino' : 'No especificado'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No hay documentación disponible
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}