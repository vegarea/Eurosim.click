import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export function ActivationsHistory() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['activations-history'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(*)
        `)
        .lt('activation_date', new Date().toISOString())
        .order('activation_date', { ascending: false })

      if (error) throw error
      return data
    }
  })

  return (
    <div className="space-y-4">
      <DataTable 
        columns={columns} 
        data={orders || []} 
        isLoading={isLoading}
      />
    </div>
  )
}