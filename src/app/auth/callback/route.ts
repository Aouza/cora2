import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    console.error("❌ OAuth Error:", error, errorDescription);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_DOMAIN}/login?error=${error}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_DOMAIN}/login?error=no_code`
    );
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("❌ Error exchanging code for session:", exchangeError);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_DOMAIN}/login?error=exchange_failed`
      );
    }

    if (!data.session) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_DOMAIN}/login?error=no_session`
      );
    }

    // Redirecionar para callback do cliente
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_DOMAIN}/auth/callback-client`
    );
  } catch (error) {
    console.error("❌ Erro ao obter sessão:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_DOMAIN}/login?error=callback_error`
    );
  }
}
