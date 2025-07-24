import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { syncUserProfileWithDrizzle } from "../../../../../lib/drizzle-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Verificar autenticação
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    // Sincronizar perfil via Drizzle
    const result = await syncUserProfileWithDrizzle(user);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Erro ao sincronizar perfil" },
        { status: 500 }
      );
    }

    return NextResponse.json(result.profile);
  } catch (error) {
    console.error("Erro ao sincronizar perfil:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
