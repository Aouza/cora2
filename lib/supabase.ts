import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://development.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "development_anon_key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          content: string;
          author_id: string;
          created_at: string;
          reactions: Record<string, number> | null;
        };
        Insert: {
          id?: string;
          content: string;
          author_id: string;
          created_at?: string;
          reactions?: Record<string, number> | null;
        };
        Update: {
          id?: string;
          content?: string;
          author_id?: string;
          created_at?: string;
          reactions?: Record<string, number> | null;
        };
      };
      user_readings: {
        Row: {
          id: string;
          user_id: string;
          content: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: Record<string, any>;
          updated_at?: string;
        };
      };
    };
  };
};
