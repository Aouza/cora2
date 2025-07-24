import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  detectFirstLogin,
  updateLoginTracking,
} from "../../../../../lib/first-login-utils";
import { getProfileById } from "../../../../../lib/drizzle-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
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

    // Detectar se é primeiro login
    const isFirstLogin = await detectFirstLogin(user.id);

    // Atualizar tracking de login
    await updateLoginTracking(user.id);

    // Buscar perfil atualizado
    const profile = await getProfileById(user.id);

    console.log("🔍 [First Login Check]", {
      userId: user.id,
      isFirstLogin,
      loginCount: profile?.loginCount,
    });

    return NextResponse.json({
      isFirstLogin,
      loginCount: profile?.loginCount || 1,
      profile,
    });
  } catch (error) {
    console.error("Erro ao verificar primeiro login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
