// lib/supabase.ts
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./supabase.types"; // (<-- ver abaixo)

// --- Variáveis de ambiente obrigatórias em runtime ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  throw new Error(
    "❌ Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

/**
 * Client tipado para o browser.
 * Se precisar no Server Component, crie um client “server” separado
 * com `createRouteHandlerClient()` ou `createServerSupabaseClient()`
 */
export const supabase = createClientComponentClient<Database>({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});
