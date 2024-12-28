import { WorkflowItem } from "../../types/WorkflowTypes"

export const settingsWorkflows: WorkflowItem[] = [
  {
    id: "FL-601",
    title: "Configuración de marca",
    description: "Gestión de identidad visual y datos de empresa",
    status: "reviewed",
    components: [
      "CompanySettings.tsx",
      "StyleSettings.tsx"
    ],
    database: [
      "settings (tabla)"
    ],
    details: `
- Gestión de logo de empresa
- Nombre de empresa
- Datos de contacto (WhatsApp, redes sociales)
- Imágenes principales del sitio
- Colores del tema (primario/secundario)
- UI implementada, pendiente conexión con Supabase Storage para imágenes y persistencia de configuración`
  },
  {
    id: "FL-602",
    title: "Configuración de E-commerce",
    description: "Gestión de configuraciones monetarias y fiscales",
    status: "reviewed",
    components: [
      "EcommerceSettings.tsx"
    ],
    database: [
      "settings (tabla)"
    ],
    details: `
- Configuración de moneda (MXN)
- Tasa de impuestos
- Próximamente: soporte multi-moneda
- UI implementada, pendiente conexión con Supabase para persistencia`
  },
  {
    id: "FL-603",
    title: "Configuración SEO",
    description: "Gestión de metadatos para SEO",
    status: "working",
    components: [
      "SeoSettings.tsx"
    ],
    database: [
      "settings (tabla)"
    ],
    details: `
- Meta títulos
- Meta descripciones
- Configuración general SEO
- Sistema completamente funcional`
  },
  {
    id: "FL-604",
    title: "Integraciones externas",
    description: "Gestión de integraciones con servicios externos",
    status: "reviewed",
    components: [
      "IntegrationsSettings.tsx",
      "EmailIntegration.tsx",
      "ZapierIntegration.tsx",
      "MakeWebhooks.tsx"
    ],
    database: [
      "settings (tabla)",
      "webhooks (tabla)"
    ],
    details: `
- Integración con Brevo (email)
- Webhooks de Make.com
- Integración con Zapier
- Gestión de API keys
- UI implementada, pendiente conexión con Supabase Vault para almacenamiento seguro de API keys`
  }
]