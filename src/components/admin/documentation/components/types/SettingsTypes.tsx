import { ChecklistCategory } from "../../types/ChecklistTypes"

export const settingsTypes: ChecklistCategory = {
  id: "settings",
  category: "Configuración y Ajustes",
  items: [
    {
      name: "CompanySettings",
      status: "pending",
      description: "Configuración general de la empresa",
      locations: [
        "src/components/admin/settings/CompanySettings.tsx"
      ],
      currentTypes: [
        {
          name: "CompanySettings",
          path: "src/types/settings.ts",
          code: `interface CompanySettings {
  logo: string
  companyName: string
  whatsapp: string
  facebookUrl: string
  instagramUrl: string
}`
        }
      ],
      supabaseTypes: [
        {
          name: "CompanySettings",
          path: "src/types/supabase.ts",
          code: `type CompanySettings = Database["public"]["Tables"]["company_settings"]["Row"] = {
  id: string
  logo_url: string
  company_name: string
  whatsapp_number: string
  facebook_url: string | null
  instagram_url: string | null
  contact_email: string
  support_phone: string | null
  created_at: string
  updated_at: string | null
  metadata: Json | null
}`
        }
      ]
    },
    {
      name: "StyleSettings",
      status: "pending",
      description: "Configuración de estilos y temas",
      locations: [
        "src/components/admin/settings/StyleSettings.tsx"
      ],
      currentTypes: [
        {
          name: "StyleSettings",
          path: "src/types/settings.ts",
          code: `interface StyleSettings {
  primaryColor: string
  secondaryColor: string
  heroImages: {
    id: number
    location: string
    description: string
    currentUrl: string
  }[]
}`
        }
      ],
      supabaseTypes: [
        {
          name: "StyleSettings",
          path: "src/types/supabase.ts",
          code: `type StyleSettings = Database["public"]["Tables"]["style_settings"]["Row"] = {
  id: string
  primary_color: string
  secondary_color: string
  hero_images: Json
  font_family: string | null
  button_style: string | null
  created_at: string
  updated_at: string | null
  metadata: Json | null
}`
        }
      ]
    }
  ]
}