import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  console.log("🔍 Callback recebido:", {
    code: code ? "✅ Presente" : "❌ Ausente",
    error: error || "Nenhum",
    url: requestUrl.toString(),
  });

  // Se houver erro no OAuth
  if (error) {
    console.error("❌ OAuth Error:", error, errorDescription);
    return NextResponse.redirect(
      new URL("/login?error=oauth_error", request.url)
    );
  }

  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Se há código de autorização (Authorization Code Flow)
    if (code) {
      console.log("📤 Processando Authorization Code Flow...");

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("❌ Error exchanging code for session:", error);
        return NextResponse.redirect(
          new URL("/login?error=session_error", request.url)
        );
      }

      if (data.session) {
        console.log(
          "✅ Session created successfully for user:",
          data.session.user.email
        );
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } else {
      // Se não há código, pode ser Implicit Flow (token na URL do frontend)
      console.log(
        "🔄 Sem código de autorização, tentando obter sessão atual..."
      );

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        console.log(
          "✅ Sessão encontrada via Implicit Flow:",
          session.user.email
        );
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (error) {
        console.error("❌ Erro ao obter sessão:", error);
      }

      // Se chegou aqui, provavelmente é Implicit Flow sendo processado pelo cliente
      console.log("🔄 Redirecionando para página de callback do cliente...");
      return NextResponse.redirect(
        new URL("/auth/callback-client", request.url)
      );
    }

    // Fallback se não conseguiu processar
    console.error("❌ Não foi possível processar callback");
    return NextResponse.redirect(
      new URL("/login?error=no_session", request.url)
    );
  } catch (error) {
    console.error("❌ Unexpected error in auth callback:", error);
    return NextResponse.redirect(
      new URL("/login?error=unexpected", request.url)
    );
  }
}
