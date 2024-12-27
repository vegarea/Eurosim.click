import { WorkflowItem } from "../../types/WorkflowTypes"

export const authWorkflows: WorkflowItem[] = [
  {
    id: "FL-001",
    title: "Registro automático de cliente",
    description: "Proceso de registro automático al completar una compra y sistema de magic links",
    status: "pending",
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
Flujo de registro automático:
1. Usuario completa compra solo con email ✓
2. Sistema crea cuenta automáticamente ❌
3. Se envía email con magic link ❌
4. Usuario puede acceder en cualquier momento vía magic link ❌

Pendiente:
- Implementar lógica de creación automática del perfil
- Integrar sistema de envío de emails
- Configurar manejo de sesiones
    `
  },
  {
    id: "FL-002",
    title: "Acceso con Magic Link",
    description: "Sistema de autenticación sin contraseña usando magic links",
    status: "pending",
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
Estructura implementada:
- Componentes UI ✓
- Sistema de roles ✓
- Protección de rutas ✓

Pendiente:
- Implementar verificación de magic links
- Configurar manejo de sesiones
- Integrar con Supabase Auth
    `
  },
  {
    id: "FL-003",
    title: "Gestión de permisos",
    description: "Sistema de control y asignación de permisos por rol",
    status: "pending",
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
Implementado:
- Interfaz de gestión de permisos ✓
- Estructura de datos de permisos ✓
- Componentes UI ✓

Pendiente:
- Implementar validación en tiempo real
- Sistema de auditoría de cambios
- Integración con Supabase RLS
    `
  }
]