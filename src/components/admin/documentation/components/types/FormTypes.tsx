export const formTypes = [
  {
    name: "DocumentationFormData",
    currentType: `interface DocumentationFormData {
  fullName: string
  birthDate: Date
  gender: string
  passportNumber: string
  activationDate: Date
}`,
    supabaseType: `type CustomerDocument = Database["public"]["Tables"]["customer_documents"]["Row"] = {
  id: string
  customer_id: string
  full_name: string
  birth_date: string
  gender: Database["public"]["Enums"]["gender"]
  passport_number: string
  activation_date: string
  status: Database["public"]["Enums"]["document_status"]
  created_at: string
  updated_at: string | null
}`,
    locations: [
      "src/components/checkout/DocumentationForm.tsx"
    ],
    category: "form",
    status: "pending"
  },
  {
    name: "ShippingFormData",
    currentType: `interface ShippingFormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}`,
    supabaseType: `type ShippingAddress = Database["public"]["Tables"]["shipping_addresses"]["Row"] = {
  id: string
  customer_id: string
  full_name: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string | null
}`,
    locations: [
      "src/components/checkout/ShippingForm.tsx"
    ],
    category: "form",
    status: "pending"
  }
]