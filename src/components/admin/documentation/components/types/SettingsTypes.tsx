export const settingsTypes = [
  {
    name: "CompanySettings",
    currentType: `interface CompanySettings {
  logo: string
  companyName: string
  whatsapp: string
  facebookUrl: string
  instagramUrl: string
}`,
    supabaseType: `type CompanySettings = Database["public"]["Tables"]["company_settings"]["Row"] = {
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
}`,
    locations: [
      "src/components/admin/settings/CompanySettings.tsx"
    ],
    category: "settings",
    status: "pending"
  },
  {
    name: "StyleSettings",
    currentType: `interface StyleSettings {
  primaryColor: string
  secondaryColor: string
  heroImages: {
    id: number
    location: string
    description: string
    currentUrl: string
  }[]
}`,
    supabaseType: `type StyleSettings = Database["public"]["Tables"]["style_settings"]["Row"] = {
  id: string
  primary_color: string
  secondary_color: string
  hero_images: Json
  font_family: string | null
  button_style: string | null
  created_at: string
  updated_at: string | null
  metadata: Json | null
}`,
    locations: [
      "src/components/admin/settings/StyleSettings.tsx"
    ],
    category: "settings",
    status: "pending"
  }
];