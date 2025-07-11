import { NextResponse } from "next/server";
import { db } from "@/db";
import { relatos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { syncUserProfileWithDrizzle } from "../../../../lib/drizzle-server";

export async function GET() {
  try {
    const relatosData = await db
      .select()
      .from(relatos)
      .orderBy(desc(relatos.createdAt));

    return NextResponse.json(relatosData);
  } catch (error) {
    console.error("Erro ao buscar relatos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const { texto } = await request.json();

    if (!texto || typeof texto !== "string" || texto.trim().length < 10) {
      return NextResponse.json(
        { error: "Texto deve ter pelo menos 10 caracteres" },
        { status: 400 }
      );
    }

    // Garantir que o perfil existe antes de criar o relato
    const profileSync = await syncUserProfileWithDrizzle(user);
    if (!profileSync.success) {
      console.error("Erro ao sincronizar perfil:", profileSync.error);
      return NextResponse.json(
        { error: "Erro ao sincronizar perfil do usuário" },
        { status: 500 }
      );
    }

    const [novoRelato] = await db
      .insert(relatos)
      .values({
        texto: texto.trim(),
        userId: user.id,
      })
      .returning();

    return NextResponse.json(novoRelato, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar relato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
