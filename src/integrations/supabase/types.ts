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
      auth_logs: {
        Row: {
          created_at: string
          event_type: string
          id: string
          ip_address: string
          metadata: Json | null
          user_agent: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          ip_address: string
          metadata?: Json | null
          user_agent: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: string
          metadata?: Json | null
          user_agent?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auth_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_images: {
        Row: {
          ai_prompt: string | null
          alt_text: string
          caption: string | null
          created_at: string
          height: number
          id: string
          is_ai_generated: boolean
          is_featured: boolean
          mime_type: string
          position: number | null
          post_id: string
          size_bytes: number
          storage_path: string
          thumbnail_url: string | null
          updated_at: string
          url: string
          width: number
        }
        Insert: {
          ai_prompt?: string | null
          alt_text: string
          caption?: string | null
          created_at?: string
          height: number
          id?: string
          is_ai_generated?: boolean
          is_featured?: boolean
          mime_type: string
          position?: number | null
          post_id: string
          size_bytes: number
          storage_path: string
          thumbnail_url?: string | null
          updated_at?: string
          url: string
          width: number
        }
        Update: {
          ai_prompt?: string | null
          alt_text?: string
          caption?: string | null
          created_at?: string
          height?: number
          id?: string
          is_ai_generated?: boolean
          is_featured?: boolean
          mime_type?: string
          position?: number | null
          post_id?: string
          size_bytes?: number
          storage_path?: string
          thumbnail_url?: string | null
          updated_at?: string
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
          author_id: string
          content: string
          created_at: string
          excerpt: string
          featured_image_id: string | null
          id: string
          is_ai_generated: boolean
          published_at: string | null
          scheduled_for: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          title: string
          updated_at: string
          views_count: number
        }
        Insert: {
          ai_model?: string | null
          ai_prompt?: string | null
          author_id: string
          content: string
          created_at?: string
          excerpt: string
          featured_image_id?: string | null
          id?: string
          is_ai_generated?: boolean
          published_at?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          views_count?: number
        }
        Update: {
          ai_model?: string | null
          ai_prompt?: string | null
          author_id?: string
          content?: string
          created_at?: string
          excerpt?: string
          featured_image_id?: string | null
          id?: string
          is_ai_generated?: boolean
          published_at?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_documents: {
        Row: {
          country: string
          created_at: string
          customer_id: string
          expiry_date: string
          id: string
          metadata: Json | null
          number: string
          status: Database["public"]["Enums"]["document_status"]
          type: string
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          customer_id: string
          expiry_date: string
          id?: string
          metadata?: Json | null
          number: string
          status?: Database["public"]["Enums"]["document_status"]
          type: string
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          customer_id?: string
          expiry_date?: string
          id?: string
          metadata?: Json | null
          number?: string
          status?: Database["public"]["Enums"]["document_status"]
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_documents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          billing_address: Json | null
          birth_date: string | null
          created_at: string
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
          updated_at: string
        }
        Insert: {
          billing_address?: Json | null
          birth_date?: string | null
          created_at?: string
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
          updated_at?: string
        }
        Update: {
          billing_address?: Json | null
          birth_date?: string | null
          created_at?: string
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
          updated_at?: string
        }
        Relationships: []
      }
      document_validations: {
        Row: {
          created_at: string
          document_id: string
          id: string
          metadata: Json | null
          notes: string | null
          status: string
          validator_id: string
        }
        Insert: {
          created_at?: string
          document_id: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          status: string
          validator_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          status?: string
          validator_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_validations_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "customer_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_validations_validator_id_fkey"
            columns: ["validator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          created_at: string
          error: string | null
          id: string
          metadata: Json | null
          recipient: string
          status: string
          subject: string
          template_id: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          metadata?: Json | null
          recipient: string
          status: string
          subject: string
          template_id: string
        }
        Update: {
          created_at?: string
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
          content: string
          created_at: string
          created_by: string
          description: string
          id: string
          is_active: boolean
          name: string
          status: Database["public"]["Enums"]["order_status"]
          subject: string
          type: Database["public"]["Enums"]["product_type"]
          updated_at: string
          variables: Json
        }
        Insert: {
          carrier_id?: string | null
          content: string
          created_at?: string
          created_by: string
          description: string
          id?: string
          is_active?: boolean
          name: string
          status: Database["public"]["Enums"]["order_status"]
          subject: string
          type: Database["public"]["Enums"]["product_type"]
          updated_at?: string
          variables?: Json
        }
        Update: {
          carrier_id?: string | null
          content?: string
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          is_active?: boolean
          name?: string
          status?: Database["public"]["Enums"]["order_status"]
          subject?: string
          type?: Database["public"]["Enums"]["product_type"]
          updated_at?: string
          variables?: Json
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_events: {
        Row: {
          created_at: string
          description: string
          id: string
          metadata: Json | null
          order_id: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          order_id: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
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
          {
            foreignKeyName: "order_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          order_id?: string
          product_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      order_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          is_internal: boolean
          metadata: Json | null
          order_id: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_internal?: boolean
          metadata?: Json | null
          order_id: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_internal?: boolean
          metadata?: Json | null
          order_id?: string
          type?: string
          updated_at?: string
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
          {
            foreignKeyName: "order_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          changed_by: string
          created_at: string
          id: string
          metadata: Json | null
          new_status: Database["public"]["Enums"]["order_status"]
          old_status: Database["public"]["Enums"]["order_status"]
          order_id: string
          reason: string | null
        }
        Insert: {
          changed_by: string
          created_at?: string
          id?: string
          metadata?: Json | null
          new_status: Database["public"]["Enums"]["order_status"]
          old_status: Database["public"]["Enums"]["order_status"]
          order_id: string
          reason?: string | null
        }
        Update: {
          changed_by?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          new_status?: Database["public"]["Enums"]["order_status"]
          old_status?: Database["public"]["Enums"]["order_status"]
          order_id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_status_history_order_id_fkey"
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
          created_at: string
          customer_id: string
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
          type: Database["public"]["Enums"]["product_type"]
          updated_at: string
        }
        Insert: {
          activation_date?: string | null
          carrier?: string | null
          created_at?: string
          customer_id: string
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
          type: Database["public"]["Enums"]["product_type"]
          updated_at?: string
        }
        Update: {
          activation_date?: string | null
          carrier?: string | null
          created_at?: string
          customer_id?: string
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
          type?: Database["public"]["Enums"]["product_type"]
          updated_at?: string
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
      payment_logs: {
        Row: {
          created_at: string
          description: string
          id: string
          payment_id: string
          raw_data: Json | null
          status: string
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          payment_id: string
          raw_data?: Json | null
          status: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          payment_id?: string
          raw_data?: Json | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_logs_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          config: Json
          created_at: string
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          config: Json
          created_at?: string
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          order_id: string
          payment_method_id: string
          provider_payment_id: string
          provider_receipt_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          metadata?: Json | null
          order_id: string
          payment_method_id: string
          provider_payment_id: string
          provider_receipt_url?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          order_id?: string
          payment_method_id?: string
          provider_payment_id?: string
          provider_receipt_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
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
          type: Database["public"]["Enums"]["product_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
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
          type: Database["public"]["Enums"]["product_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
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
          type?: Database["public"]["Enums"]["product_type"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          documentation_status:
            | Database["public"]["Enums"]["document_status"]
            | null
          full_name: string
          id: string
          manager_type: Database["public"]["Enums"]["product_type"] | null
          metadata: Json | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          documentation_status?:
            | Database["public"]["Enums"]["document_status"]
            | null
          full_name: string
          id: string
          manager_type?: Database["public"]["Enums"]["product_type"] | null
          metadata?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          documentation_status?:
            | Database["public"]["Enums"]["document_status"]
            | null
          full_name?: string
          id?: string
          manager_type?: Database["public"]["Enums"]["product_type"] | null
          metadata?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          action: string
          conditions: Json | null
          created_at: string
          created_by: string
          id: string
          resource: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          action: string
          conditions?: Json | null
          created_at?: string
          created_by: string
          id?: string
          resource: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          action?: string
          conditions?: Json | null
          created_at?: string
          created_by?: string
          id?: string
          resource?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_categories: {
        Row: {
          created_at: string
          description: string
          icon: string | null
          id: string
          metadata: Json | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          metadata?: Json | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          metadata?: Json | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      workflow_events: {
        Row: {
          created_at: string
          description: string
          id: string
          metadata: Json | null
          type: string
          user_id: string | null
          workflow_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          type: string
          user_id?: string | null
          workflow_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          type?: string
          user_id?: string | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_events_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          category_id: string
          components: string[] | null
          created_at: string
          database_tables: string[] | null
          description: string
          details: string | null
          id: string
          metadata: Json | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category_id: string
          components?: string[] | null
          created_at?: string
          database_tables?: string[] | null
          description: string
          details?: string | null
          id?: string
          metadata?: Json | null
          status: string
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          components?: string[] | null
          created_at?: string
          database_tables?: string[] | null
          description?: string
          details?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "workflow_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_tables: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
        }[]
      }
    }
    Enums: {
      document_status:
        | "pending"
        | "validating"
        | "approved"
        | "rejected"
        | "expired"
      order_status:
        | "payment_pending"
        | "payment_failed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
      payment_method: "stripe" | "paypal"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      product_type: "physical" | "esim"
      user_role: "client" | "manager" | "admin"
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
