import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Role } from "./Role"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface AssistantRole {
  id: string
  role: 'sales' | 'support' | 'compatibility_checker' | 'blog_writer'
  name: string
  description: string | null
  system_prompt: string
  is_active: boolean
}

export function AssistantRoles() {
  const queryClient = useQueryClient()

  const { data: roles, isLoading, error } = useQuery({
    queryKey: ['assistant-roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_assistant_roles')
        .select('*')
        .order('role')

      if (error) throw error
      return data as AssistantRole[]
    }
  })

  const updateRole = useMutation({
    mutationFn: async ({ 
      roleId, 
      updates 
    }: { 
      roleId: string, 
      updates: Partial<AssistantRole> 
    }) => {
      const { error } = await supabase
        .from('ai_assistant_roles')
        .update(updates)
        .eq('id', roleId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assistant-roles'] })
    }
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error al cargar los roles: {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Roles del Asistente</h3>
        <p className="text-sm text-muted-foreground">
          Configura los diferentes roles y comportamientos del asistente
        </p>
      </div>

      <div className="grid gap-6">
        {roles?.map((role) => (
          <Role
            key={role.id}
            role={role}
            onUpdate={(updates) => 
              updateRole.mutate({ roleId: role.id, updates })
            }
          />
        ))}
      </div>
    </div>
  )
}