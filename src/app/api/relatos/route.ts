import { NextResponse } from "next/server";
import { db } from "@/db";
import { relatos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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

    // Criar relato diretamente
    const [novoRelato] = await db
      .insert(relatos)
      .values({
        texto: texto.trim(),
        userId: user.id,
      })
      .returning();

    return NextResponse.json(novoRelato, { status: 201 });
  } catch (error) {
    console.error(
      "Erro ao criar relato:",
      error instanceof Error ? error.stack || error.message : error
    );
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
