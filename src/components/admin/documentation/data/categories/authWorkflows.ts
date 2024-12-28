import { WorkflowItem } from "../../types/WorkflowTypes"

export const authWorkflows: WorkflowItem[] = [
  {
    id: "FL-001",
    title: "Registro automático de cliente",
    description: "Proceso de registro automático al completar una compra y sistema de magic links",
    status: "working",
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
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ Triggers configurados
✓ Componentes UI implementados

Pendiente implementación:
- Integración con magic links
- Flujo de registro en checkout`
  },
  {
    id: "FL-002",
    title: "Acceso con Magic Link",
    description: "Sistema de autenticación sin contraseña usando magic links",
    status: "working",
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
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ Triggers configurados
✓ Componentes UI implementados

Pendiente implementación:
- Integración con Supabase Auth
- Flujo de magic links`
  },
  {
    id: "FL-003",
    title: "Gestión de permisos",
    description: "Sistema de control y asignación de permisos por rol",
    status: "working",
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
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ Triggers configurados
✓ Componentes UI implementados

Pendiente implementación:
- Integración con Supabase Auth
- Sistema de roles y permisos`
  }
]