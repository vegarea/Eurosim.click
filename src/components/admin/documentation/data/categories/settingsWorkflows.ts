import { WorkflowItem } from "../../types/WorkflowTypes"

export const settingsWorkflows: WorkflowItem[] = [
  {
    id: "FL-601",
    title: "Configuración de marca",
    description: "Gestión de identidad visual y datos de empresa",
    status: "working",
    components: [
      "CompanySettings.tsx",
      "StyleSettings.tsx"
    ],
    database: [
      "settings (tabla)"
    ],
    details: `
✓ Gestión de logo de empresa
✓ Nombre de empresa
✓ Datos de contacto (WhatsApp, redes sociales)
✓ Imágenes principales del sitio
✓ Colores del tema (primario/secundario)
✓ Integración con Supabase Storage para imágenes
✓ Persistencia de configuración implementada`
  },
  {
    id: "FL-602",
    title: "Configuración de E-commerce",
    description: "Gestión de configuraciones monetarias y fiscales",
    status: "working",
    components: [
      "EcommerceSettings.tsx"
    ],
    database: [
      "settings (tabla)"
    ],
    details: `
✓ Configuración de moneda (MXN)
✓ Tasa de impuestos
✓ Soporte multi-moneda implementado
✓ Persistencia en Supabase completada
✓ Validaciones de formato implementadas`
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
✓ Meta títulos
✓ Meta descripciones
✓ Configuración general SEO
✓ Sistema completamente funcional`
  },
  {
    id: "FL-604",
    title: "Integraciones externas",
    description: "Gestión de integraciones con servicios externos",
    status: "working",
    components: [
      "IntegrationsSettings.tsx",
      "EmailIntegration.tsx",
      "ZapierIntegration.tsx",
      "MakeWebhooks.tsx"
    ],
    database: [
      "api_configurations (tabla)",
      "webhooks (tabla)"
    ],
    details: `
✓ Integración con Brevo (email) implementada
✓ Webhooks de Make.com configurados
✓ Integración con Zapier completada
✓ Gestión de API keys con Supabase Vault
✓ Sistema de logs implementado
✓ Validaciones de API keys en tiempo real
✓ Monitoreo de estado de integraciones`
  }
]