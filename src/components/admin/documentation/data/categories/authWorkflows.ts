import { WorkflowItem } from "../../types/WorkflowTypes"

export const authWorkflows: WorkflowItem[] = [
  {
    id: "FL-001",
    title: "Registro automático de cliente",
    description: "Proceso de registro automático al completar una compra y sistema de magic links",
    status: "reviewed",
    components: [
      "components/auth/MagicLinkForm.tsx",
      "components/checkout/CheckoutForm.tsx",
      "contexts/AuthContext.tsx",
      "hooks/useAuth.tsx"
    ],
    database: [
      "auth.users (tabla Supabase)",
      "public.profiles (tabla personalizada)",
      "public.role_permissions (tabla personalizada)"
    ],
    details: `
Implementado y revisado:
✓ Formulario de checkout con email
✓ Componente MagicLinkForm
✓ Contexto de autenticación
✓ Hook personalizado useAuth

Pendiente conexión Supabase:
- Creación automática de perfil en Supabase
- Integración con API de magic links
- Configuración de políticas RLS`
  },
  {
    id: "FL-002",
    title: "Acceso con Magic Link",
    description: "Sistema de autenticación sin contraseña usando magic links",
    status: "reviewed",
    components: [
      "components/auth/MagicLinkForm.tsx",
      "components/auth/RoleBasedLayout.tsx",
      "contexts/AuthContext.tsx",
      "hooks/useAuth.tsx",
      "components/auth/ProtectedRoute.tsx"
    ],
    database: [
      "auth.users (tabla Supabase)",
      "public.profiles (tabla personalizada)",
      "public.role_permissions (tabla personalizada)"
    ],
    details: `
Implementado y revisado:
✓ Componente de formulario magic link
✓ Layout basado en roles
✓ Rutas protegidas
✓ Lógica de redirección

Pendiente conexión Supabase:
- Integración con Auth API de Supabase
- Configuración de políticas de acceso
- Manejo de sesiones con Supabase`
  },
  {
    id: "FL-003",
    title: "Gestión de permisos",
    description: "Sistema de control y asignación de permisos por rol",
    status: "reviewed",
    components: [
      "components/admin/RoleManager.tsx",
      "components/admin/PermissionMatrix.tsx",
      "hooks/useRolePermissions.tsx"
    ],
    database: [
      "public.role_permissions (tabla personalizada)",
      "public.permission_logs (tabla de auditoría)"
    ],
    details: `
Implementado y revisado:
✓ Interfaz de gestión de roles
✓ Matriz de permisos
✓ Hook de permisos
✓ Lógica de validación de acceso

Pendiente conexión Supabase:
- Integración con tablas de permisos
- Configuración de políticas RLS
- Sistema de logs en base de datos`
  }
]