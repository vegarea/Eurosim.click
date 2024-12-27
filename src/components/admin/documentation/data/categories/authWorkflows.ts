import { WorkflowItem } from "../../types/WorkflowTypes"

export const authWorkflows: WorkflowItem[] = [
  {
    id: "FL-001",
    title: "Registro de usuario",
    description: "Proceso de registro de nuevos usuarios en la plataforma con validación de roles",
    status: "pending",
    components: [
      "components/auth/RegisterForm.tsx",
      "components/auth/RoleSelection.tsx",
      "contexts/AuthContext.tsx",
      "hooks/useAuth.tsx",
      "components/auth/VerificationStep.tsx"
    ],
    database: [
      "auth.users (tabla Supabase)",
      "public.profiles (tabla personalizada)",
      "public.role_permissions (tabla personalizada)"
    ],
    details: `
Flujo de registro:
1. Usuario ingresa email/contraseña
2. Verificación de email
3. Completar perfil según rol:
   - Cliente: Datos personales básicos
   - Manager: Datos personales + documentación
   - Admin: Asignación manual por super admin

Políticas RLS necesarias:
- Perfiles: lectura pública, escritura solo propietario
- Role_permissions: lectura autenticada, escritura admin
    `
  },
  {
    id: "FL-002",
    title: "Inicio de sesión",
    description: "Sistema de autenticación con manejo de roles y permisos",
    status: "pending",
    components: [
      "components/auth/LoginForm.tsx",
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
Estructura de roles y permisos:

1. Cliente:
   - Ver/modificar perfil propio
   - Gestionar pedidos propios
   - Ver catálogo de productos
   - Acceso al soporte

2. Manager:
   - Gestión de envíos asignados
   - Ver pedidos en su área (físicos o eSIM)
   - Actualizar estados de envío
   - Acceso a documentación básica

3. Admin:
   - Gestión completa de usuarios
   - Asignación de roles
   - Gestión de productos
   - Acceso a métricas y reportes
   - Configuración del sistema

Políticas RLS necesarias:
- Pedidos: filtrar por rol y propiedad
- Envíos: filtrar por tipo y asignación
- Productos: lectura pública, escritura admin
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
Estructura de permisos:

1. Niveles de acceso:
   - read: solo lectura
   - write: lectura y escritura
   - admin: control total
   - none: sin acceso

2. Áreas de permisos:
   - orders: pedidos
   - products: productos
   - users: usuarios
   - shipping: envíos
   - reports: reportes
   - settings: configuración

Políticas RLS:
- Solo admin puede modificar permisos
- Logs de cambios de permisos
- Verificación en tiempo real de permisos
    `
  }
]