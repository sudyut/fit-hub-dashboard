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
      activity_performance: {
        Row: {
          attendance: number | null
          created_at: string
          goal_achievement: number | null
          id: string
          member_id: string
          updated_at: string
        }
        Insert: {
          attendance?: number | null
          created_at?: string
          goal_achievement?: number | null
          id?: string
          member_id: string
          updated_at?: string
        }
        Update: {
          attendance?: number | null
          created_at?: string
          goal_achievement?: number | null
          id?: string
          member_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_performance_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      goals_preferences: {
        Row: {
          created_at: string
          diet_preference: string | null
          diet_remarks: string | null
          goals: string[] | null
          id: string
          member_id: string
          timeline: string | null
          updated_at: string
          workout_frequency: number | null
          workout_styles: string[] | null
        }
        Insert: {
          created_at?: string
          diet_preference?: string | null
          diet_remarks?: string | null
          goals?: string[] | null
          id?: string
          member_id: string
          timeline?: string | null
          updated_at?: string
          workout_frequency?: number | null
          workout_styles?: string[] | null
        }
        Update: {
          created_at?: string
          diet_preference?: string | null
          diet_remarks?: string | null
          goals?: string[] | null
          id?: string
          member_id?: string
          timeline?: string | null
          updated_at?: string
          workout_frequency?: number | null
          workout_styles?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_preferences_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          address: string | null
          age: number | null
          body_fat: number | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          emergency_contact: string | null
          height: number | null
          id: string
          name: string
          payment_status: string
          phone: string | null
          subscription_end: string
          subscription_start: string
          subscription_type: string
          unique_id: string
          updated_at: string
          weight: number | null
        }
        Insert: {
          address?: string | null
          age?: number | null
          body_fat?: number | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          height?: number | null
          id?: string
          name: string
          payment_status: string
          phone?: string | null
          subscription_end: string
          subscription_start: string
          subscription_type: string
          unique_id: string
          updated_at?: string
          weight?: number | null
        }
        Update: {
          address?: string | null
          age?: number | null
          body_fat?: number | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          height?: number | null
          id?: string
          name?: string
          payment_status?: string
          phone?: string | null
          subscription_end?: string
          subscription_start?: string
          subscription_type?: string
          unique_id?: string
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      physical_details: {
        Row: {
          arms: number | null
          chest: number | null
          created_at: string
          fitness_level: string | null
          hips: number | null
          id: string
          legs: number | null
          member_id: string
          updated_at: string
          waist: number | null
        }
        Insert: {
          arms?: number | null
          chest?: number | null
          created_at?: string
          fitness_level?: string | null
          hips?: number | null
          id?: string
          legs?: number | null
          member_id: string
          updated_at?: string
          waist?: number | null
        }
        Update: {
          arms?: number | null
          chest?: number | null
          created_at?: string
          fitness_level?: string | null
          hips?: number | null
          id?: string
          legs?: number | null
          member_id?: string
          updated_at?: string
          waist?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "physical_details_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      progress_logs: {
        Row: {
          body_fat: number | null
          created_at: string
          date: string
          id: string
          member_id: string
          weight: number | null
        }
        Insert: {
          body_fat?: number | null
          created_at?: string
          date: string
          id?: string
          member_id: string
          weight?: number | null
        }
        Update: {
          body_fat?: number | null
          created_at?: string
          date?: string
          id?: string
          member_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_logs_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_history: {
        Row: {
          created_at: string
          date: string
          duration: number
          id: string
          member_id: string
          workout: string
        }
        Insert: {
          created_at?: string
          date: string
          duration: number
          id?: string
          member_id: string
          workout: string
        }
        Update: {
          created_at?: string
          date?: string
          duration?: number
          id?: string
          member_id?: string
          workout?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_history_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
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
