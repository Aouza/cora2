import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  detectFirstLogin,
  updateLoginTracking,
} from "../../../../../lib/first-login-utils";

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
    const firstLoginResult = await detectFirstLogin(user.id);

    // Atualizar tracking de login
    const trackingResult = await updateLoginTracking(user.id);

    console.log("🔍 [First Login Check]", {
      userId: user.id,
      isFirstLogin: firstLoginResult.isFirstLogin,
      reason: firstLoginResult.reason,
      loginCount: trackingResult.loginCount,
    });

    return NextResponse.json({
      isFirstLogin: firstLoginResult.isFirstLogin,
      reason: firstLoginResult.reason,
      loginCount: trackingResult.loginCount,
      profile: firstLoginResult.profile,
    });
  } catch (error) {
    console.error("Erro ao verificar primeiro login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
