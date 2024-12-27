import { WorkflowItem } from "../../types/WorkflowTypes"

export const settingsWorkflows: WorkflowItem[] = [
  {
    id: "FL-601",
    title: "Configuración de marca",
    description: "Gestión de logos, colores y elementos de marca",
    status: "pending",
    components: [
      "BrandSettings.tsx",
      "StyleSettings.tsx"
    ],
    database: [
      "settings (tabla)",
      "brand_assets (tabla)"
    ]
  },
  {
    id: "FL-602",
    title: "Integraciones",
    description: "Gestión de integraciones con servicios externos",
    status: "working",
    components: [
      "IntegrationsManager.tsx",
      "APIKeys.tsx"
    ],
    database: [
      "integrations (tabla)",
      "api_keys (tabla)"
    ]
  },
  {
    id: "FL-603",
    title: "Gestión de imágenes de Hero",
    description: "Sistema de gestión y actualización de imágenes principales",
    status: "pending",
    components: [
      "StyleSettings.tsx",
      "ImageUploader.tsx",
      "HomeHero.tsx",
      "ESimHero.tsx"
    ],
    database: [
      "settings (tabla)",
      "hero_images (tabla)"
    ],
    details: "Sistema para gestionar las imágenes principales de las secciones Home, E-SIM y SIM física. Incluye preview, optimización y respaldo de imágenes anteriores."
  },
  {
    id: "FL-604",
    title: "Personalización de UI",
    description: "Sistema de personalización de interfaz de usuario",
    status: "pending",
    components: [
      "StyleSettings.tsx",
      "ThemeProvider.tsx"
    ],
    database: [
      "settings (tabla)",
      "ui_themes (tabla)"
    ],
    details: "Gestión de temas, colores, tipografías y otros elementos visuales de la plataforma"
  }
]