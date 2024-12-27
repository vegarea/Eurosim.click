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
      admin_agencies: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_email: string | null
          owner_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_email?: string | null
          owner_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_email?: string | null
          owner_id?: string | null
          status?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          auth_user_id: string
          created_at: string
          email: string
          id: string
        }
        Insert: {
          auth_user_id: string
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          auth_user_id?: string
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      agency_roles: {
        Row: {
          agency_id: string
          created_at: string
          id: string
          name: string
          permissions: Json
        }
        Insert: {
          agency_id: string
          created_at?: string
          id?: string
          name: string
          permissions?: Json
        }
        Update: {
          agency_id?: string
          created_at?: string
          id?: string
          name?: string
          permissions?: Json
        }
        Relationships: [
          {
            foreignKeyName: "agency_roles_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "admin_agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_users: {
        Row: {
          agency_id: string
          auth_user_id: string
          created_at: string
          email: string
          id: string
          role: string
        }
        Insert: {
          agency_id: string
          auth_user_id: string
          created_at?: string
          email: string
          id?: string
          role: string
        }
        Update: {
          agency_id?: string
          auth_user_id?: string
          created_at?: string
          email?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_users_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "admin_agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "agency_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_user_id: string
          created_at: string
          email: string
          id: string
        }
        Insert: {
          auth_user_id: string
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          auth_user_id?: string
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_existing_user: {
        Args: {
          user_email: string
        }
        Returns: boolean
      }
      create_agency_with_owner: {
        Args: {
          p_agency_name: string
          p_user_id: string
          p_user_email: string
        }
        Returns: string
      }
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