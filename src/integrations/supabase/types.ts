export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          billing_address: Json | null
          birth_date: string | null
          created_at: string | null
          default_shipping_address: Json | null
          email: string
          gender: string | null
          id: string
          marketing_preferences: Json | null
          metadata: Json | null
          name: string
          passport_number: string | null
          paypal_customer_id: string | null
          phone: string | null
          preferred_language: string | null
          stripe_customer_id: string | null
          updated_at: string | null
        }
        Insert: {
          billing_address?: Json | null
          birth_date?: string | null
          created_at?: string | null
          default_shipping_address?: Json | null
          email: string
          gender?: string | null
          id?: string
          marketing_preferences?: Json | null
          metadata?: Json | null
          name: string
          passport_number?: string | null
          paypal_customer_id?: string | null
          phone?: string | null
          preferred_language?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_address?: Json | null
          birth_date?: string | null
          created_at?: string | null
          default_shipping_address?: Json | null
          email?: string
          gender?: string | null
          id?: string
          marketing_preferences?: Json | null
          metadata?: Json | null
          name?: string
          passport_number?: string | null
          paypal_customer_id?: string | null
          phone?: string | null
          preferred_language?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      order_events: {
        Row: {
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
          order_id: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
          order_id: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
          order_id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_notes: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          text: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          text: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_notes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          activation_date: string | null
          carrier: string | null
          created_at: string | null
          customer_id: string
          events: Json[] | null
          id: string
          metadata: Json | null
          notes: Json[] | null
          payment_method: string | null
          payment_status: string
          paypal_order_id: string | null
          paypal_receipt_url: string | null
          product_id: string
          quantity: number
          shipping_address: Json | null
          status: string
          stripe_payment_intent_id: string | null
          stripe_receipt_url: string | null
          total_amount: number
          tracking_number: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          activation_date?: string | null
          carrier?: string | null
          created_at?: string | null
          customer_id: string
          events?: Json[] | null
          id?: string
          metadata?: Json | null
          notes?: Json[] | null
          payment_method?: string | null
          payment_status: string
          paypal_order_id?: string | null
          paypal_receipt_url?: string | null
          product_id: string
          quantity?: number
          shipping_address?: Json | null
          status: string
          stripe_payment_intent_id?: string | null
          stripe_receipt_url?: string | null
          total_amount: number
          tracking_number?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          activation_date?: string | null
          carrier?: string | null
          created_at?: string | null
          customer_id?: string
          events?: Json[] | null
          id?: string
          metadata?: Json | null
          notes?: Json[] | null
          payment_method?: string | null
          payment_status?: string
          paypal_order_id?: string | null
          paypal_receipt_url?: string | null
          product_id?: string
          quantity?: number
          shipping_address?: Json | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_receipt_url?: string | null
          total_amount?: number
          tracking_number?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          metadata: Json | null
          order_id: string
          payment_method_id: string
          provider_payment_id: string
          provider_receipt_url: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          id?: string
          metadata?: Json | null
          order_id: string
          payment_method_id: string
          provider_payment_id: string
          provider_receipt_url?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          metadata?: Json | null
          order_id?: string
          payment_method_id?: string
          provider_payment_id?: string
          provider_receipt_url?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string
          europe_gb: number | null
          features: string[]
          id: string
          metadata: Json | null
          price: number
          spain_gb: number | null
          status: string
          stock: number | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          europe_gb?: number | null
          features?: string[]
          id?: string
          metadata?: Json | null
          price: number
          spain_gb?: number | null
          status?: string
          stock?: number | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          europe_gb?: number | null
          features?: string[]
          id?: string
          metadata?: Json | null
          price?: number
          spain_gb?: number | null
          status?: string
          stock?: number | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
