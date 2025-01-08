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
      ai_assistant_roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          role: Database["public"]["Enums"]["assistant_role"]
          system_prompt: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          role: Database["public"]["Enums"]["assistant_role"]
          system_prompt: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          role?: Database["public"]["Enums"]["assistant_role"]
          system_prompt?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_assistant_settings: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          max_tokens: number
          temperature: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          max_tokens?: number
          temperature?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          max_tokens?: number
          temperature?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_automation_settings: {
        Row: {
          created_at: string | null
          generation_frequency: unknown
          id: string
          images_per_paragraph: number | null
          images_style_prompt: string | null
          is_active: boolean | null
          style_prompt: string
          topics: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          generation_frequency?: unknown
          id?: string
          images_per_paragraph?: number | null
          images_style_prompt?: string | null
          is_active?: boolean | null
          style_prompt?: string
          topics?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          generation_frequency?: unknown
          id?: string
          images_per_paragraph?: number | null
          images_style_prompt?: string | null
          is_active?: boolean | null
          style_prompt?: string
          topics?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_post_images: {
        Row: {
          ai_prompt: string | null
          alt_text: string
          caption: string | null
          created_at: string | null
          height: number
          id: string
          is_ai_generated: boolean | null
          is_featured: boolean | null
          mime_type: string
          position: number | null
          post_id: string | null
          size_bytes: number
          storage_path: string
          thumbnail_url: string | null
          updated_at: string | null
          url: string
          width: number
        }
        Insert: {
          ai_prompt?: string | null
          alt_text: string
          caption?: string | null
          created_at?: string | null
          height: number
          id?: string
          is_ai_generated?: boolean | null
          is_featured?: boolean | null
          mime_type: string
          position?: number | null
          post_id?: string | null
          size_bytes: number
          storage_path: string
          thumbnail_url?: string | null
          updated_at?: string | null
          url: string
          width: number
        }
        Update: {
          ai_prompt?: string | null
          alt_text?: string
          caption?: string | null
          created_at?: string | null
          height?: number
          id?: string
          is_ai_generated?: boolean | null
          is_featured?: boolean | null
          mime_type?: string
          position?: number | null
          post_id?: string | null
          size_bytes?: number
          storage_path?: string
          thumbnail_url?: string | null
          updated_at?: string | null
          url?: string
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          ai_model: string | null
          ai_prompt: string | null
          author_id: string | null
          content: string
          created_at: string | null
          excerpt: string
          featured_image_id: string | null
          id: string
          is_ai_generated: boolean | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          ai_model?: string | null
          ai_prompt?: string | null
          author_id?: string | null
          content: string
          created_at?: string | null
          excerpt: string
          featured_image_id?: string | null
          id?: string
          is_ai_generated?: boolean | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          ai_model?: string | null
          ai_prompt?: string | null
          author_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string
          featured_image_id?: string | null
          id?: string
          is_ai_generated?: boolean | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      chat_settings: {
        Row: {
          ai_system_prompt: string | null
          ai_welcome_message: string | null
          chat_type: Database["public"]["Enums"]["chat_type"] | null
          created_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          whatsapp_message: string | null
          whatsapp_number: string | null
        }
        Insert: {
          ai_system_prompt?: string | null
          ai_welcome_message?: string | null
          chat_type?: Database["public"]["Enums"]["chat_type"] | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          whatsapp_message?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          ai_system_prompt?: string | null
          ai_welcome_message?: string | null
          chat_type?: Database["public"]["Enums"]["chat_type"] | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          whatsapp_message?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          billing_address: Json | null
          birth_date: string | null
          created_at: string | null
          default_shipping_address: Json | null
          email: string
          gender: Database["public"]["Enums"]["customer_gender"] | null
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
          gender?: Database["public"]["Enums"]["customer_gender"] | null
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
          gender?: Database["public"]["Enums"]["customer_gender"] | null
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
      email_logs: {
        Row: {
          cc_emails: Json | null
          created_at: string | null
          error: string | null
          id: string
          metadata: Json | null
          recipient: string
          status: string
          subject: string
          template_id: string
        }
        Insert: {
          cc_emails?: Json | null
          created_at?: string | null
          error?: string | null
          id?: string
          metadata?: Json | null
          recipient: string
          status: string
          subject: string
          template_id: string
        }
        Update: {
          cc_emails?: Json | null
          created_at?: string | null
          error?: string | null
          id?: string
          metadata?: Json | null
          recipient?: string
          status?: string
          subject?: string
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          carrier_id: string | null
          cc_emails: Json | null
          content: string
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          is_active: boolean
          name: string
          status: Database["public"]["Enums"]["order_status"]
          subject: string
          type: Database["public"]["Enums"]["email_template_type"]
          updated_at: string | null
          updated_by: string | null
          variables: Json
        }
        Insert: {
          carrier_id?: string | null
          cc_emails?: Json | null
          content: string
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          is_active?: boolean
          name: string
          status: Database["public"]["Enums"]["order_status"]
          subject: string
          type: Database["public"]["Enums"]["email_template_type"]
          updated_at?: string | null
          updated_by?: string | null
          variables?: Json
        }
        Update: {
          carrier_id?: string | null
          cc_emails?: Json | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          is_active?: boolean
          name?: string
          status?: Database["public"]["Enums"]["order_status"]
          subject?: string
          type?: Database["public"]["Enums"]["email_template_type"]
          updated_at?: string | null
          updated_by?: string | null
          variables?: Json
        }
        Relationships: []
      }
      order_events: {
        Row: {
          created_at: string
          description: string
          id: string
          metadata: Json | null
          order_id: string
          type: Database["public"]["Enums"]["event_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          order_id: string
          type: Database["public"]["Enums"]["event_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          order_id?: string
          type?: Database["public"]["Enums"]["event_type"]
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
      order_items: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          order_id: string
          product_id: string
          quantity?: number
          total_price: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string
          product_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
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
          customer_id: string | null
          id: string
          metadata: Json | null
          notes: string[] | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          paypal_order_id: string | null
          paypal_receipt_url: string | null
          product_id: string
          quantity: number
          shipping_address: Json | null
          status: Database["public"]["Enums"]["order_status"]
          stripe_payment_intent_id: string | null
          stripe_receipt_url: string | null
          total_amount: number
          tracking_number: string | null
          type: Database["public"]["Enums"]["order_type"]
          updated_at: string | null
        }
        Insert: {
          activation_date?: string | null
          carrier?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          metadata?: Json | null
          notes?: string[] | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          paypal_order_id?: string | null
          paypal_receipt_url?: string | null
          product_id: string
          quantity?: number
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"]
          stripe_payment_intent_id?: string | null
          stripe_receipt_url?: string | null
          total_amount: number
          tracking_number?: string | null
          type: Database["public"]["Enums"]["order_type"]
          updated_at?: string | null
        }
        Update: {
          activation_date?: string | null
          carrier?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          metadata?: Json | null
          notes?: string[] | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          paypal_order_id?: string | null
          paypal_receipt_url?: string | null
          product_id?: string
          quantity?: number
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"]
          stripe_payment_intent_id?: string | null
          stripe_receipt_url?: string | null
          total_amount?: number
          tracking_number?: string | null
          type?: Database["public"]["Enums"]["order_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_orders_customer"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_orders: {
        Row: {
          created_at: string
          customer_info: Json
          expires_at: string
          id: string
          order_info: Json
          shipping_address: Json
        }
        Insert: {
          created_at?: string
          customer_info: Json
          expires_at: string
          id?: string
          order_info: Json
          shipping_address: Json
        }
        Update: {
          created_at?: string
          customer_info?: Json
          expires_at?: string
          id?: string
          order_info?: Json
          shipping_address?: Json
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string | null
          data_es_gb: number
          data_eu_gb: number
          description: string | null
          features: Json | null
          id: string
          metadata: Json | null
          price: number
          status: Database["public"]["Enums"]["product_status"]
          stock: number | null
          title: string
          type: Database["public"]["Enums"]["product_type"]
          updated_at: string | null
          validity_days: number
        }
        Insert: {
          created_at?: string | null
          data_es_gb: number
          data_eu_gb: number
          description?: string | null
          features?: Json | null
          id?: string
          metadata?: Json | null
          price: number
          status?: Database["public"]["Enums"]["product_status"]
          stock?: number | null
          title: string
          type: Database["public"]["Enums"]["product_type"]
          updated_at?: string | null
          validity_days: number
        }
        Update: {
          created_at?: string | null
          data_es_gb?: number
          data_eu_gb?: number
          description?: string | null
          features?: Json | null
          id?: string
          metadata?: Json | null
          price?: number
          status?: Database["public"]["Enums"]["product_status"]
          stock?: number | null
          title?: string
          type?: Database["public"]["Enums"]["product_type"]
          updated_at?: string | null
          validity_days?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      shipping_settings: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          shipping_cost: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          shipping_cost?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          shipping_cost?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          company_name: string | null
          created_at: string | null
          facebook_url: string | null
          hero_images: Json | null
          id: string
          instagram_url: string | null
          logo_url: string | null
          tiktok_url: string | null
          tracking_scripts: Json | null
          updated_at: string | null
          whatsapp_number: string | null
          youtube_url: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          facebook_url?: string | null
          hero_images?: Json | null
          id?: string
          instagram_url?: string | null
          logo_url?: string | null
          tiktok_url?: string | null
          tracking_scripts?: Json | null
          updated_at?: string | null
          whatsapp_number?: string | null
          youtube_url?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          facebook_url?: string | null
          hero_images?: Json | null
          id?: string
          instagram_url?: string | null
          logo_url?: string | null
          tiktok_url?: string | null
          tracking_scripts?: Json | null
          updated_at?: string | null
          whatsapp_number?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_pending_orders: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      should_process_email: {
        Args: {
          priority: number
          created_at: string
          retry_count: number
          backoff_interval: unknown
        }
        Returns: boolean
      }
    }
    Enums: {
      assistant_role:
        | "sales"
        | "support"
        | "compatibility_checker"
        | "blog_writer"
      chat_type: "ai" | "whatsapp"
      customer_gender: "M" | "F"
      email_queue_status: "pending" | "processing" | "sent" | "failed"
      email_template_type: "physical" | "esim" | "both"
      event_type:
        | "created"
        | "status_changed"
        | "payment_processed"
        | "shipping_updated"
        | "note_added"
        | "document_validated"
      order_status:
        | "payment_pending"
        | "payment_failed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
      order_type: "physical" | "esim"
      payment_method: "stripe" | "paypal" | "test"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      product_status: "active" | "inactive" | "out_of_stock"
      product_type: "physical" | "esim"
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
