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
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_archived: boolean | null
          message: string
          name: string
          responded_at: string | null
          response: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_archived?: boolean | null
          message: string
          name: string
          responded_at?: string | null
          response?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_archived?: boolean | null
          message?: string
          name?: string
          responded_at?: string | null
          response?: string | null
          status?: string
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
      exchange_rates: {
        Row: {
          from_currency: string
          id: string
          last_updated: string | null
          rate: number
          to_currency: string
        }
        Insert: {
          from_currency: string
          id?: string
          last_updated?: string | null
          rate: number
          to_currency: string
        }
        Update: {
          from_currency?: string
          id?: string
          last_updated?: string | null
          rate?: number
          to_currency?: string
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
          price_eur: number | null
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
          price_eur?: number | null
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
          price_eur?: number | null
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
          stripe_sandbox_mode: boolean | null
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
          stripe_sandbox_mode?: boolean | null
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
          stripe_sandbox_mode?: boolean | null
          tiktok_url?: string | null
          tracking_scripts?: Json | null
          updated_at?: string | null
          whatsapp_number?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      wivy_esim_activations: {
        Row: {
          activated_at: string | null
          activation_code: string | null
          airalo_reference_id: string | null
          created_at: string
          expires_at: string | null
          id: string
          order_item_id: string
          qr_code: string | null
          status: string
          updated_at: string
        }
        Insert: {
          activated_at?: string | null
          activation_code?: string | null
          airalo_reference_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          order_item_id: string
          qr_code?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          activated_at?: string | null
          activation_code?: string | null
          airalo_reference_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          order_item_id?: string
          qr_code?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wivy_esim_activations_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "wivy_order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      wivy_esims: {
        Row: {
          airalo_product_id: string | null
          created_at: string
          data_amount: number
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price_usd: number
          regions: Json
          updated_at: string
          validity_days: number
        }
        Insert: {
          airalo_product_id?: string | null
          created_at?: string
          data_amount: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_usd: number
          regions?: Json
          updated_at?: string
          validity_days: number
        }
        Update: {
          airalo_product_id?: string | null
          created_at?: string
          data_amount?: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_usd?: number
          regions?: Json
          updated_at?: string
          validity_days?: number
        }
        Relationships: []
      }
      wivy_order_items: {
        Row: {
          created_at: string
          esim_id: string
          id: string
          order_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          esim_id: string
          id?: string
          order_id: string
          quantity?: number
          unit_price: number
        }
        Update: {
          created_at?: string
          esim_id?: string
          id?: string
          order_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "wivy_order_items_esim_id_fkey"
            columns: ["esim_id"]
            isOneToOne: false
            referencedRelation: "wivy_esims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wivy_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "wivy_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      wivy_orders: {
        Row: {
          created_at: string
          id: string
          payment_id: string | null
          payment_method: string | null
          status: Database["public"]["Enums"]["wivy_order_status"]
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          status?: Database["public"]["Enums"]["wivy_order_status"]
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          status?: Database["public"]["Enums"]["wivy_order_status"]
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wivy_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "wivy_users"
            referencedColumns: ["id"]
          },
        ]
      }
      wivy_regions: {
        Row: {
          continent: string | null
          country_code: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          continent?: string | null
          country_code: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          continent?: string | null
          country_code?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      wivy_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      wivy_users: {
        Row: {
          auth_id: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["wivy_user_role"]
          updated_at: string
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["wivy_user_role"]
          updated_at?: string
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["wivy_user_role"]
          updated_at?: string
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
      get_trigger_info: {
        Args: { trigger_name: string }
        Returns: {
          trigger_exists: boolean
          event_manipulation: string
          action_statement: string
        }[]
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
      update_mxn_prices: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
      wivy_order_status:
        | "pending"
        | "paid"
        | "activated"
        | "expired"
        | "cancelled"
      wivy_user_role: "customer" | "admin" | "superadmin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assistant_role: [
        "sales",
        "support",
        "compatibility_checker",
        "blog_writer",
      ],
      chat_type: ["ai", "whatsapp"],
      customer_gender: ["M", "F"],
      email_queue_status: ["pending", "processing", "sent", "failed"],
      email_template_type: ["physical", "esim", "both"],
      event_type: [
        "created",
        "status_changed",
        "payment_processed",
        "shipping_updated",
        "note_added",
        "document_validated",
      ],
      order_status: [
        "payment_pending",
        "payment_failed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      order_type: ["physical", "esim"],
      payment_method: ["stripe", "paypal", "test"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      product_status: ["active", "inactive", "out_of_stock"],
      product_type: ["physical", "esim"],
      wivy_order_status: [
        "pending",
        "paid",
        "activated",
        "expired",
        "cancelled",
      ],
      wivy_user_role: ["customer", "admin", "superadmin"],
    },
  },
} as const
