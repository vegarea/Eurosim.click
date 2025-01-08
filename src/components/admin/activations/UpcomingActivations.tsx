import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export function UpcomingActivations() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['upcoming-activations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(*)
        `)
        .gt('activation_date', new Date().toISOString())
        .order('activation_date', { ascending: true })

      if (error) throw error
      return data
    }
  })

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Cargando...</div>
  }

  return (
    <div className="space-y-4">
      <DataTable 
        columns={columns} 
        data={orders || []} 
      />
    </div>
  )
}