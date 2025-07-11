import { NextResponse } from "next/server";
import { db } from "@/db";
import { ecos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { syncUserProfileWithDrizzle } from "../../../../lib/drizzle-server";

export async function GET() {
  try {
    const ecosData = await db.select().from(ecos).orderBy(desc(ecos.createdAt));

    return NextResponse.json(ecosData);
  } catch (error) {
    console.error("Erro ao buscar ecos:", error);
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

    const { relatoId, tipo } = await request.json();

    if (!relatoId || !tipo) {
      return NextResponse.json(
        { error: "relatoId e tipo são obrigatórios" },
        { status: 400 }
      );
    }

    // Validar tipo de eco
    const tiposValidos = ["🌱", "🫂", "💧"];
    if (!tiposValidos.includes(tipo)) {
      return NextResponse.json(
        { error: "Tipo de eco inválido" },
        { status: 400 }
      );
    }

    // Garantir que o perfil existe
    const profileSync = await syncUserProfileWithDrizzle(user);
    if (!profileSync.success) {
      console.error("Erro ao sincronizar perfil:", profileSync.error);
      return NextResponse.json(
        { error: "Erro ao sincronizar perfil do usuário" },
        { status: 500 }
      );
    }

    const [novoEco] = await db
      .insert(ecos)
      .values({
        relatoId,
        tipo,
      })
      .returning();

    return NextResponse.json(novoEco, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar eco:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
