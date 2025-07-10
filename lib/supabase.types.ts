export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

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
          reactions: Json | null;
        };
        Insert: {
          id?: string;
          content: string;
          author_id: string;
          created_at?: string;
          reactions?: Json | null;
        };
        Update: {
          id?: string;
          content?: string;
          author_id?: string;
          created_at?: string;
          reactions?: Json | null;
        };
      };
      user_readings: {
        Row: {
          id: string;
          user_id: string;
          content: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: Json;
          updated_at?: string;
        };
      };
    };
  };
};
