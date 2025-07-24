import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { db, profiles } from "../../../../../src/db";
import { eq } from "drizzle-orm";
import { withRetry } from "../../../../../lib/db-wrapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(request: NextRequest) {
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

    // Obter dados do corpo da requisição
    const body = await request.json();
    const { nickname, useCustomAvatar, customAvatarUrl, profileCompleted } =
      body;

    // Validar dados obrigatórios
    if (!nickname || nickname.trim().length === 0) {
      return NextResponse.json(
        { error: "Apelido é obrigatório" },
        { status: 400 }
      );
    }

    // Preparar dados para atualização
    const updateData: any = {
      nickname: nickname.trim(),
      useCustomAvatar: useCustomAvatar || false,
      profileCompleted: profileCompleted || true,
      updatedAt: new Date(),
    };

    // Se tem avatar customizado, adicionar URL
    if (useCustomAvatar && customAvatarUrl) {
      updateData.customAvatarUrl = customAvatarUrl;
    }

    // Atualizar perfil via Drizzle com retry
    const result = await withRetry(
      () =>
        db
          .update(profiles)
          .set(updateData)
          .where(eq(profiles.id, user.id))
          .returning(),
      `UPDATE profile: ${user.id}`
    );

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Perfil não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      profile: result[0],
      message: "Perfil atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
