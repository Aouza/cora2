import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { db, profiles } from "../../../../../db";
import { eq } from "drizzle-orm";
import { getFixedAvatarUrl } from "../../../../../lib/avatar-utils";

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação via Supabase
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const user = session.user;

    // Dados do perfil com avatar URL corrigida
    const profileData = {
      id: user.id,
      email: user.email!,
      fullName: user.user_metadata.full_name || user.user_metadata.name || null,
      avatarUrl: getFixedAvatarUrl(user.user_metadata.avatar_url),
      updatedAt: new Date(),
    };

    // Verificar se perfil já existe no Drizzle
    const existingProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, user.id))
      .limit(1);

    let result;

    if (existingProfile.length > 0) {
      // Atualizar perfil existente
      result = await db
        .update(profiles)
        .set({
          email: profileData.email,
          fullName: profileData.fullName,
          avatarUrl: profileData.avatarUrl,
          updatedAt: profileData.updatedAt,
        })
        .where(eq(profiles.id, user.id))
        .returning();

      console.log("✅ Perfil atualizado via Drizzle:", result[0]);
    } else {
      // Criar novo perfil
      result = await db.insert(profiles).values(profileData).returning();

      console.log("✅ Novo perfil criado via Drizzle:", result[0]);
    }

    return NextResponse.json({
      success: true,
      profile: result[0],
      message:
        existingProfile.length > 0 ? "Perfil atualizado" : "Perfil criado",
    });
  } catch (error) {
    console.error("❌ Erro na sincronização do perfil:", error);

    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
