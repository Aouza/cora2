import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { db, profiles } from "../../../../../src/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { nickname, useCustomAvatar } = body;

    if (
      !nickname ||
      typeof nickname !== "string" ||
      nickname.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Nickname é obrigatório" },
        { status: 400 }
      );
    }

    if (nickname.length > 50) {
      return NextResponse.json(
        { error: "Nickname deve ter no máximo 50 caracteres" },
        { status: 400 }
      );
    }

    // Verificar se o nickname já está em uso por outro usuário
    const existingProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.nickname, nickname.trim()))
      .limit(1);

    if (existingProfile.length > 0 && existingProfile[0].id !== user.id) {
      return NextResponse.json(
        { error: "Este nickname já está em uso" },
        { status: 409 }
      );
    }

    // Atualizar o perfil
    const result = await db
      .update(profiles)
      .set({
        nickname: nickname.trim(),
        useCustomAvatar: useCustomAvatar || false,
        profileCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, user.id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Perfil não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: result[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
