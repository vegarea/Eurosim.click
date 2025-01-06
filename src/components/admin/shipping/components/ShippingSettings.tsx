import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

export function ShippingSettings() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [newCost, setNewCost] = useState("")

  const { data: shippingSettings, isLoading } = useQuery({
    queryKey: ['shipping-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shipping_settings')
        .select('*')
        .eq('is_active', true)
        .single()

      if (error) throw error
      return data
    }
  })

  const updateShippingCost = useMutation({
    mutationFn: async (cost: number) => {
      const { error } = await supabase
        .from('shipping_settings')
        .update({ shipping_cost: cost })
        .eq('is_active', true)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping-settings'] })
      toast({
        title: "Costo de envío actualizado",
        description: `El nuevo costo de envío es: $${(Number(newCost)/100).toFixed(2)} MXN`,
      })
      setNewCost("")
    },
    onError: (error) => {
      toast({
        title: "Error al actualizar el costo",
        description: error.message,
        variant: "destructive",
      })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const costInCents = Math.round(Number(newCost) * 100)
    if (isNaN(costInCents)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número válido",
        variant: "destructive",
      })
      return
    }
    updateShippingCost.mutate(costInCents)
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Configuración de Envío</h3>
      
      <div className="space-y-4">
        <div>
          <Label>Costo de envío actual</Label>
          <p className="text-2xl font-bold text-brand-600">
            ${((shippingSettings?.shipping_cost || 0) / 100).toFixed(2)} MXN
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="shipping-cost">Nuevo costo de envío (MXN)</Label>
            <div className="flex gap-2">
              <Input
                id="shipping-cost"
                type="number"
                step="0.01"
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
                placeholder="0.00"
              />
              <Button 
                type="submit"
                disabled={!newCost || updateShippingCost.isPending}
              >
                {updateShippingCost.isPending ? "Actualizando..." : "Actualizar"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  )
}